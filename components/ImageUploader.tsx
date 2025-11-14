
import React, { useRef } from 'react';
import UploadIcon from './icons/UploadIcon';

interface ImageUploaderProps {
  onImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  imagePreview: string | null;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageChange, imagePreview }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  return (
    <div
      onClick={handleClick}
      className="relative w-full max-w-lg h-64 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl flex items-center justify-center cursor-pointer hover:border-green-500 dark:hover:border-green-400 transition-colors duration-300 bg-white dark:bg-gray-800 shadow-sm"
    >
      <input
        type="file"
        ref={inputRef}
        onChange={onImageChange}
        className="hidden"
        accept="image/png, image/jpeg, image/webp"
      />
      {imagePreview ? (
        <img src={imagePreview} alt="Plant leaf preview" className="object-contain h-full w-full rounded-xl p-2" />
      ) : (
        <div className="text-center text-gray-500 dark:text-gray-400">
          <UploadIcon className="mx-auto h-12 w-12" />
          <p className="mt-2 font-semibold">Click to upload an image</p>
          <p className="text-sm">or drag and drop</p>
          <p className="text-xs mt-1">PNG, JPG, WEBP</p>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
