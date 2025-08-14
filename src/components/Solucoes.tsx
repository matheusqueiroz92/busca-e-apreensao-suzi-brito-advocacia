"use client";

import { Button } from "@/components/ui/button";
import {
  FileText,
  Wrench,
  Shield,
  Users,
  Target,
  ArrowRight,
} from "lucide-react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

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
      color: "text-blue-600",
    },
    {
      icon: Wrench,
      title: "Revisão Contratual",
      description:
        "Suspensão da busca e apreensão via reclamação, exceção de contrato não cumprido.",
      color: "text-green-600",
    },
    {
      icon: Shield,
      title: "Defesa Legal",
      description:
        "Petição inicial robusta, acompanhamento, audiências e recursos estratégicos.",
      color: "text-purple-600",
    },
    {
      icon: Users,
      title: "Acompanhamento",
      description:
        "Transparência total com atualização constante e atendimento personalizado.",
      color: "text-orange-600",
    },
  ];

  return (
    <section id="solucoes" ref={solucoesRef} className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            A revisão de contratos bancários pode salvar seu patrimônio
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Oferecemos soluções completas e eficazes para proteger seus direitos
            e bens
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
        <div className="bg-gray-800 text-white rounded-lg p-8 mb-12">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Target className="h-8 w-8" />
              <h3 className="text-2xl font-bold">
                Pronto para recuperar o que é seu?
              </h3>
            </div>
            <p className="text-white/90 text-lg mb-6 max-w-2xl mx-auto">
              Suspensão liminar ou definitiva da busca e apreensão. Manutenção
              do seu bem. Regularização das parcelas ou alternativa de
              negociação. Evitar negativação e cobranças abusivas.
            </p>
            <Button
              onClick={() =>
                window.open("https://wa.me/5571999999999", "_blank")
              }
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white px-8 py-4 text-lg font-semibold"
            >
              Falar com Especialista
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
