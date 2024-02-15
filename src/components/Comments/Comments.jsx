import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getComments,
  getCommentsContinuation,
} from '../../redux/comments/slice';

import CommentSkeleton from '../Skeletons/CommentSkeleton';
import CommentItem from './CommentItem';

import InfiniteScroll from 'react-infinite-scroll-component';
import CommentFilter from './CommentFilter';

const Comments = ({ videoId }) => {
  const dispatch = useDispatch();
  const {
    commentsTotal,
    commentsItems,
    commentsContinuation,
    commentsMsg,
    isCommentsLoading,
    isCommentsContinuationLoading,
  } = useSelector((state) => state.comments);

  // console.log(commentsTotal, 'commentsTotal');
  // console.log(commentsItems, 'commentsItems');
  // console.log(commentsContinuation, 'commentsContinuation');
  // console.log(commentsMsg, 'commentsMsg');
  // console.log(isLoading, 'isLoading');

  useEffect(() => {
    const params = {
      videoId,
    };
    dispatch(getComments(params));
  }, [videoId]);

  const handleCommentsFetch = () => {
    console.log('fetched');
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
      {!isCommentsLoading ? (
        <InfiniteScroll
          className="flex flex-col gap-4"
          dataLength={commentsItems.length} //This is important field to render the next data
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
          {commentsItems?.map((item) => (
            <CommentItem key={item.commentId} comment={item} />
          ))}
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
