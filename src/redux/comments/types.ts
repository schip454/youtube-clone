export interface IComments {
  commentsTotal?: number;
  continuationToken: string;
  videos: ICommentItem[];
  msg: string;
}
export interface ICommentsParams {
  videoId: string;
  options?: string | null;
  commentsContinuation?: string | null;
}

export interface ICommentItem {
  commentId: string;
  authorText: string;
  authorChannelId: string;
  authorThumbnail: {
    url: string;
    width: number;
    height: number;
  }[];
  textDisplay: string;
  publishedTimeText: string;
  likesCount: string;
  replyCount: number;
  replyToken: string;
  authorIsChannelOwner: boolean;
}

export interface ICommentState {
  commentsTotal: number | null | undefined;
  commentsItems: ICommentItem[];
  commentsContinuation: string | null;
  commentsMsg: string | null;
  isCommentsLoading: boolean;
  isCommentsContinuationLoading: boolean;
}
