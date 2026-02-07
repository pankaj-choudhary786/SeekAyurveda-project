import React from "react";
import Hero from "../components/Hero";
import Mission from "../components/Mission";
import OurFeatures from "../components/OurFeatures";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col gap-7 bg-[#FFFFC7] pb-10">
      <Hero />
      <Mission />
      <OurFeatures />
    </div>
  );
};

export default Home;
