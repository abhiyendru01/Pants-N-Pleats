import React from 'react';

const Loader = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-9 h-9 border-4 border-gray-800 border-t-transparent border-solid rounded-full animate-spin"></div>
    </div>
  );
}

export default Loader;
