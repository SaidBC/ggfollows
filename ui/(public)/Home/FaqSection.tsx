import FaqComponent from "@/components/FaqComponent";
import siteConfig from "@/lib/siteConfig";

export default function FaqSection() {
  const faqs = siteConfig.faq;
  return (
    <section className="mx-4 lg:mx-0">
      <h1 className="text-4xl font-bold">Faq</h1>
      <div className="flex flex-col mt-8 gap-1">
        <h2 className="text-lg">Questions? We’ve got answers.</h2>
        {faqs.map((faq, index) => (
          <FaqComponent
            key={index}
            question={faq.question}
            answer={faq.answer}
          />
        ))}
      </div>
    </section>
  );
}
