"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { gsap } from "gsap";

interface Depoimento {
  id: number;
  nome: string;
  foto: string;
  depoimento: string;
  rating: number;
  caso: string;
}

const depoimentos: Depoimento[] = [
  {
    id: 1,
    nome: "Maria Silva",
    foto: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    depoimento:
      "A Dra. Suzy Brito foi fundamental para recuperar meu veículo que estava sendo apreendido injustamente. Sua dedicação e conhecimento técnico fizeram toda a diferença. Recomendo de olhos fechados!",
    rating: 5,
    caso: "Recuperação de Veículo",
  },
  {
    id: 2,
    nome: "João Santos",
    foto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    depoimento:
      "Excelente profissional! Conseguiu resolver meu caso de busca e apreensão de forma rápida e eficiente. A Dra. Suzy é muito atenciosa e sempre disponível para esclarecer dúvidas.",
    rating: 4,
    caso: "Busca e Apreensão",
  },
  {
    id: 3,
    nome: "Ana Costa",
    foto: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    depoimento:
      "Profissional excepcional! Meu caso era complexo e a Dra. Suzy conseguiu uma solução que eu nem imaginava ser possível. Sua experiência em direito do consumidor é impressionante.",
    rating: 5,
    caso: "Direito do Consumidor",
  },
  {
    id: 4,
    nome: "Carlos Oliveira",
    foto: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    depoimento:
      "Recomendo a Dra. Suzy Brito para qualquer pessoa que precise de ajuda jurídica. Ela é muito competente, honesta e sempre prioriza o melhor interesse do cliente. Resultado garantido!",
    rating: 5,
    caso: "Defesa em Ações",
  },
  {
    id: 5,
    nome: "Fernanda Lima",
    foto: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
    depoimento:
      "A Dra. Suzy transformou uma situação que parecia sem solução em uma vitória completa. Sua estratégia jurídica e dedicação são incomparáveis. Sou muito grata pelo excelente trabalho!",
    rating: 4,
    caso: "Recuperação de Bens",
  },
];

export function Depoimentos() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const depoimentosRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (depoimentosRef.current) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.fromTo(
              ".depoimento-card",
              { opacity: 0, y: 50 },
              { opacity: 1, y: 0, duration: 0.8, stagger: 0.2 }
            );
            gsap.fromTo(
              ".depoimentos-title",
              { opacity: 0, y: -30 },
              { opacity: 1, y: 0, duration: 0.8 }
            );
            observer.unobserve(entry.target);
          }
        });
      });

      observer.observe(depoimentosRef.current);
      return () => observer.disconnect();
    }
  }, []);

  useEffect(() => {
    if (isAutoPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex >= depoimentos.length - 3 ? 0 : prevIndex + 1
        );
      }, 5000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isAutoPlaying]);

  const nextDepoimento = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex >= depoimentos.length - 3 ? 0 : prevIndex + 1
    );
    setIsAutoPlaying(false);
  };

  const prevDepoimento = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? depoimentos.length - 3 : prevIndex - 1
    );
    setIsAutoPlaying(false);
  };

  // const goToDepoimento = (pageIndex: number) => {
  //   setCurrentIndex(pageIndex);
  //   setIsAutoPlaying(false);
  // };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <section
      id="depoimentos"
      ref={depoimentosRef}
      className="py-20 bg-gradient-to-br from-muted/30 to-muted/10"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Título da Seção */}
        <div className="text-center mb-16 depoimentos-title">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            O que nossos clientes dizem
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Conheça as experiências de quem confiou em nossos serviços e obteve
            resultados excepcionais
          </p>
        </div>

        {/* Carrossel de Depoimentos */}
        <div className="relative max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            {/* Botão anterior */}
            <Button
              onClick={prevDepoimento}
              variant="outline"
              size="lg"
              className="bg-white hover:bg-muted border-border shadow-md hover:shadow-lg transition-all duration-300 flex-shrink-0"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>

            {/* Container dos depoimentos */}
            <div className="flex-1 overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 33.333}%)` }}
              >
                {depoimentos.map((depoimento) => (
                  <div
                    key={depoimento.id}
                    className="w-1/3 flex-shrink-0 px-4 py-4"
                  >
                    <div className="depoimento-card bg-white rounded-2xl shadow-lg p-6 md:p-8 relative border-amber-100 border-2 overflow-hidden h-full">
                      {/* Elemento decorativo */}
                      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-full -translate-y-10 translate-x-10"></div>

                      {/* Ícone de aspas */}
                      <div className="absolute top-4 left-4 w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                        <Quote className="h-5 w-5 text-white" />
                      </div>

                      <div className="relative z-10">
                        {/* Avaliação com estrelas */}
                        <div className="flex items-center gap-1 mb-4 ml-8">
                          {renderStars(depoimento.rating)}
                          <span className="ml-2 text-xs text-muted-foreground">
                            ({depoimento.rating}/5)
                          </span>
                        </div>

                        {/* Depoimento */}
                        <blockquote className="text-sm md:text-base text-foreground leading-relaxed mb-6 italic">
                          &quot;{depoimento.depoimento}&quot;
                        </blockquote>

                        {/* Informações do cliente */}
                        <div className="flex items-center gap-3">
                          <div>
                            <h4 className="font-semibold text-foreground text-sm">
                              {depoimento.nome}
                            </h4>
                            <p className="text-xs text-primary font-medium">
                              {depoimento.caso}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Botão próximo */}
            <Button
              onClick={nextDepoimento}
              variant="outline"
              size="lg"
              className="bg-white hover:bg-muted border-border shadow-md hover:shadow-lg transition-all duration-300 flex-shrink-0"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <p className="text-lg text-muted-foreground mb-6">
            Quer fazer parte dos nossos casos de sucesso?
          </p>
          <Button
            onClick={() =>
              document
                .getElementById("contato")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            size="lg"
            className="relative overflow-hidden bg-gradient-to-r from-primary via-primary to-secondary text-white px-12 py-6 text-lg font-bold rounded-lg border-0 shadow-md transition-all duration-300 group"
          >
            {/* Efeito de brilho animado */}
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-shine pointer-events-none" />
            {/* Fundo animado sutil */}
            <span className="absolute inset-0 bg-gradient-to-r from-secondary/20 to-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            {/* Conteúdo do botão */}
            <span className="relative z-10 flex items-center justify-center gap-2">
              <svg
                className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
              Falar com Especialista
            </span>
          </Button>
        </div>
      </div>
    </section>
  );
}
