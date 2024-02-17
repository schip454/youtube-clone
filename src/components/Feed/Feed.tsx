import { FC, useEffect } from 'react';
import { getSelectedCategoryData } from '../../redux/video/asyncActions';
import Skeletons from '../Skeletons/Skeletons';
import VideoCard from '../Video/VideoCard';
import LeftNav from '../LeftNav/LeftNav';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';

const Feed: FC = () => {
  const dispatch = useAppDispatch();
  const { isLoading, searchResults, selectedCategory } = useAppSelector(
    (state) => state.video
  );

  useEffect(() => {
    document.getElementById('root')!.classList.remove('custom-h');
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
