import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import LandingNavbar from '../components/LandingNavbar';
import HeroSection from '../components/HeroSection';
import FeaturesSection from '../components/FeaturesSection';
import ExperienceSection from '../components/ExperienceSection';
import Footer from '../components/Footer';

const Homepage = () => {
  const location = useLocation();

  useEffect(() => {
    const hash = location.hash;
    if (hash) {
      setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [location.hash]);

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      <LandingNavbar />
      <HeroSection />
      <FeaturesSection />
      <ExperienceSection />
      <Footer />
    </div>
  );
};

export default Homepage;
