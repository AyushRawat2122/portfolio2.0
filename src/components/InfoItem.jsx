import React from 'react';

const InfoItem = ({ icon: Icon, darkMode = false, iconSize = 18 }) => {
  return (
    <div
      className={`inline-flex shrink-0 rounded-2xl border-2 p-1 ${
        darkMode ? 'border-gray-600' : 'border-gray-300'
      }`}
    >
      <div
        className={`grid place-items-center w-[36px] h-[36px] rounded-xl border ${
          darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-200 border-gray-300'
        }`}
      >
        <Icon
          size={iconSize}
          className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} block`}
          aria-hidden="true"
          focusable="false"
        />
      </div>
    </div>
  );
};

export default InfoItem;