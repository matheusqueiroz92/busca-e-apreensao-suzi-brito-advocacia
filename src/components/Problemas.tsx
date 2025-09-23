"use client";

import { Scale, FileText, Car, HelpCircle, ArrowRight } from "lucide-react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Image from "next/image";
import { WhatsAppIcon } from "./ui/whatsapp-icon";
import { trackButtonClick } from "@/config/gtm";

export function Problemas() {
  const problemasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (problemasRef.current) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.fromTo(
              ".problema-item",
              { opacity: 0, y: 30 },
              { opacity: 1, y: 0, duration: 0.6, stagger: 0.2 }
            );
            observer.unobserve(entry.target);
          }
        });
      });

      observer.observe(problemasRef.current);
      return () => observer.disconnect();
    }
  }, []);

  const problemas = [
    {
      icon: Scale,
      title: "Notificação judicial recebida",
      description:
        "Sinal de que uma ação de busca e apreensão pode estar em andamento.",
      color: "text-secondary",
    },
    {
      icon: FileText,
      title: "Prazo curto para apresentar defesa",
      description:
        "Após a intimação, o tempo para agir é limitado e muitos perdem o direito de defesa por não saberem como proceder.",
      color: "text-secondary",
    },
    {
      icon: Car,
      title: "Veículo em risco de perda",
      description:
        "Ação pode se concretizar sem aviso prévio, se não houver defesa preventiva.",
      color: "text-secondary",
    },
    {
      icon: HelpCircle,
      title: "Falta de orientação jurídica",
      description:
        "Muitos acabam perdendo seus bens por não saberem como se defender adequadamente.",
      color: "text-secondary",
    },
  ];

  // const consequencias = [
  //   "Juros que consomem o patrimônio",
  //   "Taxas não contestadas",
  //   "Multas e honorários",
  //   "Negativação no CPF/CNPJ",
  // ];

  return (
    <section id="problemas" ref={problemasRef} className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Lado Esquerdo - Problemas */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
                Você está enfrentando alguma destas situações?
              </h2>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {problemas.map((problema, index) => (
                <div
                  key={index}
                  className="problema-item bg-white rounded-lg p-6 shadow-lg border border-border hover:shadow-xl transition-shadow"
                >
                  <div className={`${problema.color} mb-4`}>
                    <problema.icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {problema.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {problema.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Lado Direito - Imagem e Box de Consequências */}
          <div className="space-y-8">
            {/* Imagem de mãos apontando para documento */}
            <div className="relative">
              <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl p-8 flex items-center justify-center">
                {/* Certifique-se de importar o Image do 'next/image' no topo do arquivo: import Image from 'next/image' */}
                {/* Certifique-se de importar corretamente: import Image from 'next/image' */}
                <Image
                  src="/carro-no-guincho.png"
                  alt="Carro sendo guinchado"
                  className="rounded-xl shadow-lg object-cover"
                  width={1000}
                  height={400}
                  style={{ width: "100%", height: "400px", objectFit: "cover" }}
                  priority
                />
              </div>
            </div>

            {/* CTA */}
            <div className="text-center">
              <a
                href="https://wa.me/5577991112894?text=Ol%C3%A1%2C%20Suzy%20Brito%20Advocacia!%20Visitei%20o%20site%20e%20gostaria%20de%20conversar%20sobre%20busca%20e%20apreens%C3%A3o.%20Poderiam%20me%20ajudar%3F"
                target="_blank"
                rel="noopener noreferrer"
                className="botao-whatsapp group relative inline-flex items-center justify-center bg-gradient-to-r from-primary via-primary to-secondary hover:from-secondary hover:to-primary text-primary-foreground px-10 py-6 text-xl font-bold animate-button-glow transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 overflow-hidden border-0 rounded-lg cursor-pointer"
                onClick={() => {
                  // Rastrear clique no CTA da seção Problemas
                  trackButtonClick(
                    "Falar com Especialista - Problemas",
                    "problemas_section"
                  );
                }}
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
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
