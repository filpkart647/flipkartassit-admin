import React from 'react';

const Loading = () => {
  return (
    <div className="fixed inset-0 z-[1000] grid place-items-center overflow-auto bg-black/[0.2]">
      <div className="spinner">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loading;
