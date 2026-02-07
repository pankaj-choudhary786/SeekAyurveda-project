import { useState } from "react";
import FeatureCard from "./FeatureCard";
import maggi from "../assets/maggi.png";
import { useNavigate } from "react-router";
import ChatbotButton from "./ChatbotButton";

const OurFeatures = () => {
  const navigate = useNavigate();
  const [showChat, setShowChat] = useState(false);

  const features = [
    {
      image: maggi,
      heading: "Vaidya Locator",
      content: "Find the ayurved doctor near me",
      link: "/vaidya_loc",
    },
    {
      image: maggi,
      heading: "Ayur Pantry",
      content: "Click your ingredients to get meals suggestion basesd on season",
      link: "/ayur_pantry",
    },
    {
      image: maggi,
      heading: "Product Scanner",
      content: "Gives caution for harmful product",
      link: "/product_scan",
    },
    {
      image: maggi,
      heading: "Health Tracker",
      content: "Track your mental health",
      link: "/health_track",
    },
    {
      image: maggi,
      heading: "News Hub",
      content: "Get the latest ayurveda news",
      link: "/news_hub",
    },
    {
      image: maggi,
      heading: "Ayur Saathi",
      content: "Chat with your personal ayurvedic assistant",
      link: "/ayur_saathi",
      isChat: true,
    },
  ];

  return (
    <div className="relative flex flex-col justify-center items-center">
      <div className="flex flex-col items-center py-5 w-[95vw] lg:w-[96vw] xl:w-[97vw] rounded-4xl border-4 border-white/10 backdrop-blur-xl shadow-[0_0_20px_rgba(0,0,0,0.25)]">
        <div className="flex flex-col justify-center items-center">
          <h1 className="p-1 text-4xl lg:text-5xl font-bold inter">
            Our <span className="text-[rgb(40,100,89)]">Features</span>
            <br />
          </h1>
          <h3 className="text-2xl md:text-3xl font-medium">
            What do we <span className="text-[rgb(40,100,89)]">offer?</span>
          </h3>
        </div>

        <div className="w-[95%] my-4 bg-[#587D0A]/40 border-3 border-white/10 backdrop-blur-xl shadow-[0_0_20px_rgba(0,0,0,0.25)] rounded-4xl">
          <div className="flex flex-col items-center">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mx-2 w-full p-5">
              {features.map((feature) => (
                <FeatureCard
                  key={feature.heading}
                  image={feature.image}
                  heading={feature.heading}
                  content={feature.content}
                  onClick={() => {
                    if (feature.isChat) {
                      setShowChat(true);
                    } else {
                      navigate(feature.link);
                    }
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <ChatbotButton forceOpen={showChat} setForceOpen={setShowChat} />
    </div>
  );
};

export default OurFeatures;