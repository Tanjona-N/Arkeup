import React from 'react';

const Logo = () => {
  return (
    <div className="flex items-center">
      <span className="text-2xl font-bold text-slate-700">Arke</span>
      <div className="relative">
        <div className="bg-green-500 text-white font-bold text-xl rounded-md px-1 rotate-12 transform transition-transform hover:rotate-0 duration-300">
          Up
        </div>
      </div>
    </div>
  );
};

export default Logo;