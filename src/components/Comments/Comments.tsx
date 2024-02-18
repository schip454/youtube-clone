import { FC, useEffect } from 'react';

import {
  getComments,
  getCommentsContinuation,
} from '../../redux/comments/asyncActions';

import CommentItem from './CommentItem';
import CommentSkeleton from '../Skeletons/CommentSkeleton';

import InfiniteScroll from 'react-infinite-scroll-component';
import CommentFilter from './CommentFilter';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import ErrorPopup from '../ErrorPopup/ErrorPopup';

export interface ICommentsProps {
  videoId: string;
}

const Comments: FC<ICommentsProps> = ({ videoId }) => {
  const dispatch = useAppDispatch();
  const {
    commentsTotal,
    commentsItems,
    commentsContinuation,
    isCommentsLoading,
  } = useAppSelector((state) => state.comments);

  useEffect(() => {
    const params = {
      videoId,
    };
    dispatch(getComments(params));
  }, [videoId]);

  const handleCommentsFetch = () => {
    const params = {
      commentsContinuation: commentsContinuation,
      videoId: videoId,
    };
    setTimeout(() => {
      dispatch(getCommentsContinuation(params));
    }, 2000);
  };
  return (
    <>
      <div className="text-white px-2 pb-1 flex gap-5 items-center mb-8 border-b-[1px] border-white/[0.15]">
        <h2 className="font-bold text-xl">{commentsTotal} comments</h2>
        <CommentFilter videoId={videoId} />
      </div>
      {!isCommentsLoading && commentsItems.length > 0 ? (
        <InfiniteScroll
          className="flex flex-col gap-4"
          dataLength={commentsItems.length}
          next={handleCommentsFetch}
          hasMore={true}
          loader={
            <div className="overflow-hidden">
              <CommentSkeleton />
            </div>
          }
          endMessage={
            <p style={{ textAlign: 'center' }}>
              <b>Yay! You have seen it all</b>
            </p>
          }>
          {commentsItems?.[0]?.commentId !== null ? (
            commentsItems?.map((item) => (
              <CommentItem key={item.commentId} comment={item} />
            ))
          ) : (
            <ErrorPopup text={'Comments not found'} />
          )}
        </InfiniteScroll>
      ) : (
        [...new Array(3)].map((_, i) => (
          <div className="mb-3 overflow-hidden" key={i}>
            <CommentSkeleton />
          </div>
        ))
      )}
    </>
  );
};

export default Comments;
