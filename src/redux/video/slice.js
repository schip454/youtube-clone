import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { anotherApiFetchDefaultOptions, fetchDefaultOptions, thirdDefaultOptions } from '../../utils/fetchOptions';

export const BASE_URL = 'https://youtube-v2.p.rapidapi.com';
export const SECOND_URL = 'https://yt-api.p.rapidapi.com';
export const THIRD_URL = 'https://youtube-data8.p.rapidapi.com';

export const getSelectedCategoryData = createAsyncThunk(
  'video/getSelectedCategoryData',
  async (query, thunkAPI) => {
    try {
      const { data } = await axios.get(
        `${SECOND_URL}/trending?type=${query}`,
        anotherApiFetchDefaultOptions
      );

      return data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getVideoDetails = createAsyncThunk(
  'video/getVideoDetails',
  async (videoId, thunkAPI) => {
    try {
      const { data } = await axios.get(
        `${THIRD_URL}/video/details?id=${videoId}`,
        thirdDefaultOptions
      );

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);


export const getRelatedVideos = createAsyncThunk(
  'video/getRelatedVideos',
  async (videoId, thunkAPI) => {
    try {
      const { data } = await axios.get(
        `${BASE_URL}/video/recommendations?video_id=${videoId}`,
        fetchDefaultOptions
      );
      console.log(data, 'data getRelatedVideos')
      return {
        continuationToken: data.continuation_token,
        videos: data.videos,
        detail: data.detail
      }
    } catch (error) {
      console.log(error, 'error')
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getRelatedVideosContinuation = createAsyncThunk(
  'video/getRelatedVideosContinuation',
  async (params, thunkAPI) => {
    try {
      const { videoId, relatedContinuation } = params
      console.log('relatedContinuation', relatedContinuation)
      const { data } = await axios.get(
        `${BASE_URL}/video/recommendations?video_id=${videoId}&continuation_token=${relatedContinuation}`,
        fetchDefaultOptions

      );
      return {
        continuationToken: data.continuation_token,
        videos: data.videos
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);





const initialState = {
  isLoading: false,
  selectedCategory: 'now',
  videoDetails: null,
  isDetailsVideoLoading: false,
  relatedVideos: [],
  relatedContinuation: null,
  isRelatedContinuationVideosLoading: false,
  errorText: null
  // isRelatedVideoLoading: false
};

const videoSlice = createSlice({
  name: 'videoSlice',
  initialState,
  reducers: {
    changeSelectedCategory: (state, { payload }) => {
      state.selectedCategory = payload
      state.searchResults = []
    },
    resetErrorText: (state, { payload }) => {
      state.errorText = payload
    },

  },
  extraReducers: (builder) => {
    builder.addCase(getSelectedCategoryData.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getSelectedCategoryData.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.searchResults = payload
    });
    builder.addCase(getSelectedCategoryData.rejected, (state) => {
      state.isLoading = false;
    });

    builder.addCase(getVideoDetails.pending, (state) => {
      state.isDetailsVideoLoading = true;
    });
    builder.addCase(getVideoDetails.fulfilled, (state, { payload }) => {
      state.isDetailsVideoLoading = false;
      state.videoDetails = payload
    });
    builder.addCase(getVideoDetails.rejected, (state) => {
      state.isDetailsVideoLoading = false;
    });

    builder.addCase(getRelatedVideos.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getRelatedVideos.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.relatedVideos = payload.videos
      state.relatedContinuation = payload.continuationToken
      state.errorText = payload.detail
    });
    builder.addCase(getRelatedVideos.rejected, (state) => {
      state.isLoading = false;
    });


    builder.addCase(getRelatedVideosContinuation.pending, (state) => {
      state.isRelatedContinuationVideosLoading = true;
    });
    builder.addCase(getRelatedVideosContinuation.fulfilled, (state, { payload }) => {
      state.isRelatedContinuationVideosLoading = false;
      state.relatedContinuation = payload.continuationToken
      console.log(payload.videos)
      if (payload.videos) {
        state.relatedVideos = [...state.relatedVideos, ...payload.videos]
      }
    });
    builder.addCase(getRelatedVideosContinuation.rejected, (state) => {
      state.isRelatedContinuationVideosLoading = false;
    });


  },
});

export const { changeSelectedCategory, resetErrorText } = videoSlice.actions

export default videoSlice.reducer;
