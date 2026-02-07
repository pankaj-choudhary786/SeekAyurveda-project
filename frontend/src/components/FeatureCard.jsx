import { FaRightLong } from "react-icons/fa6";
import GradientButton from "./GradientButton";

const FeatureCard = ({ image, heading, content, onClick }) => {
  return (
    <div className="bg-black/40 border border-black/20 text-[#FFFFC7] p-4 rounded-4xl flex flex-col text-center justify-between gap-2">
      <h2 className="text-xl md:text-2xl ml-3 font-semibold poppins">
        {heading}
      </h2>
      <p className="text-sm lg:text-md font-medium inter ml-3 text-center leading-5">
        {content}
      </p>
      <img src={image} alt={image} className="rounded-4xl aspect-video my-1" />

      <GradientButton content={`Experience our ${heading}`} onClick={onClick} />
    </div>
  );
};

export default FeatureCard;
