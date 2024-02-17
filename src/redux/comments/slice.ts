import { createSlice } from '@reduxjs/toolkit';
import { getComments, getCommentsContinuation } from './asyncActions';
import { ICommentState } from './types';

const initialState: ICommentState = {
  commentsTotal: null,
  commentsItems: [],
  commentsContinuation: null,
  commentsMsg: null,
  isCommentsLoading: false,
  isCommentsContinuationLoading: false,
};

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
      state.commentsItems = payload.videos;
      state.commentsContinuation = payload.continuationToken;
      state.commentsTotal = payload.commentsTotal;
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
      state.commentsItems = [...state.commentsItems, ...payload.videos];
    });
    builder.addCase(getCommentsContinuation.rejected, (state) => {
      state.isCommentsContinuationLoading = false;
    });
  },
});

export default commentSlice.reducer;
