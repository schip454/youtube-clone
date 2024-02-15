import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { swapSearchFilter } from '../../redux/search/slice';

const FilterItem = ({ filterList, title, active, handleSaveFilter }) => {
  const dispatch = useDispatch();

  return (
    <ul className="flex flex-col gap-2 text-[#9e9c9cd6] w-full sm:w-[180px]">
      <h4 className="py-4 font-bold text-sm border-b-[1px] border-white/20">
        {title}
      </h4>
      {filterList &&
        filterList?.map((item, i) => (
          <li
            className={
              active === i + 1 ? 'pt-2 text-white transition-colors ' : 'pt-2 '
            }
            key={item.query}>
            <button
              className="hover:text-white transition-colors "
              onClick={() => handleSaveFilter(i, item.query, item.filterType)}>
              {item.title}
            </button>
          </li>
        ))}
    </ul>
  );
};

export default FilterItem;
