import { FC } from 'react';

const Loader: FC = () => {
  return (
    <div className="load-bar">
      <div className="bar"></div>
      <div className="bar"></div>
      <div className="bar"></div>
    </div>
  );
};

export default Loader;
