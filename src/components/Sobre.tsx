"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Award, Clock, Quote } from "lucide-react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Image from "next/image";
import { WhatsAppIcon } from "./ui/whatsapp-icon";

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
      color: "bg-primary/50 text-primary-foreground",
    },
    {
      icon: Clock,
      title: "Atendimento Personalizado",
      color: "bg-primary/50 text-primary-foreground",
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
                {/* Placeholder para imagem de Suzy Brito */}
                <div className="w-full h-[600px] rounded-lg flex items-center justify-center relative overflow-hidden">
                  <Image
                    src="/foto-sobre.jpg"
                    alt="Foto da Dra. Suzy Brito"
                    width={1000}
                    height={800}
                    className="object-cover rounded-lg"
                    style={{
                      objectPosition: "center 20%",
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                    priority
                  />
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
                  className="badge-item flex items-center gap-3 p-2 rounded-lg border border-border bg-secondary/20"
                >
                  <div className={`${badge.color} p-2 rounded-full`}>
                    <badge.icon className="h-4 w-4" />
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
                size="lg"
                className="group relative bg-gradient-to-r from-primary via-primary to-secondary hover:from-secondary hover:to-primary text-primary-foreground px-10 py-6 text-xl font-bold animate-button-glow transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 overflow-hidden border-0"
                onClick={() =>
                  window.open(
                    "https://wa.me/5577991112894?text=Ol%C3%A1%2C%20Suzy%20Brito%20Advocacia!%20Visitei%20o%20site%20e%20gostaria%20de%20conversar%20sobre%20busca%20e%20apreens%C3%A3o.%20Poderiam%20me%20ajudar%3F",
                    "_blank"
                  )
                }
              >
                {/* Background animation */}
                <div className="absolute inset-0 bg-gradient-to-r from-secondary/20 to-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Shine effect */}
                <div className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shine"></div>

                {/* Content */}
                <div className="relative flex items-center space-x-3">
                  <WhatsAppIcon />
                  <span className="font-extrabold">Falar com Especialista</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                </div>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
