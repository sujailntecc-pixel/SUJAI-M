import React, { useState } from 'react';
import type { AnalysisResultData } from '../types';
import BookIcon from './icons/BookIcon';
import ShieldIcon from './icons/ShieldIcon';
import FlaskConicalIcon from './icons/FlaskConicalIcon';

interface AnalysisResultProps {
  data: AnalysisResultData;
}

const CheckCircleIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const AlertTriangleIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
  </svg>
);

const AnalysisResult: React.FC<AnalysisResultProps> = ({ data }) => {
  const [isTamil, setIsTamil] = useState(false);

  const toggleLanguage = () => setIsTamil(!isTamil);

  const displayedData = isTamil ? data.tamil_translation : data;
  const reportTitle = isTamil ? "பகுப்பாய்வு அறிக்கை" : "Analysis Report";
  const plantIdentifiedLabel = isTamil ? "அடையாளம் காணப்பட்ட தாவரம்" : "Plant Identified";
  const healthConditionLabel = isTamil ? "சுகாதார நிலை" : "Health Condition";
  const futureOutlookLabel = isTamil ? "எதிர்கால கண்ணோட்டம்" : "Future Outlook";
  const botanicalInfoLabel = isTamil ? "தாவரவியல் தகவல்" : "Botanical Information";
  const healthTipsLabel = isTamil ? "உடல்நலம் மற்றும் பராமரிப்பு குறிப்புகள்" : "Health & Care Tips";
  const disadvantagesLabel = isTamil ? "சாத்தியமான தீமைகள்" : "Potential Disadvantages";
  const accuracyLabel = isTamil ? "துல்லிய அறிக்கை" : "Accuracy Report";
  const reactionLabel = isTamil ? "தாவரவியல் எதிர்வினை அறிக்கை" : "Botany Reaction Report";


  return (
    <div className="w-full max-w-2xl space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white">{reportTitle}</h2>
        <button
          onClick={toggleLanguage}
          className="px-4 py-2 text-sm font-semibold text-green-700 bg-green-100 dark:bg-green-800 dark:text-green-200 rounded-full hover:bg-green-200 dark:hover:bg-green-700 transition-colors"
        >
          {isTamil ? 'Switch to English' : 'தமிழுக்கு மாறு'}
        </button>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center">
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{plantIdentifiedLabel}</p>
        <h3 className="text-2xl font-bold text-gray-800 dark:text-white mt-1">{displayedData.plant_name}</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-semibold text-green-700 dark:text-green-400 mb-2">{healthConditionLabel}</h3>
          <p className="text-gray-700 dark:text-gray-300">{displayedData.health_condition}</p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-400 mb-2">{futureOutlookLabel}</h3>
          <p className="text-gray-700 dark:text-gray-300">{displayedData.future_outlook}</p>
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <div className="flex items-center mb-3">
          <ShieldIcon className="h-6 w-6 text-gray-600 dark:text-gray-400 mr-3 flex-shrink-0" />
          <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-400">{accuracyLabel}</h3>
        </div>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{displayedData.accuracy_report}</p>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <div className="flex items-center mb-3">
          <FlaskConicalIcon className="h-6 w-6 text-orange-600 dark:text-orange-400 mr-3 flex-shrink-0" />
          <h3 className="text-xl font-semibold text-orange-700 dark:text-orange-400">{reactionLabel}</h3>
        </div>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{displayedData.botany_reaction_report}</p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <div className="flex items-center mb-3">
          <BookIcon className="h-6 w-6 text-purple-600 dark:text-purple-400 mr-3 flex-shrink-0" />
          <h3 className="text-xl font-semibold text-purple-700 dark:text-purple-400">{botanicalInfoLabel}</h3>
        </div>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{displayedData.botanical_information}</p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-semibold text-teal-700 dark:text-teal-400 mb-3">{healthTipsLabel}</h3>
        <ul className="space-y-3">
          {displayedData.health_tips.map((tip, index) => (
            <li key={index} className="flex items-start">
              <CheckCircleIcon className="h-5 w-5 text-teal-500 dark:text-teal-400 mr-3 flex-shrink-0 mt-0.5" />
              <span className="text-gray-700 dark:text-gray-300">{tip}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-semibold text-yellow-700 dark:text-yellow-400 mb-3">{disadvantagesLabel}</h3>
        <ul className="space-y-3">
          {displayedData.advanced_disadvantages.map((disadvantage, index) => (
            <li key={index} className="flex items-start">
              <AlertTriangleIcon className="h-5 w-5 text-yellow-500 dark:text-yellow-400 mr-3 flex-shrink-0 mt-0.5" />
              <span className="text-gray-700 dark:text-gray-300">{disadvantage}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AnalysisResult;