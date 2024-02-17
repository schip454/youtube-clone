import { FC } from 'react';
import { MdHistory } from 'react-icons/md';
import { deleteSearchItem } from '../../redux/searchTips/slice';
import { useAppDispatch } from '../../hooks/hooks';

interface ISearchHistoryTipItemProps {
  item: string;
  handleNavigate: (item: string) => void;
}

const SearchHistoryTipItem: FC<ISearchHistoryTipItemProps> = ({
  item,
  handleNavigate,
}) => {
  const dispatch = useAppDispatch();

  const deleteSearch = () => {
    dispatch(deleteSearchItem(item));
  };

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
