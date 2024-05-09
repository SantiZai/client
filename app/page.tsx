import HeroSection from "@/components/sections/HeroSection";
import SearchClubSection from "@/components/sections/SearchClubSection";

export default function Home() {
  return (
    <main className="flex flex-col gap-12">
      <HeroSection />
      <SearchClubSection />
    </main>
  );
}
