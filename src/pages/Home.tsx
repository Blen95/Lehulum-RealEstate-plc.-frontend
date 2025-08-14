import Navbar from "../components/Navbar";
import { HeroSection } from "../components/Hero";
import Apartments from "../components/Apartments";
import NewsUpdates from "../components/News&updates";
import OurStory from "../components/Ourstory";
import ContactUs from "../components/ContactUs";
import Footer from "../components/Footer";
import PerksSection from "../components/Perksection";
export default function HomePage() {
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
