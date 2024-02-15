import React from 'react';
import ContentLoader from 'react-content-loader';

const Skeletons = () => {
  return (
    <ContentLoader
      speed={2}
      width={260}
      height={262}
      viewBox="0 0 300 262"
      backgroundColor="#474747"
      foregroundColor="#262626">
      <rect x="0" y="0" rx="12" ry="12" width="300" height="160" />
      <circle cx="24" cy="196" r="24" />
      <rect x="59" y="176" rx="6" ry="6" width="237" height="40" />
      <rect x="59" y="229" rx="6" ry="6" width="237" height="12" />
      <rect x="59" y="245" rx="6" ry="6" width="111" height="12" />
      <rect x="194" y="246" rx="6" ry="6" width="100" height="11" />
      <circle cx="181" cy="251" r="6" />
    </ContentLoader>
  );
};

export default Skeletons;
