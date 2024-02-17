import { createSlice } from '@reduxjs/toolkit';
import {
  getSelectedCategoryData,
  getVideoDetails,
  getRelatedVideos,
  getRelatedVideosContinuation,
} from './asyncActions';
import { IVideoState } from './types';

const initialState: IVideoState = {
  isLoading: false,
  selectedCategory: 'now',
  videoDetails: null,
  isDetailsVideoLoading: false,
  relatedVideos: [],
  relatedContinuation: null,
  errorText: null,
  searchResults: [],
};

const videoSlice = createSlice({
  name: 'videoSlice',
  initialState,
  reducers: {
    changeSelectedCategory: (state, { payload }) => {
      state.selectedCategory = payload;
      state.searchResults = [];
    },
    resetErrorText: (state, { payload }) => {
      state.errorText = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getSelectedCategoryData.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getSelectedCategoryData.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.searchResults = payload;
    });
    builder.addCase(getSelectedCategoryData.rejected, (state) => {
      state.isLoading = false;
    });

    builder.addCase(getVideoDetails.pending, (state) => {
      state.isDetailsVideoLoading = true;
    });
    builder.addCase(getVideoDetails.fulfilled, (state, { payload }) => {
      state.isDetailsVideoLoading = false;
      state.videoDetails = payload;
    });
    builder.addCase(getVideoDetails.rejected, (state) => {
      state.isDetailsVideoLoading = false;
    });

    builder.addCase(getRelatedVideos.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getRelatedVideos.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.relatedVideos = payload.videos;
      state.relatedContinuation = payload.continuationToken;
      state.errorText = payload.detail;
    });
    builder.addCase(getRelatedVideos.rejected, (state) => {
      state.isLoading = false;
    });

    builder.addCase(
      getRelatedVideosContinuation.fulfilled,
      (state, { payload }) => {
        state.relatedContinuation = payload.continuationToken;
        if (payload.videos) {
          state.relatedVideos = [...state.relatedVideos, ...payload.videos];
        }
      }
    );
  },
});

export const { changeSelectedCategory, resetErrorText } = videoSlice.actions;

export default videoSlice.reducer;
