import React from 'react';
import { MdHistory } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { deleteSearchItem } from '../../redux/search/slice';

const SearchHistoryTipItem = ({ item, handleNavigate }) => {
  const dispatch = useDispatch();
  // const navigate = useNavigate();

  const deleteSearch = () => {
    dispatch(deleteSearchItem(item));
  };

  // const handleNavigate = () => {
  //   navigate(`/searchResult/${item}`);
  // };

  return (
    <li className=" px-2 lg:pr-6 lg:pl-4 text-sm lg:text-base transition-all  hover:bg-[#303030]  flex justify-between mb-3">
      <div className="flex items-center gap-4">
        <MdHistory className="w-5 h-5" />
        <button
          onClick={() => handleNavigate(item)}
          className="font-bold cursor-pointer">
          {item}
        </button>
      </div>
      <button
        className="underline text-blue-600 hover:no-underline"
        onClick={deleteSearch}>
        Delete
      </button>
    </li>
  );
};

export default SearchHistoryTipItem;
