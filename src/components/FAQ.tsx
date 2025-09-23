"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { trackButtonClick } from "@/config/gtm";

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
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-primary/5 via-secondary/10 to-primary/8 rounded-2xl p-12 shadow-xl border border-primary/20 backdrop-blur-sm relative overflow-hidden">
            {/* Elementos decorativos de fundo */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 rounded-full -translate-y-16 translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary/10 rounded-full translate-y-12 -translate-x-12"></div>
            <div className="text-center space-y-6 relative z-10">
              <div className="space-y-4">
                <h3 className="text-3xl font-bold text-primary leading-tight">
                  Ainda tem dúvidas?
                </h3>
                <p className="text-lg text-muted-foreground leading-relaxed max-w-lg mx-auto">
                  Entre em contato conosco para esclarecer todas as suas dúvidas
                  sobre busca e apreensão
                </p>
              </div>

              <div className="pt-4">
                <a
                  href="https://wa.me/5577991112894?text=Ol%C3%A1%2C%20Suzy%20Brito%20Advocacia!%20Visitei%20o%20site%20e%20gostaria%20de%20conversar%20sobre%20busca%20e%20apreens%C3%A3o.%20Poderiam%20me%20ajudar%3F"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="botao-whatsapp group relative inline-flex items-center justify-center bg-primary hover:bg-primary/90 text-white px-10 py-4 rounded-xl text-lg font-semibold cursor-pointer transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl shadow-lg"
                  onClick={() => {
                    // Rastrear clique no CTA da seção FAQ
                    trackButtonClick(
                      "Falar com Especialista - FAQ",
                      "faq_section"
                    );
                  }}
                >
                  {/* Efeito de brilho sutil */}
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  <span className="relative z-10">Falar com Especialista</span>

                  {/* Ícone de seta */}
                  <svg
                    className="relative z-10 w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
