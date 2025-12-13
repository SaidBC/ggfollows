import AdBanner from "@/components/AdBanner";
import CardsSection from "@/ui/(private)/dashboard/CardsSection";
import TableSection from "@/ui/(private)/dashboard/TableSection";
import clientEnv from "@/utils/clientEnv";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard — GGfollows",
  description:
    "View your points balance, daily rewards, task activity, and account analytics on your GGfollows dashboard.",
  keywords: [
    "ggfollows dashboard",
    "user dashboard",
    "social media growth panel",
    "points dashboard",
  ],
  openGraph: {
    title: "Dashboard — GGfollows",
    description: "Manage your account, points, and tasks all in one place.",
    type: "website",
  },
};

export default function Page() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="w-full py-4 flex justify-center">
          <AdBanner
            className=" @[728px]/main:w-[728px] @[728px]/main:h-[90px] @[468px]/main:w-[468px] @[468px]/main:h-[60px] w-[320px] h-[50px]"
            adConfigs={[
              {
                width: 728,
                height: 90,
                apiKey: clientEnv.NEXT_PUBLIC_ADSTERRA_BANNER_720X90_API_KEY,
              },
              {
                width: 468,
                height: 60,
                apiKey: clientEnv.NEXT_PUBLIC_ADSTERRA_BANNER_468X60_API_KEY,
              },
              {
                width: 320,
                height: 50,
                apiKey: clientEnv.NEXT_PUBLIC_ADSTERRA_BANNER_320X50_API_KEY,
              },
            ]}
          />
        </div>

        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <CardsSection />
          <div className="w-full py-4 justify-center flex">
            <AdBanner
              delay={1000}
              className=" @[728px]/main:w-[728px] @[728px]/main:h-[90px] @[468px]/main:w-[468px] @[468px]/main:h-[60px] w-[320px] h-[50px]"
              adConfigs={[
                {
                  width: 728,
                  height: 90,
                  apiKey: clientEnv.NEXT_PUBLIC_ADSTERRA_BANNER_720X90_API_KEY,
                },
                {
                  width: 468,
                  height: 60,
                  apiKey: clientEnv.NEXT_PUBLIC_ADSTERRA_BANNER_468X60_API_KEY,
                },
                {
                  width: 320,
                  height: 50,
                  apiKey: clientEnv.NEXT_PUBLIC_ADSTERRA_BANNER_320X50_API_KEY,
                },
              ]}
            />
          </div>
          <TableSection />
        </div>
      </div>
    </div>
  );
}
