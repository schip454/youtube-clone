import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { getSearchAutoComplete } from './asyncActions';
import { ISearchTipsState } from './types';

const initialState: ISearchTipsState = {
  searchHistory: ['kizaru', 'Christopher Moltisanti'],
  currentSearchList: [],
};

export const searchTipsSlice = createSlice({
  name: 'searchTipsSlice',
  initialState,
  reducers: {
    setSearchHistory: (state, { payload }: PayloadAction<string>) => {
      state.searchHistory = state.searchHistory.filter(
        (item) => item !== payload
      );
      state.searchHistory = [payload, ...state.searchHistory];
    },
    deleteSearchItem: (state, { payload }: PayloadAction<string>) => {
      state.searchHistory = state.searchHistory.filter(
        (item) => item !== payload
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getSearchAutoComplete.fulfilled, (state, { payload }) => {
      state.currentSearchList = payload;
    });
  },
});

export const { setSearchHistory, deleteSearchItem } = searchTipsSlice.actions;

export default searchTipsSlice.reducer;
