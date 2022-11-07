import React from 'react';
import Loader from 'react-loader-spinner';

function Spinner({ message }) {
  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      <Loader
        type="Watch"
        color="#FF9F1C"
        height={40}
        width={100}
        className="m-5"
      />

      <p className="text-lg text-center px-2">{message}</p>
    </div>
  );
}

export default Spinner;
