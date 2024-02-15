import React, { FC, useEffect } from 'react';
import LeftNav from '../LeftNav/LeftNav';
import VideoCard from '../Video/VideoCard';
import { useDispatch, useSelector } from 'react-redux';
import { getSelectedCategoryData } from '../../redux/video/slice';
import Skeletons from '../Skeletons/Skeletons';

const Feed = () => {
  const dispatch = useDispatch();
  const { isLoading, searchResults, selectedCategory } = useSelector(
    (state) => state.video
  );

  useEffect(() => {
    document.getElementById('root').classList.remove('custom-h');
    dispatch(getSelectedCategoryData(selectedCategory));
  }, [dispatch, selectedCategory]);

  return (
    <div className="flex flex-row h-[calc(100%-56px)]">
      <LeftNav />
      <div className="grow w-[calc(100%-240px)] md:ml-[240px] h-full overflow-y-auto bg-black mt-[56px]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-5">
          {!isLoading && searchResults
            ? searchResults?.map((result) => {
                if (result.type !== 'video') return false;
                return <VideoCard key={result?.videoId} video={result} />;
              })
            : [...new Array(12)].map((_, i) => <Skeletons key={i} />)}
        </div>
      </div>
    </div>
  );
};

export default Feed;
