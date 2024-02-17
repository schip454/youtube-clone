import { FC } from 'react';
import { BiLike } from 'react-icons/bi';
import { BiDislike } from 'react-icons/bi';
import { MdVerified } from 'react-icons/md';
import { ICommentItem } from '../../redux/comments/types';

interface ICommentItemProps {
  comment: ICommentItem;
}

const CommentItem: FC<ICommentItemProps> = ({ comment }) => {
  return (
    <div className="flex text-white text-xs gap-4 overflow-x-hidden">
      <div className="flex h-11 w-11 rounded-full ">
        <img
          src={comment?.authorThumbnail[2]?.url}
          alt={comment?.authorText ? comment?.authorText : 'Avatar'}
          className="h-full w-full object-cover "
        />
      </div>
      <div className="flex flex-col">
        <div className="flex gap-2 mb-2">
          <h4
            className={`flex gap-2 items-center px-2 rounded-lg font-bold text-sm ${
              comment?.authorIsChannelOwner ? 'bg-[#303030]' : ''
            }`}>
            {comment?.authorText}
            <MdVerified
              className={`${comment?.authorIsChannelOwner ? '' : 'hidden'}`}
            />
          </h4>
          <p className=" text-[#ccc] flex items-center ">
            {comment?.publishedTimeText}
          </p>
        </div>
        <div className="w-full flex mb-2 ">
          <p className="text-pretty">{comment?.textDisplay}</p>
        </div>
        <div className="flex gap-3 items-center">
          <div className="flex items-center">
            <button className=" p-2 flex items-center gap-2 text-md hover:bg-[#303030] rounded-3xl">
              <BiLike className="text-lg" />
            </button>
            <p className="text-[#ccc]">{comment?.likesCount}</p>
          </div>
          <button className=" p-2   flex items-center gap-2 text-md hover:bg-[#303030] rounded-3xl">
            <BiDislike className="text-lg" />
          </button>
          <p
            className={`flex text-[#ccc]  ${
              comment?.replyCount > 0 ? '' : 'hidden'
            }`}>
            {comment?.replyCount} replies
          </p>
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
