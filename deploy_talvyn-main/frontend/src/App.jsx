import Home from "./pages/Home";
import JobOpenings from "./components/JobOpenings";
import LearnMoreAboutUs from "./pages/LearnMoreAboutUs";
import ServiceDetails from "./pages/ServiceDetails";
import ScrollToTop from "./components/ScrollToTop";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
function App() {
  useEffect(() => {
        AOS.init({ duration: 1000, once: true }); 
    }, []);
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/jobs" element={<JobOpenings />} />
        <Route path="/learn-more-about-us" element={<LearnMoreAboutUs />} />
        <Route path="/services/:serviceId" element={<ServiceDetails />} />
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </Router>
  )
}

export default App
