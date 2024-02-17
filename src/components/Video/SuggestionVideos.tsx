import InfiniteScroll from 'react-infinite-scroll-component';
import RelatedSkeleton from '../Skeletons/RelatedSkeleton';
import SuggestionVideoCard from './SuggestionVideoCard';
import { IRelatedVideo } from '../../redux/video/types';
import { FC } from 'react';

interface ISuggestionVideosProps {
  relatedVideos: IRelatedVideo[];
  handleRelatedVideosFetch: () => void;
}

const SuggestionVideos: FC<ISuggestionVideosProps> = ({
  relatedVideos,
  handleRelatedVideosFetch,
}) => {
  return (
    <>
      <InfiniteScroll
        className="flex flex-col gap-4"
        dataLength={relatedVideos?.length} //This is important field to render the next data
        next={handleRelatedVideosFetch}
        hasMore={true}
        loader={<RelatedSkeleton />}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>Yay! You have seen it all</b>
          </p>
        }>
        {relatedVideos?.map((item) => {
          return <SuggestionVideoCard key={item.video_id} video={item} />;
        })}
      </InfiniteScroll>
    </>
  );
};

export default SuggestionVideos;
