import { FC } from 'react';
import ContentLoader from 'react-content-loader';

const SearchSkeleton: FC = () => {
  return (
    <ContentLoader
      speed={2}
      width={990}
      height={160}
      viewBox="0 0 990 160"
      backgroundColor="#474747"
      foregroundColor="#262626">
      <rect x="0" y="0" rx="12" ry="12" width="256" height="160" />
      <rect x="280" y="1" rx="6" ry="6" width="990" height="34" />
      <rect x="280" y="46" rx="6" ry="6" width="990" height="54" />
      <circle cx="304" cy="132" r="24" />
      <rect x="343" y="115" rx="6" ry="6" width="128" height="18" />
      <rect x="343" y="141" rx="6" ry="6" width="58" height="12" />
      <rect x="415" y="141" rx="6" ry="6" width="58" height="12" />
      <circle cx="408" cy="147" r="5" />
    </ContentLoader>
  );
};

export default SearchSkeleton;
