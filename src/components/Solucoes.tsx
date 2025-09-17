"use client";

import { FileText, Wrench, Shield, Users, ArrowRight } from "lucide-react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { trackGTMEvent, trackButtonClick, GTM_EVENTS } from "@/config/gtm";

export function Solucoes() {
  const solucoesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (solucoesRef.current) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.fromTo(
              ".solucao-item",
              { opacity: 0, y: 30 },
              { opacity: 1, y: 0, duration: 0.6, stagger: 0.2 }
            );
            observer.unobserve(entry.target);
          }
        });
      });

      observer.observe(solucoesRef.current);
      return () => observer.disconnect();
    }
  }, []);

  const solucoes = [
    {
      icon: FileText,
      title: "Análise de Contrato",
      description: "Avaliação de contratos, notificações e cláusulas abusivas.",
      color: "text-secondary",
    },
    {
      icon: Wrench,
      title: "Revisão Contratual",
      description:
        "Suspensão da busca e apreensão via reclamação, exceção de contrato não cumprido.",
      color: "text-secondary",
    },
    {
      icon: Shield,
      title: "Defesa Legal",
      description:
        "Petição inicial robusta, acompanhamento, audiências e recursos estratégicos.",
      color: "text-secondary",
    },
    {
      icon: Users,
      title: "Acompanhamento",
      description:
        "Transparência total com atualização constante e atendimento personalizado.",
      color: "text-secondary",
    },
  ];

  return (
    <section id="solucoes" ref={solucoesRef} className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Defesa contra Busca e Apreensão pode evitar a perda do seu veículo
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Oferecemos estratégias jurídicas eficazes para suspender a
            apreensão, contestar cobranças abusivas e negociar diretamente com o
            banco, garantindo mais chances de você manter o seu bem.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {solucoes.map((solucao, index) => (
            <div
              key={index}
              className="solucao-item bg-white rounded-lg p-6 border border-border hover:shadow-lg transition-shadow"
            >
              <div className={`${solucao.color} mb-4`}>
                <solucao.icon className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {solucao.title}
              </h3>
              <p className="text-muted-foreground text-sm">
                {solucao.description}
              </p>
            </div>
          ))}
        </div>

        {/* Box de Resultado Esperado */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-primary to-secondary rounded-3xl p-8 lg:p-12 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative z-10">
              <h3 className="text-2xl lg:text-3xl font-serif font-bold mb-6">
                Ser intimado em uma ação de busca e apreensão não significa que
                tudo está perdido
              </h3>
              <p className="text-md lg:text-lg mb-8 opacity-90 max-w-6xl mx-auto">
                Com a defesa certa, você pode suspender a apreensão, negociar
                melhores condições e até reduzir valores abusivos cobrados pelo
                banco. O primeiro passo é simples: contar com uma equipe
                especializada que vai agir rápido para proteger seu patrimônio e
                garantir que seus direitos sejam respeitados. Não espere a pior
                acontecer. <br /> Agora é o momento de virar o jogo!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://wa.me/5577991112894?text=Ol%C3%A1%2C%20Suzy%20Brito%20Advocacia!%20Visitei%20o%20site%20e%20gostaria%20de%20conversar%20sobre%20busca%20e%20apreens%C3%A3o.%20Poderiam%20me%20ajudar%3F"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white text-primary px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:bg-secondary hover:-translate-y-1 flex items-center justify-center cursor-pointer"
                  onClick={() => {
                    // Rastrear clique no CTA da seção Soluções
                    trackButtonClick(
                      "Quero defender meu veículo agora - Soluções",
                      "solucoes_section"
                    );
                    trackGTMEvent(GTM_EVENTS.CLICK, {
                      event_category: "cta",
                      event_label: "whatsapp_solucoes",
                      button_text: "Quero defender meu veículo agora",
                      location: "solucoes_section",
                    });
                  }}
                >
                  Quero defender meu veículo agora
                  <ArrowRight className="h-5 w-5 ml-2" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
