
import React from 'react';

const Loader: React.FC = () => (
  <div className="flex flex-col items-center justify-center space-y-4">
    <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
    <p className="text-lg text-green-700 dark:text-green-300 font-medium">AI is analyzing your leaf...</p>
  </div>
);

export default Loader;
