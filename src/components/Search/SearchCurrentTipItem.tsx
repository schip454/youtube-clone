import { FC } from 'react';

import { IoIosSearch } from 'react-icons/io';

interface ISearchCurrentTipItemProps {
  item: string;
  handleNavigate: (item: string) => void;
}

const SearchCurrentTipItem: FC<ISearchCurrentTipItemProps> = ({
  item,
  handleNavigate,
}) => {
  return (
    <li className="px-2 lg:pr-6 lg:pl-4 text-sm lg:text-base transition-all  hover:bg-[#303030]  flex justify-between mb-3">
      <div className="flex items-center gap-4">
        <IoIosSearch className="text-white text-xl w-5 h-5" />
        <button
          onClick={() => handleNavigate(item)}
          className="font-bold cursor-pointer">
          {item}
        </button>
      </div>
    </li>
  );
};

export default SearchCurrentTipItem;
