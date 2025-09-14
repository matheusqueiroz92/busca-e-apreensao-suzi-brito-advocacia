"use client";

import { Button } from "@/components/ui/button";
import { Award, Clock, User, Quote } from "lucide-react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export function Sobre() {
  const sobreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sobreRef.current) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.fromTo(
              ".sobre-content",
              { opacity: 0, x: -50 },
              { opacity: 1, x: 0, duration: 0.8 }
            );
            gsap.fromTo(
              ".sobre-image",
              { opacity: 0, x: 50 },
              { opacity: 1, x: 0, duration: 0.8, delay: 0.2 }
            );
            gsap.fromTo(
              ".badge-item",
              { opacity: 0, y: 20 },
              { opacity: 1, y: 0, duration: 0.6, stagger: 0.1 }
            );
            observer.unobserve(entry.target);
          }
        });
      });

      observer.observe(sobreRef.current);
      return () => observer.disconnect();
    }
  }, []);

  const badges = [
    {
      icon: Award,
      title: "Especialistas em Direito Bancário",
      color: "bg-blue-100 text-blue-800",
    },
    {
      icon: Clock,
      title: "Atendimento Personalizado",
      color: "bg-green-100 text-green-800",
    },
  ];

  return (
    <section id="sobre" ref={sobreRef} className="py-20 bg-muted/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Lado Esquerdo - Imagem */}
          <div className="sobre-image">
            <div className="relative">
              <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl p-8">
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  {/* Placeholder para imagem da advogada */}
                  <div className="w-full h-96 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-lg flex items-center justify-center relative">
                    <div className="text-center">
                      <div className="w-32 h-32 bg-gradient-to-br from-primary to-secondary rounded-full mx-auto mb-4 flex items-center justify-center">
                        <User className="h-16 w-16 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-foreground mb-2">
                        Dra. Suzy Brito
                      </h3>
                      <p className="text-muted-foreground">
                        Advogada Especialista em Direito do Consumidor
                      </p>
                    </div>
                    {/* Overlay box */}
                    <div className="absolute bottom-4 left-4 bg-primary text-white px-4 py-2 rounded-lg">
                      <p className="text-sm font-medium">
                        Dra. Suzy Brito - Advogada Especialista
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Elementos decorativos */}
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-secondary/30 rounded-full animate-pulse"></div>
              <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-primary/20 rounded-full animate-pulse delay-1000"></div>
            </div>
          </div>

          {/* Lado Direito - Conteúdo */}
          <div className="sobre-content space-y-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Sobre o Escritório
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Nosso objetivo é defender seus direitos com estratégia e
                eficiência, garantindo que seu patrimônio não seja perdido
                injustamente. Especialistas em defesa do consumidor e ações de
                busca e apreensão.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Com anos de experiência no mercado, nossa equipe oferece
                soluções personalizadas e eficazes para cada caso, sempre
                priorizando a proteção dos direitos de nossos clientes.
              </p>
            </div>

            {/* Badges */}
            <div className="grid grid-cols-2 gap-4">
              {badges.map((badge, index) => (
                <div
                  key={index}
                  className="badge-item flex items-center gap-3 p-4 rounded-lg border border-border bg-white"
                >
                  <div className={`${badge.color} p-2 rounded-full`}>
                    <badge.icon className="h-5 w-5" />
                  </div>
                  <span className="text-sm font-medium text-foreground">
                    {badge.title}
                  </span>
                </div>
              ))}
            </div>

            {/* Depoimento */}
            <div className="bg-white border border-border rounded-lg p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center flex-shrink-0">
                  <Quote className="h-6 w-6 text-white" />
                </div>
                <div>
                  <blockquote className="text-foreground italic mb-2">
                    &quot;Acredito que todos merecem justiça, principalmente
                    quando se trata de assegurar a manutenção de um bem. Meu
                    compromisso é usar meu conhecimento e experiência para
                    garantir que meus clientes sejam tratados com justiça.&quot;
                  </blockquote>
                  <cite className="text-sm font-semibold text-primary">
                    Dra. Suzy Brito
                  </cite>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div>
              <Button
                onClick={() =>
                  document
                    .getElementById("contato")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white px-8 py-4 text-lg font-semibold"
              >
                Agende uma Consulta
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
