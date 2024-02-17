import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { anotherApiFetchDefaultOptions } from '../../utils/fetchOptions';
import { IComments, ICommentsParams } from './types';

export const getComments = createAsyncThunk<IComments, ICommentsParams>(
  'comments/getComments',
  async (params, thunkAPI) => {
    try {
      const { videoId, options = 'top' } = params;
      const { data } = await axios.get(
        `${
          import.meta.env.VITE_SECOND_URL
        }/comments?id=${videoId}&sort_by=${options}`,
        anotherApiFetchDefaultOptions
      );

      return {
        commentsTotal: data.commentsCount,
        continuationToken: data.continuation,
        videos: data.data,
        msg: data.msg,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getCommentsContinuation = createAsyncThunk<
  IComments,
  ICommentsParams
>('comments/getCommentsContinuation', async (params, thunkAPI) => {
  try {
    const { videoId, commentsContinuation } = params;
    const { data } = await axios.get(
      `${
        import.meta.env.VITE_SECOND_URL
      }/comments?id=${videoId}&token=${commentsContinuation}`,
      anotherApiFetchDefaultOptions
    );

    return {
      continuationToken: data.continuation,
      videos: data.data,
      msg: data.msg,
    };
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});
