"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

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
      question: "Vou precisar entrar com processo?",
      answer:
        "Não necessariamente. Primeiro fazemos uma análise da documentação para identificar irregularidades. Em muitos casos, conseguimos resolver extrajudicialmente através de negociações diretas com o credor.",
    },
    {
      question: "Posso sofrer abusos mesmo pagando em dia?",
      answer:
        "Sim, infelizmente isso pode acontecer. Muitos contratos contêm cláusulas abusivas que permitem cobranças indevidas mesmo com pagamentos em dia. Nossa análise identifica essas irregularidades.",
    },
    {
      question: "Quanto tempo leva para obter uma solução?",
      answer:
        "O tempo varia conforme a complexidade do caso. Uma liminar pode ser obtida em 24-48 horas em casos urgentes. Para soluções definitivas, o tempo varia de 3 a 12 meses.",
    },
    {
      question: "É possível negociar o parcelamento do débito?",
      answer:
        "Sim, é possível e muitas vezes recomendado. Podemos negociar diretamente com o credor para estabelecer condições mais favoráveis, como parcelamento com juros menores.",
    },
    {
      question: "A busca e apreensão pode ocorrer sem notificação?",
      answer:
        "Em alguns casos sim, especialmente quando há ordem judicial. Porém, na maioria das situações, o devedor deve ser notificado previamente.",
    },
    {
      question: "Quais documentos devo enviar para análise?",
      answer:
        "Contrato original, notificações recebidas, comprovantes de pagamento, documentos pessoais (RG, CPF), e qualquer correspondência relacionada ao caso.",
    },
  ];

  return (
    <section id="faq" ref={faqRef} className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Esclarecendo suas dúvidas sobre{" "}
            <span className="text-secondary">busca e apreensão</span>
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
            <button
              onClick={() =>
                window.open("https://wa.me/5571999999999", "_blank")
              }
              className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-lg text-lg font-semibold"
            >
              Falar com Especialista
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
