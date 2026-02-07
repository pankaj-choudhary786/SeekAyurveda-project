import { Outlet } from "react-router";
import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import ScrollToTopButton from "./ScrollToTopButton";
import ChatbotButton from "./ChatbotButton";

const HomeLayout = () => {
  return (
    <>
      <Header />
      <ScrollToTopButton />
      <ChatbotButton />
      <Sidebar />
      <Outlet />
      <Footer />
    </>
  );
};

export default HomeLayout;
