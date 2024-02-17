import { FC } from 'react';
import ContentLoader from 'react-content-loader';

const RelatedSkeleton: FC = () => {
  return (
    <ContentLoader
      speed={2}
      width={368}
      height={100}
      viewBox="0 0 368 100"
      backgroundColor="#474747"
      foregroundColor="#262626">
      <rect x="0" y="0" rx="12" ry="12" width="168" height="96" />
      <rect x="173" y="10" rx="0" ry="6" width="149" height="40" />
      <rect x="173" y="63" rx="0" ry="6" width="149" height="12" />
      <rect x="173" y="79" rx="0" ry="6" width="65" height="11" />
      <rect x="258" y="79" rx="0" ry="6" width="65" height="11" />
      <circle cx="247" cy="85" r="6" />
    </ContentLoader>
  );
};

export default RelatedSkeleton;
