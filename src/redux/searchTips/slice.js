import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL, SECOND_URL, THIRD_URL } from "../video/slice";
import { anotherApiFetchDefaultOptions, fetchDefaultOptions, thirdDefaultOptions } from "../../utils/fetchOptions";


export const getSearchAutoComplete = createAsyncThunk(
  'search/getSearchAutoComplete',
  async (searchQuery, thunkAPI) => {
    try {
      const { data } = await axios.get(
        `${THIRD_URL}/auto-complete?q=${searchQuery}`,
        thirdDefaultOptions
      );
      const { results } = data
      return results;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);


const initialState = {
  searchHistory: ['kizaru', 'Christopher Moltisanti'],
  currentSearchList: [],
};

export const searchTipsSlice = createSlice({
  name: 'searchTipsSlice',
  initialState,
  reducers: {
    setSearchHistory: (state, { payload }) => {
      state.searchHistory = state.searchHistory.filter((item) => item !== payload)
      state.searchHistory = [payload, ...state.searchHistory]
    },
  },
  extraReducers: (builder) => {
    // builder.addCase(getSearchAutoComplete.pending, (state) => {
    //   state.isLoading = true;
    // });
    builder.addCase(getSearchAutoComplete.fulfilled, (state, { payload }) => {
      // state.isLoading = false;
      state.currentSearchList = payload
    });
    // builder.addCase(getSearchAutoComplete.rejected, (state) => {
    //   state.isLoading = false;
    // });

  }
})

export const { setSearchHistory } = searchTipsSlice.actions

export default searchTipsSlice.reducer