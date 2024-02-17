import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from '@material-tailwind/react';
import { FC, useState } from 'react';

import { VscFilter } from 'react-icons/vsc';
import { VscFilterFilled } from 'react-icons/vsc';

import FilterItem from '../FilterItem/FilterItem';
import {
  durationList,
  featuresList,
  orderList,
  sortList,
  typeList,
} from '../../utils/constants';
import { useAppDispatch } from '../../hooks/hooks';
import { swapSearchFilter } from '../../redux/search/asyncActions';

interface IAccordionComponentProps {
  searchQuery: string;
}

const AccordionComponent: FC<IAccordionComponentProps> = ({ searchQuery }) => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState<number>(0);

  const [params, setParams] = useState({
    searchQuery,
    upload_date: '',
    sort_by: '',
    type: '',
    duration: '',
    features: '',
  });

  const handleOpen = (value: number) => setOpen(open === value ? 0 : value);

  const [orderActive, setOrderActive] = useState<number | null>(null);
  const [sortActive, setSortActive] = useState<number | null>(1);
  const [typeActive, setTypeActive] = useState<number | null>(null);
  const [durationActive, setDurationActive] = useState<number | null>(null);
  const [featuresActive, setFeaturesActive] = useState<number | null>(null);

  const handleSaveFilter = (i: number, query: string, filterType: string) => {
    switch (filterType) {
      case 'upload_date':
        setOrderActive(i + 1);
        setParams((prev) => {
          return {
            ...prev,
            upload_date: query,
          };
        });
        break;
      case 'sort_by':
        setSortActive(i + 1);
        setParams((prev) => {
          return {
            ...prev,
            sort_by: query,
          };
        });
        break;
      case 'type':
        setTypeActive(i + 1);
        setParams((prev) => {
          return {
            ...prev,
            type: query,
          };
        });
        break;
      case 'duration':
        setDurationActive(i + 1);
        setParams((prev) => {
          return {
            ...prev,
            duration: query,
          };
        });
        break;
      case 'features':
        setFeaturesActive(i + 1);
        setParams((prev) => {
          return {
            ...prev,
            features: query,
          };
        });
        break;

      default:
        break;
    }
  };

  const handleSendFilter = () => {
    dispatch(swapSearchFilter(params));
  };

  const handleResetFilter = () => {
    setParams({
      searchQuery,
      upload_date: '',
      sort_by: '',
      type: '',
      duration: '',
      features: '',
    });
    setOrderActive(null);
    setSortActive(null);
    setTypeActive(null);
    setDurationActive(null);
    setFeaturesActive(null);
  };

  return (
    <Accordion
      placeholder={''}
      open={open === 1}
      className="text-white border-b-[1px] border-white/20">
      <AccordionHeader
        placeholder={''}
        className="text-white w-auto p-0"
        onClick={() => handleOpen(1)}>
        <div className="h-8 px-6 py-5  flex items-center gap-2 text-md hover:bg-[#303030] rounded-3xl">
          {open ? <VscFilterFilled className="text-white " /> : <VscFilter />}
          Filter
        </div>
      </AccordionHeader>
      <AccordionBody className="text-white p-0 pb-4 relative">
        <div className="flex flex-col sm:flex-row gap-8 flex-wrap">
          <FilterItem
            filterList={orderList}
            title="Order by"
            active={orderActive}
            handleSaveFilter={handleSaveFilter}
          />
          <FilterItem
            filterList={sortList}
            title="Sort by"
            handleSaveFilter={handleSaveFilter}
            active={sortActive}
          />
          <FilterItem
            filterList={featuresList}
            title="Features"
            handleSaveFilter={handleSaveFilter}
            active={featuresActive}
          />
          <FilterItem
            filterList={durationList}
            title="Duration"
            handleSaveFilter={handleSaveFilter}
            active={durationActive}
          />
          <FilterItem
            filterList={typeList}
            title="Type"
            handleSaveFilter={handleSaveFilter}
            active={typeActive}
          />
        </div>
        <button
          className="h-8 px-6 py-5 absolute right-2 bottom-2 flex items-center gap-2 text-md hover:bg-[#303030] rounded-3xl"
          onClick={handleSendFilter}>
          Save
        </button>
        <button
          className="h-8 px-6 py-5 absolute right-24 bottom-2 flex items-center gap-2 text-md hover:bg-[#303030] rounded-3xl"
          onClick={handleResetFilter}>
          Reset
        </button>
      </AccordionBody>
    </Accordion>
  );
};

export default AccordionComponent;
