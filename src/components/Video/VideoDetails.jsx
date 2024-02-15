import React, { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  getRelatedVideos,
  getRelatedVideosContinuation,
  getVideoDetails,
  resetErrorText,
} from '../../redux/video/slice';
import { abbreviateNumber } from 'js-abbreviation-number';
import { useMediaQuery } from 'react-responsive';

import ReactPlayer from 'react-player/youtube';
import SuggestionVideoCard from './SuggestionVideoCard';
import RelatedSkeleton from '../Skeletons/RelatedSkeleton';
import DetailSkeleton from '../Skeletons/DetailSkeleton';
import Comments from '../Comments/Comments';
import InfiniteScroll from 'react-infinite-scroll-component';
import ErrorPopup from '../ErrorPopup/ErrorPopup';

import { AiOutlineLike } from 'react-icons/ai';
import { BsFillCheckCircleFill } from 'react-icons/bs';

const VideoDetails = () => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const {
    isLoading,
    isDetailsVideoLoading,
    videoDetails,
    relatedVideos,
    relatedContinuation,
    isRelatedContinuationVideosLoading,
    errorText,
  } = useSelector((state) => state.video);

  const isLaptop = useMediaQuery({
    query: '(min-width: 1024px)',
  });

  useEffect(() => {
    document.getElementById('root').classList.add('custom-h');

    dispatch(getVideoDetails(id));

    setTimeout(() => {
      console.log('zaebalo');
      dispatch(getRelatedVideos(id));
    }, 1500);

    if (errorText) {
      dispatch(resetErrorText(null));
    }
  }, [id]);

  const handleRelatedVideosFetch = () => {
    const params = {
      relatedContinuation,
      videoId: id,
    };
    // setTimeout(() => {
    dispatch(getRelatedVideosContinuation(params));
    // }, 1000);
  };

  return (
    <div className="flex justify-center flex-row h-[calc(100%-56px)] bg-black mt-[56px]">
      <div className="w-full max-w-[1280px] flex flex-col lg:flex-row">
        <ErrorPopup />

        {isDetailsVideoLoading ? (
          <div className="flex w-full h-full justify-center mt-4">
            <DetailSkeleton />
          </div>
        ) : (
          <div className="flex flex-col lg:w-[calc(100%-350px)] xl:w-[calc(100%-400px)] px-4 py-3 lg:py-6 ">
            <div className=" md:h-[400px] lg:h-[400px]  ml-[-16px] lg:ml-0 mr-[-16px] lg:mr-0">
              <ReactPlayer
                url={`https://www.youtube.com/watch?v=${id}`}
                controls
                width="100%"
                height="400px"
                style={{ backgroundColor: '#000000' }}
                playing={true}
              />
            </div>

            <div className="text-white font-bold text-sm md:text-xl mt-4 line-clamp-2">
              {videoDetails?.title}
            </div>

            <div className="flex justify-between flex-col md:flex-row mt-4">
              <div className="flex">
                <div className="flex items-start">
                  <div className="flex h-11 w-11 rounded-full overflow-hidden">
                    <img
                      src={videoDetails?.thumbnails[2]?.url}
                      alt={videoDetails?.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
                <div className="flex flex-col ml-3">
                  <div className="text-white text-md font-semibold flex items-center">
                    {videoDetails?.author?.title}
                    {videoDetails?.author?.badges[0]?.type ===
                      'OFFICIAL_ARTIST_CHANNEL' ||
                      (videoDetails?.author?.badges[0]?.type ===
                        'VERIFIED_CHANNEL' && (
                        <BsFillCheckCircleFill className="text-white/[0.5] text-[12px] ml-1" />
                      ))}
                  </div>
                  <div className="text-white/[0.7] text-sm">
                    {videoDetails?.author?.stats?.subscribersText}
                  </div>
                </div>
              </div>

              <div className="flex text-white mt-4 md:mt-0">
                <div className="flex items-center justify-center h-11 px-5 md:px-6 rounded-3xl bg-white/[0.15]">
                  <AiOutlineLike className="text-xl text-white mr-2" />
                  {`${abbreviateNumber(videoDetails?.stats?.likes, 2)} Likes`}
                </div>
                <div className="flex items-center justify-center h-11 px-5 md:px-6 rounded-3xl bg-white/[0.15] ml-2 md:ml-4">
                  {`${abbreviateNumber(videoDetails?.stats?.views, 2)} Views`}
                </div>
              </div>
            </div>
            <div className="flex justify-between flex-col mt-4 mx-2 md:mx-4 bg-white/[0.15] p-2 rounded-lg">
              <div className="flex gap-2 mb-2">
                <p className="text-white text-xs font-bold">{`${abbreviateNumber(
                  videoDetails?.stats?.views,
                  2
                )} Views`}</p>
                <p className="text-white text-xs font-bold">
                  {new Date(videoDetails?.publishedDate).toLocaleDateString(
                    'en-US',
                    {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    }
                  )}
                </p>
              </div>
              <pre className="text-white text-sm whitespace-break-spaces ">
                {videoDetails?.description}
              </pre>
            </div>
            {!isLaptop && (
              <div className="text-white  mx-2 md:mx-4 mt-4">
                {!isRelatedContinuationVideosLoading &&
                relatedVideos?.length > 0 ? (
                  <div className="">
                    {relatedVideos?.map((item) => {
                      return (
                        <SuggestionVideoCard key={item.video_id} video={item} />
                      );
                    })}
                    <button
                      onClick={handleRelatedVideosFetch}
                      className="border-white border rounded-xl  w-full p-2 text-white hover:bg-white/[0.15]  transition-colors">
                      More
                    </button>
                  </div>
                ) : (
                  [...new Array(3)].map((_, i) => (
                    <div className="mb-3" key={i}>
                      <RelatedSkeleton />
                    </div>
                  ))
                )}
              </div>
            )}

            <div className=" mt-7 mx-4">
              <Comments videoId={id} />
            </div>
          </div>
        )}

        {isLaptop && (
          <div className="flex flex-col py-6 px-4 lg:w-[350px] xl:w-[400px]">
            {!isRelatedContinuationVideosLoading &&
            relatedVideos?.length > 0 ? (
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
                  return (
                    <SuggestionVideoCard key={item.video_id} video={item} />
                  );
                })}
              </InfiniteScroll>
            ) : (
              [...new Array(10)].map((_, i) => (
                <div className="mb-3" key={i}>
                  <RelatedSkeleton />
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};
export default VideoDetails;
