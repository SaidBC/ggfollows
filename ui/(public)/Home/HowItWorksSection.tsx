import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import siteConfig from "@/lib/siteConfig";
import Image from "next/image";

export default function HowItWorksSection() {
  const steps = siteConfig.howItWorksSteps;
  return (
    <section className="mx-4 lg:mx-0">
      <h1 className="text-4xl font-bold">How It Works</h1>
      <div className="flex flex-col mt-8 gap-1">
        <h2 className="text-lg">Just follow the steps</h2>
        <div className="w-fit grid grid-cols-1 gap-8 lg:grid-cols-2  mt-8 mx-auto">
          {steps.map((step, index) => (
            <Card key={index} className="max-w-md">
              <CardHeader>
                <CardTitle>{step.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center gap-4">
                  <Image
                    src={step.image.src}
                    alt={step.image.alt}
                    width={164}
                    height={164}
                    className="w-41 object-contain"
                  />
                  <CardDescription>{step.description}</CardDescription>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
