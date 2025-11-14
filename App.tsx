
import React, { useState, useCallback } from 'react';
import ImageUploader from './components/ImageUploader';
import AnalysisResult from './components/AnalysisResult';
import Loader from './components/Loader';
import LeafIcon from './components/icons/LeafIcon';
import { analyzePlantLeaf } from './services/geminiService';
import type { AnalysisResultData } from './types';

const fileToBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve((reader.result as string).split(',')[1]);
    reader.onerror = (error) => reject(error);
  });

const App: React.FC = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResultData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageFile(file);
      setAnalysisResult(null);
      setError(null);
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };
  
  const handleAnalyzeClick = useCallback(async () => {
    if (!imageFile) {
      setError("Please upload an image first.");
      return;
    }

    setIsLoading(true);
    setAnalysisResult(null);
    setError(null);

    try {
      const imageData = await fileToBase64(imageFile);
      const result = await analyzePlantLeaf(imageData, imageFile.type);
      setAnalysisResult(result);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An unknown error occurred.";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [imageFile]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 font-sans">
      <main className="container mx-auto px-4 py-8 sm:py-12 flex flex-col items-center">
        <header className="text-center mb-8 sm:mb-12">
          <div className="flex items-center justify-center space-x-3 mb-2">
            <LeafIcon className="h-10 w-10 text-green-500" />
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white">
              Plant Leaf Checker
            </h1>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Upload a picture of a plant leaf, and our AI will analyze its health, predict its future, and identify potential issues.
          </p>
        </header>

        <div className="w-full flex flex-col items-center space-y-6">
          <ImageUploader onImageChange={handleImageChange} imagePreview={imagePreview} />

          <button
            onClick={handleAnalyzeClick}
            disabled={!imageFile || isLoading}
            className="px-8 py-3 bg-green-600 text-white font-bold text-lg rounded-full shadow-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transform hover:scale-105 transition-all duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-green-300 dark:focus:ring-green-800"
          >
            {isLoading ? 'Analyzing...' : 'Analyze Leaf'}
          </button>

          <div className="w-full max-w-2xl mt-8">
            {isLoading && <Loader />}
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative text-center" role="alert">
                <strong className="font-bold">Error: </strong>
                <span className="block sm:inline">{error}</span>
              </div>
            )}
            {analysisResult && <AnalysisResult data={analysisResult} />}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
