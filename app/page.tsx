import Differential from "@/components/pures/Differential";
import HeroSection from "@/components/sections/HeroSection";
import HireTheServiceSection from "@/components/sections/HireTheServiceSection";
import SearchClubSection from "@/components/sections/SearchClubSection";

const Home = () => {
  return (
    <main>
      <HeroSection />
      <SearchClubSection />
      <Differential />
      <HireTheServiceSection />
    </main>
  );
};

export default Home;
