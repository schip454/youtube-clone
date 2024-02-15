import React from 'react';
import ContentLoader from 'react-content-loader';

const CommentSkeleton = () => {
  return (
    <ContentLoader
      speed={2}
      width={990}
      height={70}
      viewBox="0 0 990 70"
      backgroundColor="#474747"
      foregroundColor="#262626">
      <rect x="70" y="19" rx="6" ry="6" width="990" height="20" />
      <circle cx="30" cy="24" r="24" />
      <rect x="71" y="44" rx="6" ry="6" width="128" height="18" />
      <rect x="70" y="0" rx="6" ry="6" width="58" height="12" />
      <rect x="142" y="0" rx="6" ry="6" width="58" height="12" />
      <circle cx="135" cy="6" r="5" />
    </ContentLoader>
  );
};

export default CommentSkeleton;
