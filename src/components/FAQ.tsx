"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { trackGTMEvent, trackButtonClick, GTM_EVENTS } from "@/config/gtm";

export function FAQ() {
  const faqRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (faqRef.current) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.fromTo(
              ".faq-content",
              { opacity: 0, y: 30 },
              { opacity: 1, y: 0, duration: 0.8 }
            );
            observer.unobserve(entry.target);
          }
        });
      });

      observer.observe(faqRef.current);
      return () => observer.disconnect();
    }
  }, []);

  const faqs = [
    {
      question: "Posso continuar usando meu veículo após a intimação?",
      answer:
        "Sim, até que a busca e apreensão seja cumprida, o veículo permanece com você. No entanto, ele pode ser retirado a qualquer momento, por isso é fundamental agir rápido para evitar a perda.",
    },
    {
      question: "O que acontece se eu não apresentar defesa no prazo?",
      answer:
        "Se você não se manifestar, o processo seguirá em favor do banco, e a apreensão será praticamente inevitável. Além disso, você poderá ser cobrado pelo saldo devedor restante.",
    },
    {
      question: "Existe chance de recuperar meu carro depois de apreendido?",
      answer:
        "Sim, é possível. Dependendo do caso, pode-se buscar a restituição do veículo ou negociar um acordo mesmo após a apreensão. Mas a defesa imediata aumenta muito as chances de sucesso.",
    },
    {
      question: "Quais direitos eu tenho diante da ação de busca e apreensão?",
      answer:
        "Você tem direito de apresentar defesa, contestar cláusulas abusivas, solicitar revisão contratual e tentar suspender a liminar. O banco não pode agir de forma arbitrária sem respeitar o devido processo legal.",
    },
    {
      question: "Preciso pagar toda a dívida de uma vez para resolver?",
      answer:
        "Não necessariamente. Muitas vezes é possível negociar um parcelamento, quitar apenas parte da dívida ou pedir revisão dos valores cobrados. Tudo depende da análise do contrato.",
    },
    {
      question: "A busca e apreensão pode afetar meu nome no mercado?",
      answer:
        "Sim. Além da apreensão, o banco pode negativar seu CPF, restringindo seu crédito. Uma defesa bem feita pode evitar tanto a perda do veículo quanto danos à sua vida financeira.",
    },
  ];

  return (
    <section id="faq" ref={faqRef} className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Esclarecendo suas dúvidas sobre{" "}
            <span className="text-secondary">Busca e Apreensão</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Encontre respostas para as perguntas mais comuns sobre busca e
            apreensão de bens, e como podemos ajudar você a resolver esse
            problema
          </p>
        </div>

        <div className="faq-content max-w-4xl mx-auto mb-16">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left text-lg font-semibold text-foreground hover:text-primary transition-colors">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Box de Dúvidas */}
        <div className="bg-muted/50 rounded-lg p-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Ainda tem dúvidas?
            </h3>
            <p className="text-muted-foreground mb-6">
              Entre em contato conosco para esclarecer todas as suas dúvidas
              sobre busca e apreensão
            </p>
            <a
              href="https://wa.me/5577991112894?text=Ol%C3%A1%2C%20Suzy%20Brito%20Advocacia!%20Visitei%20o%20site%20e%20gostaria%20de%20conversar%20sobre%20busca%20e%20apreens%C3%A3o.%20Poderiam%20me%20ajudar%3F"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-lg text-lg font-semibold cursor-pointer inline-block"
              onClick={() => {
                // Rastrear clique no CTA da seção FAQ
                trackButtonClick("Falar com Especialista - FAQ", "faq_section");
                trackGTMEvent(GTM_EVENTS.CLICK, {
                  event_category: "cta",
                  event_label: "whatsapp_faq",
                  button_text: "Falar com Especialista",
                  location: "faq_section",
                });
              }}
            >
              Falar com Especialista
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
