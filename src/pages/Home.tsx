import Navbar from "../components/Navbar";
import { HeroSection } from "../components/Hero";
import Apartments from "../components/Apartments";
import NewsUpdates from "../components/News&updates";
import OurStory from "../components/Ourstory";
import ContactUs from "../components/ContactUs";
import Footer from "../components/Footer";
import PerksSection from "../components/Perksection";
import { useEffect } from "react";
import { useLocation, useNavigationType } from "react-router-dom";



export default function HomePage() {
  const location = useLocation();

useEffect(() => {
  const state = location.state as { targetId?: string } | null;

  if (state?.targetId) {
    const el = document.getElementById(state.targetId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else {
      // Try again after slight delay if DOM is still loading
      setTimeout(() => {
        const delayedEl = document.getElementById(state.targetId!);
        if (delayedEl) {
          delayedEl.scrollIntoView({ behavior: "smooth" });
        }
      }, 300);
    }
  }
}, [location]);

  return (
    <>
      
      <HeroSection/>
      <OurStory/>
      <Apartments/>
      <NewsUpdates/>
      <ContactUs/>
    
    </>
    

  );
}
