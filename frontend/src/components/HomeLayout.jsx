import { Outlet } from "react-router";
import Header from "./Header";
import Footer from "./Footer";
import ScrollToTopButton from "./ScrollToTopButton";
import ChatbotButton from "./ChatbotButton";

const HomeLayout = () => {
  return (
    <>
      <Header />
      <ScrollToTopButton />
      <ChatbotButton />
      <Outlet />
      <Footer />
    </>
  );
};

export default HomeLayout;
