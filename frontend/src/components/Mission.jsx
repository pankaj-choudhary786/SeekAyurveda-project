import mission from "../assets/mission.png";

const Mission = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex flex-col items-center py-5 mt-2 md:mt-10 w-[95vw] lg:w-[96vw] xl:w-[97vw] rounded-4xl border-4 border-white/10 backdrop-blur-xl shadow-[0_0_20px_rgba(0,0,0,0.25)]">
        <div className="flex flex-col justify-center items-center">
          <h1 className="p-1 text-4xl lg:text-5xl font-bold inter">
            Our <span className="text-[rgb(40,100,89)]">Mission</span>
            <br />
          </h1>
          <h3 className="text-2xl md:text-3xl font-medium">
            What do we <span className="text-[rgb(40,100,89)]">aim?</span>
          </h3>
        </div>

        <div className="w-[95%] my-4 bg-[#587D0A]/40 border-3 border-white/10 backdrop-blur-xl shadow-[0_0_20px_rgba(0,0,0,0.25)] rounded-4xl">
          <div className="flex flex-col items-center p-5 gap-4">
            <p className="px-4 py-1 text-center font-medium text-md sm:text-md md:text-lg lg:text-xl">
              We aim to democratize Ayurvedic knowledge by building the world's most
              intelligent holistic health platform.
            </p>
            <img src={mission} alt="Mission image" className=" w-full rounded-4xl max-h-[60vh] object-cover"/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mission;
