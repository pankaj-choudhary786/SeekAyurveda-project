

import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./lenis.js";
import HomeLayout from "./components/HomeLayout.jsx";
import Home from "./pages/Home.jsx";
import Ingredient_scanner from "./pages/Ingredient_scanner.jsx";
import Health_tracker from "./pages/Health_tracker.jsx";
import VaidyaLocator from "./pages/VaidyaLocator.jsx";
import ContactUs from "./pages/ContactUs.jsx";
import Login from "./pages/Login.jsx";
import AyurPantry from "./pages/AyurPantry.jsx";
import NewsHub from "./pages/NewsHub.jsx";


function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/login" element={<Login />} />
        <Route path="/" element={<HomeLayout />}>
          <Route index element={<Home />} />
          <Route path="contact" element={<ContactUs />} />
          <Route path="ayur_pantry" element={<AyurPantry />} />
          <Route path="product_scan" element={<Ingredient_scanner />} />
          <Route path="vaidya_loc" element={<VaidyaLocator />} />
          <Route path="news_hub" element={<NewsHub />} />
          <Route path="health_track" element={<Health_tracker />} />
          <Route path="questionnaire" element={<Questionnaire />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
