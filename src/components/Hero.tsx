"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Gavel } from "lucide-react";
import { gsap } from "gsap";
import { WhatsAppIcon } from "./ui/whatsapp-icon";
import Image from "next/image";
import { trackButtonClick } from "@/config/gtm";

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const leftContentRef = useRef<HTMLDivElement>(null);
  const rightContentRef = useRef<HTMLDivElement>(null);

  const [showVideo, setShowVideo] = useState(false);

  // URLs de teste para o vídeo
  const videoUrl = [
    "https://pub-d08549843b554d41b1dc2a9609740f32.r2.dev/Design%20sem%20nome%20(1).mp4",
  ];

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
            {/* Title */}
            <h1 className="text-4xl lg:text-6xl font-serif font-extrabold text-primary leading-tight">
              Você foi intimado pelo
              <br /> oficial de justiça?
            </h1>

            {/* Description */}
            <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-2xl">
              Atenção! Seu bem pode ser apreendido a qualquer momento, mas
              calma, nós temos a solução, fazemos a defesa urgente em ações de
              busca e apreensão.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="https://wa.me/5577991112894?text=Ol%C3%A1%2C%20Suzy%20Brito%20Advocacia!%20Visitei%20o%20site%20e%20gostaria%20de%20conversar%20sobre%20busca%20e%20apreens%C3%A3o.%20Poderiam%20me%20ajudar%3F"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center justify-center bg-gradient-to-r from-primary via-primary to-secondary hover:from-secondary hover:to-primary text-primary-foreground px-10 sm:px-12 lg:px-14 py-4 sm:py-5 lg:py-6 text-base sm:text-lg lg:text-xl font-bold animate-button-glow transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 overflow-hidden border-0 rounded-lg cursor-pointer whitespace-nowrap"
                onClick={() => {
                  // Rastrear clique no CTA principal
                  trackButtonClick(
                    "Falar com Especialista - Hero",
                    "hero_section"
                  );
                }}
              >
                {/* Background animation */}
                <div className="absolute inset-0 bg-gradient-to-r from-secondary/20 to-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Shine effect */}
                <div className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shine"></div>

                {/* Content */}
                <div className="relative flex items-center space-x-4 sm:space-x-5">
                  <div className="flex-shrink-0 pl-1">
                    <WhatsAppIcon />
                  </div>
                  <span className="font-extrabold text-sm sm:text-base lg:text-lg">
                    Falar com Especialista
                  </span>
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-2 transition-transform duration-300 flex-shrink-0" />
                </div>
              </a>
              <button
                type="button"
                className="group border-2 border-secondary/50 text-secondary hover:bg-secondary hover:text-secondary-foreground px-6 sm:px-8 py-4 sm:py-5 lg:py-6 text-sm sm:text-base lg:text-lg font-semibold transition-all duration-300 hover:shadow-lg hover:border-secondary transform hover:-translate-y-1 rounded-lg cursor-pointer whitespace-nowrap"
                onClick={() => {
                  // Rastrear clique no botão secundário
                  trackButtonClick(
                    "Ver Problemas Comuns - Hero",
                    "hero_section"
                  );

                  const element = document.querySelector("#problemas");
                  element?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                <span className="flex items-center space-x-2">
                  <span className="text-sm sm:text-base lg:text-lg">
                    Ver Problemas Comuns
                  </span>
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </button>
            </div>
          </div>

          {/* Right Content - Vídeo */}
          <div
            ref={rightContentRef}
            className="lg:col-span-2 relative flex items-center justify-center"
          >
            <div className="relative w-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/20 p-6 shadow-2xl rounded-2xl overflow-hidden min-h-[500px]">
              {!showVideo ? (
                <button
                  className="relative w-full h-full flex items-center justify-center focus:outline-none rounded-xl overflow-hidden"
                  style={{ width: "100%", aspectRatio: "4/5" }}
                  onClick={() => setShowVideo(true)}
                  aria-label="Clique para assistir ao vídeo"
                >
                  <Image
                    src="/capa-video.png"
                    alt="Preview do vídeo"
                    fill
                    className="object-cover rounded-xl"
                    style={{ aspectRatio: "4/5" }}
                  />
                  {/* Ícone de play centralizado */}
                  <span className="absolute inset-0 flex items-center justify-center">
                    <svg
                      width="80"
                      height="80"
                      viewBox="0 0 80 80"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="drop-shadow-lg"
                    >
                      <circle cx="40" cy="40" r="40" fill="rgba(0,0,0,0.6)" />
                      <polygon points="30,25 60,40 30,55" fill="#fff" />
                    </svg>
                  </span>
                  {/* Overlay sutil para melhorar legibilidade */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none rounded-xl"></div>
                </button>
              ) : videoUrl ? (
                <video
                  controls
                  autoPlay
                  poster="foto-suzy-hero.webp"
                  width="100%"
                  height="auto"
                  className="w-full h-full object-cover rounded-xl"
                  style={{ aspectRatio: "4/5" }}
                >
                  <source
                    src="https://pub-d08549843b554d41b1dc2a9609740f32.r2.dev/Design%20sem%20nome%20(1).mp4"
                    type="video/mp4"
                  />
                </video>
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-xl">
                  <p className="text-gray-500">
                    Vídeo temporariamente indisponível
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      {/* <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <button
          className="animate-bounce"
          onClick={() => {
            const element = document.querySelector("#problemas");
            element?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          <ArrowRight className="w-6 h-6 text-primary hover:text-secondary hover:scale-150 transition-all duration-300 rotate-90" />
        </button>
      </div> */}
    </section>
  );
};

export default Hero;
