import React, { FC, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  getSearchContinuationResults,
  getSearchResults,
} from '../../redux/search/slice';
import InfiniteScroll from 'react-infinite-scroll-component';

import LeftNav from '../LeftNav/LeftNav';
import SearchSkeleton from '../Skeletons/SearchSkeleton';
import SearchResultVideoCard from './SearchResultVideoCard';
import AccordionComponent from '../Accordion/Accordion';
import { setSearchHistory } from '../../redux/searchTips/slice';

const SearchResult = () => {
  const dispatch = useDispatch();
  const { searchQuery } = useParams();
  const { isLoading, searchItems, continuationToken } = useSelector(
    (state) => state.search
  );

  useEffect(() => {
    document.getElementById('root').classList.remove('custom-h');
    dispatch(getSearchResults(searchQuery));
    dispatch(setSearchHistory(searchQuery));
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
          <AccordionComponent searchQuery={searchQuery} />
          <div className="">
            {!isLoading ? (
              <InfiniteScroll
                dataLength={searchItems.length} //This is important field to render the next data
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResult;
