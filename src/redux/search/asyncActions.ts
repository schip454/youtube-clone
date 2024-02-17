import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { anotherApiFetchDefaultOptions } from '../../utils/fetchOptions';
import { ISearch, ISearchParams } from './types';

export const getSearchResults = createAsyncThunk<ISearch, string>(
  'search/getSearchResults',
  async (searchQuery, thunkAPI) => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_SECOND_URL}/search?query=${searchQuery}`,
        anotherApiFetchDefaultOptions
      );

      return {
        continuationToken: data.continuation,
        videos: data.data,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const swapSearchFilter = createAsyncThunk<ISearch, ISearchParams>(
  'search/swapSearchFilter',
  async (params, thunkAPI) => {
    try {
      const { searchQuery, upload_date, sort_by, type, duration, features } =
        params;
      const { data } = await axios.get(
        `${
          import.meta.env.VITE_SECOND_URL
        }/search?query=${searchQuery}&type=${type}&duration=${duration}&features=${features}&upload_date=${upload_date}&sort_by=${sort_by}`,
        anotherApiFetchDefaultOptions
      );

      return {
        videos: data.data,
        msg: data.msg,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getSearchContinuationResults = createAsyncThunk<
  ISearch,
  ISearchParams
>('search/getSearchContinuationResults', async (params, thunkAPI) => {
  try {
    const { continuationToken, query } = params;
    const { data } = await axios.get(
      `${
        import.meta.env.VITE_SECOND_URL
      }/search?query=${query}&token=${continuationToken}`,
      anotherApiFetchDefaultOptions
    );
    return {
      continuationToken: data.continuation,
      videos: data.data,
    };
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});
