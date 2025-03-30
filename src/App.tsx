import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Home from "./components/Home"; // Your ZegoCloud Home component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home/:roomId" element={<Home />} />
        <Route path="/*" element={<LandingPage />} />
      </Routes>
    </Router>
  );
}

export default App;
