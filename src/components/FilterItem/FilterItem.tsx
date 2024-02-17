import { FC } from 'react';

interface FilterItem {
  filterList: { query: string; title: string; filterType: string }[];
  title: string;
  active: number | null;
  handleSaveFilter: (i: number, query: string, filterType: string) => void;
}

const FilterItem: FC<FilterItem> = ({
  filterList,
  title,
  active,
  handleSaveFilter,
}) => {
  return (
    <ul className="flex flex-col gap-2 text-[#9e9c9cd6] w-full sm:w-[180px]">
      <h4 className="py-4 font-bold text-sm border-b-[1px] border-white/20">
        {title}
      </h4>
      {filterList &&
        filterList?.map((item, i: number) => (
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
