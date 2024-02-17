import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {
  anotherApiFetchDefaultOptions,
  fetchDefaultOptions,
  thirdDefaultOptions,
} from '../../utils/fetchOptions';
import {
  ISelectedCategoryData,
  IRelatedVideos,
  IRelatedVideosParams,
  IVideoDetail,
} from './types';

export const getSelectedCategoryData = createAsyncThunk(
  'video/getSelectedCategoryData',
  async (query: string, thunkAPI) => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_SECOND_URL}/trending?type=${query}`,
        anotherApiFetchDefaultOptions
      );

      return data.data as ISelectedCategoryData[];
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getVideoDetails = createAsyncThunk(
  'video/getVideoDetails',
  async (videoId: string | undefined, thunkAPI) => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_THIRD_URL}/video/details?id=${videoId}`,
        thirdDefaultOptions
      );

      return data as IVideoDetail;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getRelatedVideos = createAsyncThunk(
  'video/getRelatedVideos',
  async (videoId: string | undefined, thunkAPI) => {
    try {
      const { data } = await axios.get(
        `${
          import.meta.env.VITE_BASE_URL
        }/video/recommendations?video_id=${videoId}`,
        fetchDefaultOptions
      );
      return {
        continuationToken: data.continuation_token,
        videos: data.videos,
        detail: data.detail,
      } as IRelatedVideos;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getRelatedVideosContinuation = createAsyncThunk(
  'video/getRelatedVideosContinuation',
  async (params: IRelatedVideosParams, thunkAPI) => {
    try {
      const { videoId, relatedContinuation } = params;
      const { data } = await axios.get(
        `${
          import.meta.env.VITE_BASE_URL
        }/video/recommendations?video_id=${videoId}&continuation_token=${relatedContinuation}`,
        fetchDefaultOptions
      );
      return {
        continuationToken: data.continuation_token,
        videos: data.videos,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
