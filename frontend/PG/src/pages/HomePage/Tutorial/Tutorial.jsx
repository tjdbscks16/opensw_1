import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TutorialHeader from './components/TutorialHeader';
import TutorialStep1 from './components/TutorialStep1';
import TutorialStep2 from './components/TutorialStep2';

export default function Tutorial() {
  const [currentStep, setCurrentStep] = useState(1);
  const navigate = useNavigate();

  const handleClose = () => {
    navigate('/');
  };

  const handleNext = () => {
    if (currentStep < 2) {
      setCurrentStep(currentStep + 1);
    } else {
      handleClose();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-white overflow-hidden">
      {/* 헤더 */}
      <TutorialHeader 
        step={currentStep} 
        onClose={handleClose}
      />

      {/* 콘텐츠 영역 */}
      <main className="pt-20 pb-20 px-8">
        <div className="max-w-7xl mx-auto">
          {currentStep === 1 && <TutorialStep1 />}
          {currentStep === 2 && <TutorialStep2 />}
        </div>
      </main>

      {/* 네비게이션 버튼 */}
      <div className="fixed bottom-10 left-0 right-0 flex justify-center gap-6 z-20">
        <button
          onClick={handlePrevious}
          disabled={currentStep === 1}
          className="px-8 py-3 rounded-full border-2 border-white bg-gray-800 text-white hover:bg-gray-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          뒤로
        </button>
        <button
          onClick={handleNext}
          className="px-8 py-3 rounded-full border-2 border-blue-400 bg-blue-600 text-white hover:bg-blue-500 transition"
        >
          {currentStep === 2 ? '완료' : 'NEXT'}
        </button>
      </div>
    </div>
  );
}
