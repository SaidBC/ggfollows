"use client";

import {
  IconClick,
  IconForms,
  IconCreditCard,
  IconRocket,
  IconCurrencySolana, // Using this as a generic crypto look or we can find a better one
  IconCurrencyBitcoin,
  IconCoin,
} from "@tabler/icons-react";

export default function ServiceInfoSection() {
  const steps = [
    {
      icon: IconClick,
      title: "Select Package",
      description: "Choose the service and quantity that fits your growth goals.",
    },
    {
      icon: IconForms,
      title: "Enter Details",
      description:
        "Provide your public profile or post link. No password required.",
    },
    {
      icon: IconCreditCard,
      title: "Secure Payment",
      description: "Pay securely via Crypto (USDT TRC20) or other methods.",
    },
    {
      icon: IconRocket,
      title: "Watch Growth",
      description: "Sit back as we deliver real engagement to your account.",
    },
  ];

  return (
    <div className="flex flex-col gap-12 py-8 animate-fade-up delay-200">
      {/* How It Works Grid */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold tracking-tight">How It Works</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {steps.map((step, index) => (
            <div
              key={index}
              className="group relative p-6 rounded-2xl bg-muted/20 border border-border/50 hover:bg-muted/40 transition-colors duration-300"
            >
              <div className="absolute top-6 right-6 text-6xl font-black text-muted-foreground/5 z-0 group-hover:text-muted-foreground/10 transition-colors">
                {index + 1}
              </div>
              <div className="relative z-10 flex flex-col gap-3">
                <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary">
                  <step.icon size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mt-1">
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Payment Methods */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold tracking-tight">Payment Methods</h2>
        <div className="p-6 rounded-2xl bg-muted/20 border border-border/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 shrink-0 rounded-full bg-green-500/10 flex items-center justify-center text-green-500">
              <IconCoin size={24} />
            </div>
            <div className="space-y-1">
              <h3 className="font-semibold text-foreground">
                Tether (USDT) - TRC20
              </h3>
              <p className="text-sm text-muted-foreground max-w-md">
                We currently accept payments via USDT on the TRON network (TRC20).
                Fast, secure, and low fees.
              </p>
            </div>
          </div>
          
          <div className="px-4 py-2 lg:py-1 lg:px-3 lg:text-[10px] rounded-lg bg-background border border-border text-xs font-mono text-muted-foreground break-all transition-all">
            Secure Crypto Payment
          </div>
        </div>
      </div>
    </div>
  );
}
