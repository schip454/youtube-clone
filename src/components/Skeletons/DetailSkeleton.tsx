import { FC } from 'react';

import ContentLoader from 'react-content-loader';

const DetailSkeleton: FC = () => {
  return (
    <ContentLoader
      speed={2}
      width={480}
      height={480}
      viewBox="0 0 480 480"
      backgroundColor="#474747"
      foregroundColor="#262626">
      <rect x="0" y="0" rx="12" ry="12" width="480" height="260" />
      <rect x="0" y="275" rx="6" ry="6" width="480" height="40" />
      <rect x="0" y="432" rx="6" ry="6" width="480" height="44" />
      <rect x="0" y="397" rx="6" ry="6" width="86" height="15" />
      <circle cx="26" cy="351" r="26" />
      <rect x="59" y="334" rx="6" ry="6" width="227" height="20" />
      <rect x="59" y="359" rx="6" ry="6" width="228" height="10" />
      <rect x="304" y="332" rx="12" ry="12" width="80" height="38" />
      <rect x="399" y="332" rx="12" ry="12" width="80" height="38" />
      <rect x="93" y="397" rx="6" ry="6" width="86" height="15" />
    </ContentLoader>
  );
};

export default DetailSkeleton;
