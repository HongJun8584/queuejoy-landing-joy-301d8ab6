import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  {
    question: "Do I need to install anything?",
    answer: "No. Demo runs immediately in your browser. For production use, we handle the minimal setup for you — just contact our team."
  },
  {
    question: "How do Telegram notifications work?",
    answer: "You connect your Telegram bot in-app and we handle all the setup automatically. No API keys or technical knowledge required."
  },
  {
    question: "How many counters can I have?",
    answer: "Unlimited counters are supported. Our pricing is per site, so you can add as many counters as you need without extra charges."
  }
];

const FAQ = () => {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Frequently asked <span className="text-gradient">questions</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Everything you need to know about Queue Joy
          </p>
        </div>
        
        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto animate-fade-up">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-background rounded-lg px-6 shadow-card hover:shadow-primary transition-all duration-300"
              >
                <AccordionTrigger className="text-left text-lg font-semibold hover:no-underline py-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base leading-relaxed pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
