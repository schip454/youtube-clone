import { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import InfiniteScroll from 'react-infinite-scroll-component';

import LeftNav from '../LeftNav/LeftNav';
import SearchSkeleton from '../Skeletons/SearchSkeleton';
import SearchResultVideoCard from './SearchResultVideoCard';
import AccordionComponent from '../Accordion/Accordion';
import { setSearchHistory } from '../../redux/searchTips/slice';
import {
  getSearchContinuationResults,
  getSearchResults,
} from '../../redux/search/asyncActions';
import ErrorPopup from '../ErrorPopup/ErrorPopup';

const SearchResult: FC = () => {
  const dispatch = useAppDispatch();
  const { searchQuery } = useParams();
  const { isLoading, searchItems, continuationToken, errorMessage } =
    useAppSelector((state) => state.search);

  useEffect(() => {
    document.getElementById('root')!.classList.remove('custom-h');
    if (searchQuery) {
      dispatch(getSearchResults(searchQuery));
      dispatch(setSearchHistory(searchQuery));
    }
  }, [searchQuery]);

  const handleFetch = () => {
    const params = {
      continuationToken: continuationToken,
      query: searchQuery,
    };
    setTimeout(() => {
      dispatch(getSearchContinuationResults(params));
    }, 1000);
  };

  return (
    <div className="flex flex-row h-[calc(100%-56px)]  bg-black">
      <LeftNav />
      <div className="grow w-[calc(100%-240px)] md:ml-[240px] h-full  bg-black">
        <div className="grid grid-cols-1 gap-2 p-5 mt-[56px]">
          {searchQuery && <AccordionComponent searchQuery={searchQuery} />}
          <>
            {errorMessage && <ErrorPopup text={errorMessage} />}

            {!isLoading && searchItems && searchItems?.length > 0 ? (
              <InfiniteScroll
                dataLength={searchItems?.length}
                next={handleFetch}
                hasMore={true}
                loader={<SearchSkeleton />}
                endMessage={
                  <p style={{ textAlign: 'center' }}>
                    <b>Yay! You have seen it all</b>
                  </p>
                }>
                {searchItems?.map((video) => {
                  if (video?.type !== 'video') return false;
                  return (
                    <SearchResultVideoCard key={video.videoId} video={video} />
                  );
                })}
              </InfiniteScroll>
            ) : (
              [...new Array(6)].map((_, i) => (
                <div className="mb-5" key={i}>
                  <SearchSkeleton />
                </div>
              ))
            )}
          </>
        </div>
      </div>
    </div>
  );
};

export default SearchResult;
