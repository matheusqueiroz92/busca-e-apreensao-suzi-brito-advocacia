"use client";

import { Button } from "@/components/ui/button";
import { Scale, FileText, Car, HelpCircle, AlertCircle } from "lucide-react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

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
      color: "text-red-600",
    },
    {
      icon: FileText,
      title: "Documentação incompleta",
      description:
        "Contratos com cláusulas abusivas ou falta de notificação prévia.",
      color: "text-blue-600",
    },
    {
      icon: Car,
      title: "Veículo em risco de perda",
      description:
        "Ação pode se concretizar sem aviso prévio, se não houver defesa preventiva.",
      color: "text-orange-600",
    },
    {
      icon: HelpCircle,
      title: "Falta de orientação jurídica",
      description:
        "Muitos acabam perdendo seus bens por não saberem como se defender adequadamente.",
      color: "text-purple-600",
    },
  ];

  const consequencias = [
    "Juros que consomem o patrimônio",
    "Taxas não contestadas",
    "Multas e honorários",
    "Negativação no CPF/CNPJ",
  ];

  return (
    <section id="problemas" ref={problemasRef} className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Lado Esquerdo - Problemas */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Você está enfrentando alguma destas situações?
              </h2>
              <p className="text-lg text-muted-foreground">
                Identificamos e solucionamos os problemas mais comuns
                relacionados a ações de busca e apreensão
              </p>
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
              <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl p-8">
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="w-full h-64 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-full mx-auto mb-4 flex items-center justify-center">
                        <FileText className="h-12 w-12 text-white" />
                      </div>
                      <p className="text-foreground font-medium">
                        Mãos apontando para documento
                      </p>
                      <p className="text-muted-foreground text-sm">
                        Representação visual
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Box de Consequências */}
            <div className="bg-destructive text-white rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <AlertCircle className="h-6 w-6" />
                <h3 className="text-xl font-bold">
                  O problema pode estar crescendo enquanto você adia a solução.
                </h3>
              </div>

              <div className="space-y-2">
                {consequencias.map((consequencia, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <span className="font-medium">{consequencia}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="text-center">
              <Button
                onClick={() =>
                  document
                    .getElementById("solucoes")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white px-8 py-4 text-lg font-semibold"
              >
                Preciso de mais informações
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
