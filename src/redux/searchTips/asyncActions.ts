import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { thirdDefaultOptions } from '../../utils/fetchOptions';

export const getSearchAutoComplete = createAsyncThunk(
  'search/getSearchAutoComplete',
  async (searchQuery: string, thunkAPI) => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_THIRD_URL}/auto-complete?q=${searchQuery}`,
        thirdDefaultOptions
      );
      const { results } = data;
      return results as string[];
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
