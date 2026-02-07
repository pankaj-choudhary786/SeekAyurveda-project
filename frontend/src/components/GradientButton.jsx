import { FaRightLong } from "react-icons/fa6";

const GradientButton = ({ content, classname, onClick, icon }) => {
  return (
    <button
      className={` ${classname}
                relative mt-4
                px-2 py-3
                text-lg font-semibold
                text-[#FFFFC7]
                rounded-xl
                bg-gradient-to-r from-[#286459] via-[#2f7a6c] to-[#286459]
                shadow-[0_8px_25px_rgba(40,100,89,0.35)]
                transition-all duration-300 ease-out
                hover:-translate-y-0.5 hover:scale-101
                focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3aa58f]
                group overflow-hidden
              `}
      onClick={onClick}
    >
      <span
        className="
                  absolute inset-0
                  rounded-2xl
                  bg-[#3aa58f]
                  blur-2xl
                  opacity-0
                  transition-opacity duration-300
                  group-hover:opacity-30
                "
      />

      <span
        className="
                  absolute inset-0
                  bg-gradient-to-t
                  from-transparent via-white/10 to-transparent
                  opacity-0
                  group-hover:opacity-100
                  transition-opacity duration-300
                "
      />

      <span className="relative z-10 tracking-wide flex justify-center items-center gap-3 md:gap-5 text-sm">
        {content}
        <span className="text-lg md:text-xl">
          {icon ? icon : <FaRightLong />}
        </span>
      </span>
    </button>
  );
};

export default GradientButton;
