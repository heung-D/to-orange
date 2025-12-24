import NotificationBar from '../components/NotificationBar';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import AudioInterviewSection from '../components/AudioInterviewSection';
import TrustStats from '../components/TrustStats';
import HowItWorks from '../components/HowItWorks';
import SpecialFeatures from '../components/SpecialFeatures';
import FeaturesScroll from '../components/FeaturesScroll';
import Reviews from '../components/Reviews';
import FAQ from '../components/FAQ';
import CTASection from '../components/CTASection';
import Footer from '../components/Footer';

export default function MainPage() {
  return (
    <div className="bg-white">
      <NotificationBar />
      <Navbar />
      <HeroSection />
      <AudioInterviewSection />
      <TrustStats />
      <HowItWorks />
      <SpecialFeatures />
      <FeaturesScroll />
      <Reviews />
      <FAQ />
      <CTASection />
      <Footer />
    </div>
  );
}
