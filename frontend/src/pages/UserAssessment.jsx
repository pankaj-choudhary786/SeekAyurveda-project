import { IoClose } from "react-icons/io5";

const UserAssessment = ({ onClose }) => {
  const questionAns = [
    { id: "1", question: "What is your physical frame and weight like?" },
    { id: "2", question: "How is your appetite and digestion?" },
    { id: "3", question: "How do you respond to stress or pressure?" },
    { id: "4", question: "What is your natural skin and hair texture?" },
    { id: "5", question: "What is your sleep pattern like?" },
  ];
  return (
    <>
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-20"
        onClick={() => onClose(false)}
      />
      <div className="z-30 fixed inset-0 m-auto flex flex-col backdrop-blur-md border border-white/20 shadow-2xl rounded-2xl w-[90vw] md:w-[75vw] max-h-[75vh] md:max-h-[70vh] overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#1e4a42]/30 bg-[#1e4a42]">
          <h2 className="text-white font-semibold text-xl tracking-wide">
            User Assessment Form
          </h2>
          <button
            onClick={() => onClose(false)}
            className="text-white/70 hover:text-white transition-colors p-1"
          >
            <IoClose className="text-2xl" />
          </button>
        </div>

        <div
          className="flex-1 overflow-y-auto p-3 text-white/90
          [&::-webkit-scrollbar]:w-2
          [&::-webkit-scrollbar-track]:bg-transparent
          [&::-webkit-scrollbar-thumb]:bg-[#1e4a42]/60
          [&::-webkit-scrollbar-thumb]:rounded
          hover:[&::-webkit-scrollbar-thumb]:bg-[#1e4a42]"
        >
          <section>
            <div className="space-y-3 md:space-y-4">
              {questionAns.map((question) => (
                <div
                  key={question.id}
                  className="p-2 rounded-xl bg-white/80 text-[#1e4a42] space-y-2 backdrop-blur-xl shadow-[0_0_6px_black] text-xs sm:text-sm md:text-md"
                >
                  <div className="flex gap-2">
                    <span className="font-medium px-4 py-0.5 bg-[#1e4a42]/50 rounded-lg">
                      Q{question.id}.
                    </span>
                    <span>{question.question}</span>
                  </div>

                  <input
                    type="text"
                    placeholder="Enter your response here"
                    className="px-4 py-1 outline-none ring rounded-lg font-light w-full"
                  />
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="px-6 py-2 border-t border-[#1e4a42]/30 bg-[#1e4a42]/70 flex justify-end gap-3">
          <button className="px-4 py-2 text-sm text-white/70 hover:text-white transition-all">
            Cancel
          </button>
          <button className="px-5 py-2 text-sm bg-[#1e4a42] text-white rounded-lg hover:bg-[#2a6358] transition-all shadow-lg">
            Save Progress
          </button>
        </div>
      </div>
    </>
  );
};

export default UserAssessment;
