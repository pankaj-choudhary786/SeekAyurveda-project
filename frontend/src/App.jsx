import { BrowserRouter, Routes, Route } from "react-router-dom";
import NewsHub from "./pages/NewsHub";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<NewsHub />} />
        <Route path="/news" element={<NewsHub />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
 