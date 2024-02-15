import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL, SECOND_URL, THIRD_URL } from "../video/slice";
import { anotherApiFetchDefaultOptions, fetchDefaultOptions, thirdDefaultOptions } from "../../utils/fetchOptions";


export const getSearchResults = createAsyncThunk(
  'search/getSearchResults',
  async (searchQuery, thunkAPI) => {
    try {
      console.log(searchQuery)
      const { data } = await axios.get(
        `${SECOND_URL}/search?query=${searchQuery}`,
        anotherApiFetchDefaultOptions
      );

      console.log(data, 'data getSearchResults')
      return {
        continuationToken: data.continuation,
        videos: data.data
      };;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const swapSearchFilter = createAsyncThunk(
  'search/swapSearchFilter',
  async (params, thunkAPI) => {
    try {
      const { searchQuery, upload_date, sort_by, type,
        duration,
        features } = params
      const { data } = await axios.get(
        // `${SECOND_URL}/search/?query=${searchQuery}&order_by=${query}`,
        `${SECOND_URL}/search?query=${searchQuery}&type=${type}&duration=${duration}&features=${features}&upload_date=${upload_date}&sort_by=${sort_by}`,
        anotherApiFetchDefaultOptions
      );
      return data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getSearchContinuationResults = createAsyncThunk(
  'search/getSearchContinuationResults',
  async (params, thunkAPI) => {
    try {
      const { continuationToken,
        query } = params
      const { data } = await axios.get(
        `${SECOND_URL}/search?query=${query}&token=${continuationToken}`,
        anotherApiFetchDefaultOptions
      );
      console.log(data, 'data getSearchContinuationResults')
      // return data
      return {
        continuationToken: data.continuation,
        videos: data.data
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState = {
  isLoading: false,
  mobileMenu: false,
  searchItems: [],
  searchContinuationItems: [],
  continuationToken: null,
  isContinuationLoading: false,
};

export const searchSlice = createSlice({
  name: 'searchSlice',
  initialState,
  reducers: {
    toggleMobileMenu: (state, { payload }) => {
      state.mobileMenu = payload
    },
    deleteSearchItem: (state, { payload }) => {
      // state.searchHistory = [...state.searchHistory]
      // const currentSearchIndex = state.searchHistory.indexOf(payload)
      // if (currentSearchIndex !== -1) {
      //   state.searchHistory = state.searchHistory.splice(currentSearchIndex, 1)
      // }
      state.searchHistory = state.searchHistory.filter((item) => item !== payload)
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getSearchResults.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getSearchResults.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.searchItems = payload.videos
      state.continuationToken = payload.continuationToken
    });
    builder.addCase(getSearchResults.rejected, (state) => {
      state.isLoading = false;
    });

    builder.addCase(swapSearchFilter.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(swapSearchFilter.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.searchItems = payload
    });
    builder.addCase(swapSearchFilter.rejected, (state) => {
      state.isLoading = false;
    });

    builder.addCase(getSearchContinuationResults.pending, (state) => {
      state.isContinuationLoading = true;
    });
    builder.addCase(getSearchContinuationResults.fulfilled, (state, { payload }) => {
      state.isContinuationLoading = false;
      state.searchItems = [...state.searchItems, ...payload.videos]
      state.continuationToken = payload.continuationToken
    });
    builder.addCase(getSearchContinuationResults.rejected, (state) => {
      state.isContinuationLoading = false;
    });

  }
})

export const { toggleMobileMenu, deleteSearchItem } = searchSlice.actions

export default searchSlice.reducer