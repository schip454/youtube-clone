import { FC } from 'react';

interface IVideoLength {
  time: string;
}

const VideoLength: FC<IVideoLength> = ({ time }) => {
  return (
    <div className="absolute bottom-2 right-2 bg-black py-1 px-2 text-white text-xs rounded-md">
      {time}
    </div>
  );
};

export default VideoLength;
