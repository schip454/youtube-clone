import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { SECOND_URL, THIRD_URL } from "../video/slice";
import { anotherApiFetchDefaultOptions, thirdDefaultOptions } from "../../utils/fetchOptions";



// export const getComments = createAsyncThunk(
//   'comments/getComments',
//   async (videoId, thunkAPI) => {
//     try {
//       const { data } = await axios.get(
//         `${SECOND_URL}/comments?id=${videoId}`,
//         anotherApiFetchDefaultOptions
//       );

//       console.log(data, 'data getSearchResults')
//       return {
//         commentsTotal: data.commentsCount,
//         continuationToken: data.continuation,
//         videos: data.data,
//         msg: data.msg
//       };;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error);
//     }
//   }
// );

export const getComments = createAsyncThunk(
  'comments/getComments',
  async (params, thunkAPI) => {
    try {
      const { videoId, options = 'top' } = params
      const { data } = await axios.get(
        `${SECOND_URL}/comments?id=${videoId}&sort_by=${options}`,
        anotherApiFetchDefaultOptions
      );

      console.log(data, 'data getSearchResults')
      return {
        commentsTotal: data.commentsCount,
        continuationToken: data.continuation,
        videos: data.data,
        msg: data.msg
      };;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getCommentsContinuation = createAsyncThunk(
  'comments/getCommentsContinuation',
  async (params, thunkAPI) => {
    try {
      const { videoId, commentsContinuation } = params
      const { data } = await axios.get(
        `${SECOND_URL}/comments?id=${videoId}&token=${commentsContinuation}`,
        anotherApiFetchDefaultOptions
      );

      return {
        continuationToken: data.continuation,
        videos: data.data,
        msg: data.msg
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState = {
  commentsTotal: null,
  commentsItems: [],
  commentsContinuation: null,
  commentsMsg: null,
  isCommentsLoading: false,
  isCommentsContinuationLoading: false
}

const commentSlice = createSlice({
  name: 'commentSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {

    builder.addCase(getComments.pending, (state) => {
      state.isCommentsLoading = true;
    });
    builder.addCase(getComments.fulfilled, (state, { payload }) => {
      state.isCommentsLoading = false;
      state.commentsMsg = payload.msg;
      state.commentsItems = payload.videos
      state.commentsContinuation = payload.continuationToken;
      state.commentsTotal = payload.commentsTotal
    });
    builder.addCase(getComments.rejected, (state) => {
      state.isCommentsLoading = false;
    });

    builder.addCase(getCommentsContinuation.pending, (state) => {
      state.isCommentsContinuationLoading = true;
    });
    builder.addCase(getCommentsContinuation.fulfilled, (state, { payload }) => {
      state.isCommentsContinuationLoading = false;
      state.commentsMsg = payload.msg;
      state.commentsContinuation = payload.continuationToken;
      state.commentsItems = [...state.commentsItems, ...payload.videos]
    });
    builder.addCase(getCommentsContinuation.rejected, (state) => {
      state.isCommentsContinuationLoading = false;
    });

  }
})

export const { } = commentSlice.actions

export default commentSlice.reducer