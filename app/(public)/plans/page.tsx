import PlansCards from "@/ui/(public)/plans/PlansCards";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing & Plans — GGfollows",
  description:
    "Explore GGfollows pricing plans and choose the right option for boosting your social media growth.",
  keywords: [
    "ggfollows plans",
    "pricing",
    "growth plans",
    "subscription",
    "social media boost plans",
  ],
  openGraph: {
    title: "Pricing & Plans — GGfollows",
    description:
      "Choose a plan that fits your needs and grow your accounts faster.",
    type: "website",
  },
};

export default function Page() {
  return (
    <div className="relative min-h-screen overflow-hidden py-24 px-4 sm:px-6 lg:px-8">
      {/* Background Animated Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-secondary/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-secondary/5 blur-[150px] rounded-full animate-float" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto text-center space-y-12">
        {/* Header Section */}
        <div className="space-y-6 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 border border-secondary/20 backdrop-blur-md animate-fade-in">
             <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
            </span>
            <span className="text-[10px] font-black uppercase tracking-widest text-secondary/80">Premium Subscriptions</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-foreground leading-[1.1]">
            Elevate Your Social Media <br />
            <span className="gradient-text text-secondary">Presence & Authority</span>
          </h1>
          
          <p className="text-lg text-muted-foreground font-medium leading-relaxed">
            Choose a plan that scales with your ambition. Unlock professional-grade 
            automation and growth tools designed for creators who mean business.
          </p>
        </div>

        {/* Plans Section */}
        <div className="flex justify-center items-center">
          <PlansCards />
        </div>
        
        {/* Trust Badges / Footer Info */}
        <div className="pt-20 grid grid-cols-2 md:grid-cols-3 gap-8 opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
           <div className="flex flex-col items-center gap-2">
             <span className="text-2xl font-black tracking-tighter">Fast Delivery</span>
             <span className="text-[10px] uppercase font-bold tracking-widest">Growth Powered</span>
           </div>
           <div className="flex flex-col items-center gap-2">
             <span className="text-2xl font-black tracking-tighter">Safe & Secure</span>
             <span className="text-[10px] uppercase font-bold tracking-widest">Encrypted Env</span>
           </div>
           <div className="flex flex-col items-center gap-2">
             <span className="text-2xl font-black tracking-tighter">24/7 Support</span>
             <span className="text-[10px] uppercase font-bold tracking-widest">Global Assist</span>
           </div>
        </div>
      </div>
    </div>
  );
}
