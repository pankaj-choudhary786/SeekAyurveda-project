import React, { useState } from 'react';


const SCORING_KEY = {
  "Body Frame": { "Well Built": "Kapha", "Thin and Lean": "Kapha", "Medium": "Pitta" },
  "Type of Hair": { "Dry": "Kapha", "Normal": "Kapha", "Greasy": "Kapha" },
  "Color of Hair": { "Grey": "Kapha", "Brown": "Kapha", "Black": "Kapha" },
  "Skin": { "Soft,Sweating": "Kapha", "Moist,Greasy": "Kapha", "Dry,Rough": "Kapha" },
  "Complexion": { "Pinkish": "Kapha", "Dark": "Kapha", "Glowing": "Kapha" },
  "Body Weight": { "Underweight": "Kapha", "Overweight": "Kapha", "Normal": "Kapha" },
  "Nails": { "Redish": "Kapha", "Blackish": "Kapha", "Pinkish": "Kapha" },
  "Size and Color of the Teeth": { "Large,White": "Kapha", "Medium,Yellowish": "Kapha", "Irregular,Blackish": "Kapha" },
  "Pace of Performing Work": { "Fast": "Pitta", "Medium": "Pitta", "Slow": "Kapha" },
  "Mental Activity": { "Aggressive": "Pitta", "Restless": "Pitta", "Stable": "Kapha" },
  "Memory": { "Good Memory": "Kapha", "Long Term": "Kapha", "Short term": "Kapha" },
  "Sleep Pattern": { "Sleepy": "Kapha", "Moderate": "Kapha", "Less": "Kapha" },
  "Weather Conditions": { "Dislike Heat": "Kapha", "Dislike Moist": "Kapha", "Dislike Cold": "Kapha" },
  "Reaction under Adverse Situations": { "Anger": "Kapha", "Calm": "Kapha", "Anxiety": "Kapha" },
  "Mood": { "Changes Quickly": "Kapha", "Constant": "Kapha", "Changes Slowly": "Kapha" },
  "Eating Habit": { "Irregular Chewing": "Kapha", "Improper Chewing": "Kapha", "Proper Chewing": "Kapha" },
  "Hunger": { "Skips Meal": "Kapha", "Sudden and Sharp": "Kapha", "Irregular": "Kapha" },
  "Body Temperature": { "Less than Normal": "Kapha", "Normal": "Kapha", "More than Normal": "Kapha" },
  "Joints": { "Weak": "Pitta", "Heavy": "Kapha", "Healthy": "Pitta" },
  "Nature": { "Forgiving,Grateful": "Kapha", "Jealous,Fearful": "Kapha", "Egoistic,Fearless": "Kapha" },
  "Body Energy": { "Medium": "Pitta", "Low": "Kapha", "High": "Kapha" },
  "Quality of Voice": { "Deep": "Kapha", "Fast": "Pitta", "Rough": "Kapha" },
  "Dreams": { "Sky": "Kapha", "Fire": "Kapha", "Water": "Kapha" },
  "Social Relations": { "Ambivert": "Kapha", "Introvert": "Kapha", "Extrovert": "Kapha" },
  "Body Odor": { "Strong": "Kapha", "Negligible": "Pitta", "Mild": "Pitta" }
};

const QUESTIONS = Object.keys(SCORING_KEY).map(key => ({
  id: key,
  label: key,
  options: Object.keys(SCORING_KEY[key])
}));

const Questionnaire = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isFinished, setIsFinished] = useState(false);

  const handleSelect = (option) => {
    const qId = QUESTIONS[currentStep].id;
    setAnswers({ ...answers, [qId]: option });
    
   
    setTimeout(() => {
      if (currentStep < QUESTIONS.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        setIsFinished(true);
      }
    }, 300);
  };

  const calculateResult = () => {
    let scores = { Vata: 0, Pitta: 0, Kapha: 0 };
    Object.keys(answers).forEach(key => {
      const dosha = SCORING_KEY[key][answers[key]];
      scores[dosha]++;
    });
    
    const dominant = Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b);
    return { dominant, scores };
  };

  if (isFinished) {
    const { dominant, scores } = calculateResult();
    return (
      <div className="bg-white p-10 rounded-3xl shadow-2xl text-center max-w-2xl mx-auto border-t-8 border-[#3b6751]">
        <h2 className="text-3xl font-bold text-[#3b6751] mb-4">Assessment Complete</h2>
        <p className="text-gray-500 mb-2 uppercase tracking-widest text-sm">Your Primary Dosha</p>
        <div className="text-6xl font-black text-gray-800 mb-8">{dominant}</div>
        <div className="flex justify-between border-t pt-6 font-bold text-lg">
          <div className="text-blue-500">Vata: {scores.Vata}</div>
          <div className="text-red-500">Pitta: {scores.Pitta}</div>
          <div className="text-green-600">Kapha: {scores.Kapha}</div>
        </div>
        <button onClick={() => window.location.reload()} className="mt-10 bg-[#3b6751] text-white px-8 py-3 rounded-full font-bold">Restart Quiz</button>
      </div>
    );
  }

  const progress = ((currentStep + 1) / QUESTIONS.length) * 100;

  return (
    <div className="max-w-2xl mx-auto">
      
      <div className="w-full bg-gray-200 h-2 rounded-full mb-8 overflow-hidden">
        <div className="bg-[#3b6751] h-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
      </div>

      {/* Question Card */}
      <div className="bg-[#e9eee9] p-8 md:p-12 rounded-[2.5rem] shadow-xl border border-white/60 relative overflow-hidden w-full">
        <div className="absolute top-0 right-0 p-6 opacity-10 font-black text-6xl italic text-[#3b6751]">
          {currentStep + 1}
        </div>
        
        <p className="text-sm font-bold text-[#3b6751] uppercase tracking-widest mb-2">Question {currentStep + 1} of 25</p>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-10 leading-snug">
          How would you describe your <span className="text-[#3b6751]">{QUESTIONS[currentStep].label.toLowerCase()}</span>?
        </h2>

        <div className="grid grid-cols-1 gap-4">
          {QUESTIONS[currentStep].options.map((option) => (
            <button
              key={option}
              onClick={() => handleSelect(option)}
              className={`w-full py-5 px-8 rounded-2xl border-2 text-left font-bold text-lg transition-all transform active:scale-95 ${
                answers[QUESTIONS[currentStep].id] === option
                  ? 'bg-[#3b6751] text-white border-[#3b6751] shadow-lg translate-x-2'
                  : 'bg-white text-gray-600 border-transparent hover:border-[#3b6751] hover:shadow-md'
              }`}
            >
              {option}
            </button>
          ))}
        </div>

        
        <div className="mt-12 flex justify-between items-center text-gray-500 font-bold">
          <button 
            onClick={() => currentStep > 0 && setCurrentStep(currentStep - 1)}
            disabled={currentStep === 0}
            className="disabled:opacity-20 flex items-center gap-2 hover:text-[#3b6751]"
          >
            ← Previous
          </button>
          <span>{Math.round(progress)}% done</span>
        </div>
      </div>
    </div>
  );
};

export default Questionnaire;