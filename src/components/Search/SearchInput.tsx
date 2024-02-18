import { FC, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';

import { IoIosSearch } from 'react-icons/io';
import { MdClear } from 'react-icons/md';

import { getSearchAutoComplete } from '../../redux/searchTips/asyncActions';

import SearchHistoryTipItem from './SearchHistoryTipItem';
import SearchCurrentTipItem from './SearchCurrentTipItem';

const SearchInput: FC = () => {
  const dispatch = useAppDispatch();

  const [searchQuery, setSearchQuery] = useState('');
  const [isTipsOpen, setTipsOpen] = useState(false);

  const tipRef = useRef<null | HTMLDivElement>(null);
  const searchInputRef = useRef(null);

  const { searchHistory, currentSearchList } = useAppSelector(
    (state) => state.searchTips
  );
  const navigate = useNavigate();

  const handleNavigate = (item: string) => {
    navigate(`/searchResult/${item}`);
    setTipsOpen(false);
  };

  const searchQueryHandler = (e: any) => {
    if (
      (e?.key === 'Enter' || e === 'searchButton') &&
      searchQuery?.length > 0
    ) {
      navigate(`/searchResult/${searchQuery}`);
    }
  };

  const handleClick = (e: any) => {
    if (tipRef.current && !tipRef.current.contains(e.target))
      setTipsOpen(false);
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClick);
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, []);

  useEffect(() => {
    dispatch(getSearchAutoComplete(searchQuery));
  }, [searchQuery]);

  return (
    <div className="group flex items-center ">
      <div className="relative flex h-8 md:h-10 md:ml-10 md:pl-5 border border-[#303030] rounded-l-3xl group-focus-within:border-blue-500 md:group-focus-within:ml-5 md:group-focus-within:pl-0">
        <div className="w-10 items-center justify-center hidden group-focus-within:md:flex">
          <IoIosSearch className="text-white text-xl" />
        </div>
        <input
          ref={searchInputRef}
          type="text"
          className="bg-transparent outline-none text-white pr-5 pl-5 md:pl-0 w-44 sm:w-64  lg:w-[500px] md:group-focus-within:pl-0  placeholder:text-zinc-600"
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyUp={searchQueryHandler}
          value={searchQuery}
          onFocus={() => setTipsOpen(true)}
          placeholder="Enter request"
        />
        {searchQuery.length > 0 && (
          <button
            className="absolute top-[10px] right-2"
            onClick={() => setSearchQuery('')}>
            <MdClear className="text-white text-xl	hover:text-[#a0a0a0] transition-colors" />
          </button>
        )}

        {isTipsOpen && searchHistory.length > 0 && (
          <div
            ref={tipRef}
            className="absolute z-50 w-80 sm:w-full h-auto bg-[#1c1c1c] text-white top-12 left-2/4 -translate-x-2/4 sm:left-0 sm:transform-none rounded-xl">
            <ul className="pt-4 pb-2">
              {searchQuery.length > 0
                ? currentSearchList.map((item, i) => (
                    <SearchCurrentTipItem
                      item={item}
                      key={i}
                      handleNavigate={(item) => handleNavigate(item)}
                    />
                  ))
                : searchHistory.map((item, i) => (
                    <SearchHistoryTipItem
                      item={item}
                      key={i}
                      handleNavigate={(item) => handleNavigate(item)}
                    />
                  ))}
            </ul>
          </div>
        )}
      </div>
      <button
        onClick={() => searchQueryHandler('searchButton')}
        className="w-[40px]  md:w-[60px] h-8 md:h-10 flex items-center justify-center border border-l-0 border-[#303030] rounded-r-3xl bg-white/[0.1]">
        <IoIosSearch className="text-white text-xl" />
      </button>
    </div>
  );
};

export default SearchInput;
