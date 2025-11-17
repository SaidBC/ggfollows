import HeroSection from "@/ui/(public)/Home/HeroSection";
import HowItWorksSection from "@/ui/(public)/Home/HowItWorksSection";
import FaqSection from "@/ui/(public)/Home/FaqSection";

export default function Page() {
  return (
    <div className="container mx-auto flex flex-col gap-16 py-28 md:py-24">
      <HeroSection />
      <HowItWorksSection />
      <FaqSection />
    </div>
  );
}
