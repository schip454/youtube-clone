import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

import { getComments } from '../../redux/comments/slice';
import { sortCommentsList } from '../../utils/constants';

import { MdOutlineSort } from 'react-icons/md';

const CommentFilter = ({ videoId }) => {
  const dispatch = useDispatch();

  const [isSortOpen, setSortOpen] = useState(false);
  const [sortActive, setSortActive] = useState(1);

  const sortRef = useRef(null);

  const handleChangeFilter = (query, i) => {
    const params = {
      videoId,
      options: query,
    };
    setSortActive(i);
    dispatch(getComments(params));
    setSortOpen(false);
  };

  const handleClick = (e) => {
    if (sortRef.current && !sortRef.current.contains(e.target))
      setSortOpen(false);
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClick);
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, []);
  return (
    <div className="relative">
      <button
        onClick={() => setSortOpen((prev) => !prev)}
        className="flex items-center gap-2 py-1 px-2 rounded-lg text-lg  transition hover:bg-white/[0.15]">
        <MdOutlineSort className="text-2xl" />
        <p>Sort</p>
      </button>
      {isSortOpen && (
        <ul
          ref={sortRef}
          className="absolute bg-[#1d1d1d] rounded-lg py-2 top-10">
          {sortCommentsList?.map((item, i) => (
            <li key={item.query}>
              <button
                className={`py-2 px-6 w-full hover:bg-white/[0.15] ${
                  sortActive === i ? 'bg-[#333333]' : ''
                }`}
                onClick={() => handleChangeFilter(item.query, i)}>
                {item.title}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CommentFilter;
