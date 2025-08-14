"use client";

import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  MessageCircle,
  ArrowRight,
  Scale,
  CheckCircle,
  Gavel,
} from "lucide-react";
import { gsap } from "gsap";

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const leftContentRef = useRef<HTMLDivElement>(null);
  const rightContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (heroRef.current) {
      const tl = gsap.timeline();

      // Animar elementos do lado esquerdo
      tl.fromTo(
        leftContentRef.current,
        { opacity: 0, x: -50 },
        { opacity: 1, x: 0, duration: 0.8, ease: "power2.out" }
      ).fromTo(
        rightContentRef.current,
        { opacity: 0, x: 50 },
        { opacity: 1, x: 0, duration: 0.8, ease: "power2.out" },
        "-=0.4"
      );

      // Animar elementos flutuantes de martelo
      gsap.to(".hammer-element", {
        y: -30,
        rotation: 360,
        duration: 3,
        ease: "power1.inOut",
        yoyo: true,
        repeat: -1,
        stagger: 0.5,
      });
    }
  }, []);

  return (
    <section
      id="inicio"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-gray-50 to-secondary/10 overflow-hidden"
    >
      {/* Background Elements - Martelos */}
      <div className="absolute inset-0 overflow-hidden hidden lg:block">
        <div className="absolute top-32 left-10 w-16 h-16 hammer-element">
          <Gavel className="w-full h-full text-primary/20" />
        </div>
        <div className="absolute top-40 right-20 w-12 h-12 hammer-element">
          <Gavel className="w-full h-full text-secondary/30" />
        </div>
        <div className="absolute bottom-40 left-20 w-10 h-10 hammer-element">
          <Gavel className="w-full h-full text-primary/25" />
        </div>
        <div className="absolute bottom-20 right-10 w-14 h-14 hammer-element">
          <Gavel className="w-full h-full text-secondary/25" />
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-center">
          {/* Conteúdo da esquerda - 60% */}
          <div ref={leftContentRef} className="lg:col-span-3 space-y-8">
            {/* Badges */}
            <div className="flex flex-nowrap gap-2 lg:gap-3">
              <Badge
                variant="outline"
                className="border-secondary text-primary px-2 py-1 lg:px-4 lg:py-2 text-xs lg:text-sm rounded-lg whitespace-nowrap"
              >
                <Scale className="w-4 h-4 lg:w-6 lg:h-6 mr-1 lg:mr-2" />
                Advocacia Especializada
              </Badge>
              <Badge
                variant="outline"
                className="border-secondary text-primary px-2 py-1 lg:px-4 lg:py-2 text-xs lg:text-sm rounded-lg whitespace-nowrap"
              >
                <CheckCircle className="w-3 h-3 lg:w-4 lg:h-4 mr-1 lg:mr-2" />
                Revisão de Contratos
              </Badge>
            </div>

            {/* Title */}
            <h1 className="text-4xl lg:text-5xl font-serif font-extrabold text-primary leading-tight">
              Está recebendo uma notificação de{" "}
              <span className="text-secondary">busca e apreensão</span> ou teme
              que isso possa acontecer?
            </h1>

            {/* Description */}
            <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-2xl">
              A busca e apreensão é uma medida judicial que pode ser aplicada
              por instituições financeiras para recuperar bens, como veículos ou
              imóveis, em caso de inadimplência. Se você recebeu um aviso ou
              quer se antecipar a esse risco, saiba como podemos te ajudar.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="group relative bg-gradient-to-r from-primary via-primary to-secondary hover:from-secondary hover:to-primary text-primary-foreground px-10 py-6 text-xl font-bold animate-button-glow transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 overflow-hidden border-0"
                onClick={() =>
                  window.open(
                    "https://wa.me/5571999999999?text=Ol%C3%A1%2C%20Suzy%20Brito%20Advocacia!%20Visitei%20o%20site%20e%20gostaria%20de%20conversar%20sobre%20busca%20e%20apreens%C3%A3o.%20Poderiam%20me%20ajudar%3F",
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
                  <MessageCircle className="w-6 h-6 animate-pulse" />
                  <span className="font-extrabold">Falar com Especialista</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                </div>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="group border-2 border-secondary/50 text-secondary hover:bg-secondary hover:text-secondary-foreground px-8 py-6 text-lg font-semibold transition-all duration-300 hover:shadow-lg hover:border-secondary transform hover:-translate-y-1"
                onClick={() => {
                  const element = document.querySelector("#problemas");
                  element?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                <span className="flex items-center space-x-2">
                  <span>Ver Problemas Comuns</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </Button>
            </div>
          </div>

          {/* Right Content - Image - 40% */}
          <div ref={rightContentRef} className="lg:col-span-2 relative">
            <div className="relative bg-gradient-to-br from-primary/10 to-secondary/20 rounded-3xl p-8 lg:p-12 shadow-2xl overflow-hidden">
              {/* Main Image */}
              <div className="relative h-[500px] lg:h-[560px]">
                {/* Placeholder para imagem da advogada */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/10 rounded-xl overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-primary/10 to-secondary/20 rounded-xl flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-32 h-32 bg-gradient-to-br from-primary to-secondary rounded-full mx-auto mb-4 flex items-center justify-center">
                        <Scale className="h-16 w-16 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-foreground mb-2">
                        Dra. Suzy Brito
                      </h3>
                      <p className="text-muted-foreground">
                        Advogada Especialista em Busca e Apreensão
                      </p>
                    </div>
                  </div>
                  {/* Overlay sutil para melhorar legibilidade */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent rounded-xl"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <button
          className="animate-bounce"
          onClick={() => {
            const element = document.querySelector("#problemas");
            element?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          <ArrowRight className="w-6 h-6 text-primary hover:text-secondary hover:scale-150 transition-all duration-300 rotate-90" />
        </button>
      </div>
    </section>
  );
};

export default Hero;
