import React, { useState } from 'react';

const SCORING_KEY = {
  "Body Frame": { "Well Built": "Kapha", "Thin and Lean": "Vata", "Medium": "Pitta" },
  "Type of Hair": { "Dry": "Vata", "Normal": "Pitta", "Greasy": "Kapha" },
  "Color of Hair": { "Grey": "Vata", "Brown": "Pitta", "Black": "Kapha" },
  "Skin": { "Soft,Sweating": "Pitta", "Moist,Greasy": "Kapha", "Dry,Rough": "Vata" },
  "Complexion": { "Pinkish": "Pitta", "Dark": "Vata", "Glowing": "Kapha" },
  "Body Weight": { "Underweight": "Vata", "Overweight": "Kapha", "Normal": "Pitta" },
  "Nails": { "Redish": "Pitta", "Blackish": "Vata", "Pinkish": "Kapha" },
  "Size and Color of the Teeth": { "Large,White": "Kapha", "Medium,Yellowish": "Pitta", "Irregular,Blackish": "Vata" },
  "Pace of Performing Work": { "Fast": "Vata", "Medium": "Pitta", "Slow": "Kapha" },
  "Mental Activity": { "Aggressive": "Pitta", "Restless": "Vata", "Stable": "Kapha" },
  "Memory": { "Good Memory": "Pitta", "Long Term": "Kapha", "Short term": "Vata" },
  "Sleep Pattern": { "Sleepy": "Kapha", "Moderate": "Pitta", "Less": "Vata" },
  "Weather Conditions": { "Dislike Heat": "Pitta", "Dislike Moist": "Kapha", "Dislike Cold": "Vata" },
  "Reaction under Adverse Situations": { "Anger": "Pitta", "Calm": "Kapha", "Anxiety": "Vata" },
  "Mood": { "Changes Quickly": "Vata", "Constant": "Kapha", "Changes Slowly": "Pitta" },
  "Eating Habit": { "Irregular Chewing": "Vata", "Improper Chewing": "Kapha", "Proper Chewing": "Pitta" },
  "Hunger": { "Skips Meal": "Vata", "Sudden and Sharp": "Pitta", "Irregular": "Kapha" },
  "Body Temperature": { "Less than Normal": "Vata", "Normal": "Kapha", "More than Normal": "Pitta" },
  "Joints": { "Weak": "Vata", "Heavy": "Kapha", "Healthy": "Pitta" },
  "Nature": { "Forgiving,Grateful": "Kapha", "Jealous,Fearful": "Vata", "Egoistic,Fearless": "Pitta" },
  "Body Energy": { "Medium": "Pitta", "Low": "Vata", "High": "Kapha" },
  "Quality of Voice": { "Deep": "Kapha", "Fast": "Pitta", "Rough": "Vata" },
  "Dreams": { "Sky": "Vata", "Fire": "Pitta", "Water": "Kapha" },
  "Social Relations": { "Ambivert": "Pitta", "Introvert": "Vata", "Extrovert": "Kapha" },
  "Body Odor": { "Strong": "Pitta", "Negligible": "Vata", "Mild": "Kapha" }
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
      if (SCORING_KEY[key] && SCORING_KEY[key][answers[key]]) {
        const dosha = SCORING_KEY[key][answers[key]];
        scores[dosha]++;
      }
    });

    const dominant = Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b);
    return { dominant, scores };
  };

  const progress = ((currentStep + 1) / QUESTIONS.length) * 100;

  return (
    <div className="min-h-screen bg-[#f8faf8] p-4 md:p-10 flex items-center justify-center">
      {/* GRID CHANGES:
        - items-stretch: Forces both columns to be equal height
      */}
      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 items-stretch">
        
        {/* LEFT DIV: Image + CTA */}
        {/* h-full ensures this container fills the grid cell */}
        <div className="flex flex-col gap-6 h-full">
          <div className="relative overflow-hidden rounded-3xl shadow-2xl pt-12 group flex-shrink-0">
            <img 
              src="https://images.unsplash.com/photo-1600618528240-fb9fc964b853?q=80&w=2070&auto=format&fit=crop" 
              alt="Ayurveda Wellness" 
              className="w-full h-64 md:h-[400px] object-cover transform transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
              <h3 className="text-white text-3xl font-bold">Discover Your True Nature</h3>
            </div>
          </div>
          
          {/* flex-grow here ensures the text card fills any remaining vertical space if the right side is taller */}
          <div className="bg-white p-8 rounded-3xl shadow-lg border border-[#3b6751]/20 flex-grow flex flex-col justify-center">
            <h4 className="text-[#3b6751] font-bold text-xl mb-3 uppercase tracking-wider">Why take this test?</h4>
            <p className="text-gray-600 leading-relaxed mb-4">
              According to Ayurveda, your constitution (Prakriti) determines your physical, physiological, and psychological character. 
              Knowing your dominant Dosha helps you:
            </p>
            <ul className="space-y-3 text-gray-700 font-medium">
              <li className="flex items-center gap-3">
                <span className="bg-[#3b6751] text-white rounded-full p-1 text-xs">✓</span> 
                Optimize your diet for better digestion
              </li>
              <li className="flex items-center gap-3">
                <span className="bg-[#3b6751] text-white rounded-full p-1 text-xs">✓</span> 
                Understand your stress triggers
              </li>
              <li className="flex items-center gap-3">
                <span className="bg-[#3b6751] text-white rounded-full p-1 text-xs">✓</span> 
                Choose the right exercise and lifestyle
              </li>
            </ul>
          </div>
        </div>

        {/* RIGHT DIV: Questionnaire */}
        <div className="flex flex-col w-full h-full">
          
          {isFinished ? (
            // RESULTS CARD (Added h-full and flex/justify classes)
            (() => {
              const { dominant, scores } = calculateResult();
              return (
                <div className="bg-white p-10 rounded-3xl shadow-2xl text-center w-full border-t-8 border-[#3b6751] animate-fade-in h-full flex flex-col justify-center">
                  <h2 className="text-3xl font-bold text-[#3b6751] mb-4">Assessment Complete</h2>
                  <p className="text-gray-500 mb-2 uppercase tracking-widest text-sm">Your Primary Dosha</p>
                  <div className="text-6xl font-black text-gray-800 mb-8 capitalize">{dominant}</div>
                  
                  <div className="grid grid-cols-3 gap-4 border-t pt-6 font-bold text-lg mb-8">
                    <div className="flex flex-col p-2 bg-blue-50 rounded-xl">
                      <span className="text-blue-500 text-sm uppercase">Vata</span>
                      <span className="text-2xl">{scores.Vata}</span>
                    </div>
                    <div className="flex flex-col p-2 bg-red-50 rounded-xl">
                      <span className="text-red-500 text-sm uppercase">Pitta</span>
                      <span className="text-2xl">{scores.Pitta}</span>
                    </div>
                    <div className="flex flex-col p-2 bg-green-50 rounded-xl">
                      <span className="text-green-600 text-sm uppercase">Kapha</span>
                      <span className="text-2xl">{scores.Kapha}</span>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => {
                      setIsFinished(false);
                      setCurrentStep(0);
                      setAnswers({});
                    }} 
                    className="mt-auto bg-[#3b6751] hover:bg-[#2c4e3d] text-white px-8 py-4 rounded-full font-bold transition-colors w-full shadow-lg shadow-[#3b6751]/30"
                  >
                    Retake Assessment
                  </button>
                </div>
              );
            })()
          ) : (
            // QUESTION CARD (Added h-full and flex/justify classes)
            <>
              <div className="w-full bg-gray-200 h-3 rounded-full mb-8 overflow-hidden shadow-inner">
                <div 
                  className="bg-[#3b6751] h-full transition-all duration-500 ease-out" 
                  style={{ width: `${progress}%` }}
                ></div>
              </div>

              {/* Added h-full to make it stretch to match the left column */}
              <div className="bg-[#e9eee9] p-8 md:p-12 rounded-[2.5rem] shadow-xl border border-white/60 relative overflow-hidden w-full h-full flex flex-col justify-between">
                <div>
                  <div className="absolute top-0 right-0 p-6 opacity-10 font-black text-8xl italic text-[#3b6751] select-none">
                    {currentStep + 1}
                  </div>
                  
                  <p className="text-sm font-bold text-[#3b6751] uppercase tracking-widest mb-4">
                    Question {currentStep + 1} of {QUESTIONS.length}
                  </p>
                  
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-10 leading-snug">
                    How would you describe your <span className="text-[#3b6751] block md:inline underline decoration-[#3b6751]/30 underline-offset-4">{QUESTIONS[currentStep].label.toLowerCase()}</span>?
                  </h2>

                  <div className="grid grid-cols-1 gap-3">
                    {QUESTIONS[currentStep].options.map((option) => (
                      <button
                        key={option}
                        onClick={() => handleSelect(option)}
                        className={`w-full py-4 px-6 rounded-2xl border-2 text-left font-bold text-lg transition-all transform active:scale-[0.98] ${
                          answers[QUESTIONS[currentStep].id] === option
                            ? 'bg-[#3b6751] text-white border-[#3b6751] shadow-lg translate-x-1'
                            : 'bg-white text-gray-600 border-transparent hover:border-[#3b6751] hover:shadow-md'
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-8 flex justify-between items-center text-gray-500 font-bold text-sm pt-4 border-t border-gray-300/30">
                  <button 
                    onClick={() => currentStep > 0 && setCurrentStep(currentStep - 1)}
                    disabled={currentStep === 0}
                    className="disabled:opacity-0 flex items-center gap-2 hover:text-[#3b6751] transition-opacity"
                  >
                    ← Previous
                  </button>
                  <span>{Math.round(progress)}% Complete</span>
                </div>
              </div>
            </>
          )}
        </div>
        
      </div>
    </div>
  );
};

export default Questionnaire;