import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
  getSearchContinuationResults,
  getSearchResults,
  swapSearchFilter,
} from './asyncActions';
import { ISearchState } from './types';

const initialState: ISearchState = {
  isLoading: false,
  mobileMenu: false,
  searchItems: [],
  continuationToken: null,
  isContinuationLoading: false,
  errorMessage: null,
};

export const searchSlice = createSlice({
  name: 'searchSlice',
  initialState,
  reducers: {
    toggleMobileMenu: (state, { payload }: PayloadAction<boolean>) => {
      state.mobileMenu = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getSearchResults.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getSearchResults.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.searchItems = payload.videos;
      state.continuationToken = payload.continuationToken;
    });
    builder.addCase(getSearchResults.rejected, (state) => {
      state.isLoading = false;
    });

    builder.addCase(swapSearchFilter.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(swapSearchFilter.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.searchItems = payload.videos;
      state.errorMessage = payload.msg;
    });
    builder.addCase(swapSearchFilter.rejected, (state) => {
      state.isLoading = false;
    });

    builder.addCase(getSearchContinuationResults.pending, (state) => {
      state.isContinuationLoading = true;
    });
    builder.addCase(
      getSearchContinuationResults.fulfilled,
      (state, { payload }) => {
        state.isContinuationLoading = false;
        state.searchItems = [...state.searchItems, ...payload.videos];
        state.continuationToken = payload.continuationToken;
      }
    );
    builder.addCase(getSearchContinuationResults.rejected, (state) => {
      state.isContinuationLoading = false;
    });
  },
});

export const { toggleMobileMenu } = searchSlice.actions;

export default searchSlice.reducer;
