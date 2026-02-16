import siteConfig from "@/lib/siteConfig";
import Image from "next/image";
import { IconArrowRight } from "@tabler/icons-react";

export default function HowItWorksSection() {
  const steps = siteConfig.howItWorksSteps;
  return (
    <section>
      {/* Section header */}
      <div className="text-center flex flex-col items-center gap-3 mb-12">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/15 border border-secondary/30 text-sm text-secondary font-medium w-fit">
          Simple Process
        </span>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
          How It Works
        </h2>
        <p className="text-muted-foreground max-w-md text-lg">
          Four simple steps to start growing your social media presence
        </p>
      </div>

      {/* Steps */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((step, index) => (
          <div
            key={index}
            className="group relative flex flex-col items-center text-center gap-5 p-6 rounded-2xl bg-card border hover:border-secondary/30 transition-all duration-300"
          >
            {/* Step number */}
            <div className="absolute -top-3 -left-1 sm:left-auto sm:-top-3 sm:-right-1 w-8 h-8 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center text-sm font-bold shadow-lg shadow-secondary/25">
              {index + 1}
            </div>

            {/* Illustration */}
            <div className="w-28 h-28 flex items-center justify-center rounded-2xl bg-muted/50 group-hover:bg-secondary/10 transition-colors duration-300 p-4">
              <Image
                src={step.image.src}
                alt={step.image.alt}
                width={96}
                height={96}
                className="w-full h-full object-contain"
              />
            </div>

            {/* Text */}
            <div className="flex flex-col gap-2">
              <h3 className="text-base font-semibold text-foreground">
                {step.title.replace(/^\d+\.\s*/, "")}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </div>

            {/* Arrow connector (hidden on last item and on small screens) */}
            {index < steps.length - 1 && (
              <div className="hidden lg:flex absolute -right-5 top-1/2 -translate-y-1/2 z-10 text-muted-foreground/30">
                <IconArrowRight size={20} />
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
