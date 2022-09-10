import React from 'react';

import { ReactComponent as LoaderSVG } from './loader.svg';

interface ILoaderProps {
  loading: boolean;
}

const Loader: React.FC<ILoaderProps> = ({ loading }) => {
  return (
    <div className={`loader ${loading ? 'loader--active' : ''}`}>
      <LoaderSVG />
    </div>
  );
};

export default Loader;
