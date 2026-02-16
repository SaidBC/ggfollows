import FaqComponent from "@/components/FaqComponent";
import siteConfig from "@/lib/siteConfig";
import { IconMessageQuestion } from "@tabler/icons-react";

export default function FaqSection() {
  const faqs = siteConfig.faq;
  return (
    <section id="faq">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-10 lg:gap-16">
        {/* Left side - sticky header */}
        <div className="flex flex-col gap-4 lg:sticky lg:top-24 lg:self-start">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/15 border border-secondary/30 text-sm text-secondary font-medium w-fit">
            <IconMessageQuestion size={16} />
            FAQ
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Frequently Asked
            <br />
            Questions
          </h2>
          <p className="text-muted-foreground max-w-sm text-base leading-relaxed">
            Everything you need to know about GGfollows. Can't find what you're
            looking for? Feel free to reach out to us.
          </p>
        </div>

        {/* Right side - FAQ items */}
        <div className="flex flex-col rounded-2xl bg-card border overflow-hidden divide-y divide-border">
          {faqs.map((faq, index) => (
            <FaqComponent
              key={index}
              question={faq.question}
              answer={faq.answer}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
