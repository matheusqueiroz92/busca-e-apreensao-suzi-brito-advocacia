"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MapPin, Phone, Mail, Send } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { trackGAEvent, trackFormSubmit, GA_EVENTS } from "@/config/analytics";
import { WhatsAppIcon } from "./ui/whatsapp-icon";

const contactSchema = z.object({
  nome: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  telefone: z.string().min(10, "Telefone deve ter pelo menos 10 dígitos"),
  mensagem: z.string().min(10, "Mensagem deve ter pelo menos 10 caracteres"),
});

type ContactForm = z.infer<typeof contactSchema>;

export function Contato() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactForm) => {
    setIsSubmitting(true);

    try {
      // Rastrear evento de contato no Google Analytics
      trackFormSubmit("Formulário de Contato", {
        form_type: "contact",
        lead_type: "consultation",
      });

      trackGAEvent(GA_EVENTS.CONTACT, {
        event_category: "engagement",
        event_label: "contact_form",
        value: 1,
      });

      // Enviar dados para a API
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        reset();
        alert("Mensagem enviada com sucesso! Entraremos em contato em breve.");
      } else {
        throw new Error(result.message || "Erro ao enviar mensagem");
      }
    } catch (error) {
      console.error("Erro ao enviar formulário:", error);
      alert(
        "Erro ao enviar mensagem. Tente novamente ou entre em contato por telefone."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      content: "suzibrito.adv@gmail.com",
    },
    {
      icon: Phone,
      title: "Telefone",
      content: "(77) 99111-2894",
    },
    {
      icon: MapPin,
      title: "Endereço",
      content: "Rua 7 de setembro, número 29 - Centro, Itapetinga-BA",
    },
  ];

  return (
    <section id="contato" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Vamos conversar sobre seu caso
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Estamos aqui para ajudar você. Entre em contato conosco para uma
            consulta gratuita.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Lado Esquerdo - Informações do Escritório */}
          <div className="space-y-8">
            <div className="bg-primary text-white rounded-lg p-8 shadow-lg">
              <h3 className="text-2xl font-bold mb-6">Fale Conosco</h3>
              <p className="text-white/90 mb-8">
                Entre em contato conosco para uma consulta gratuita e descubra
                como podemos ajudar você a resolver seu problema de busca e
                apreensão.
              </p>

              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="bg-white/20 p-3 rounded-lg">
                      <info.icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">
                        {info.title}
                      </h4>
                      <p className="text-white/80">{info.content}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-white/20">
                <Button
                  onClick={() =>
                    window.open(
                      "https://wa.me/5577991112894/?text=Ol%C3%A1%2C%20Suzy%20Brito%20Advocacia!%20Visitei%20o%20site%20e%20gostaria%20de%20conversar%20sobre%20busca%20e%20apreens%C3%A3o.%20Poderiam%20me%20ajudar%3F",
                      "_blank"
                    )
                  }
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-6 text-lg font-semibold"
                >
                  <WhatsAppIcon />
                  WhatsApp
                </Button>
              </div>
            </div>
          </div>

          {/* Lado Direito - Formulário */}
          <div className="bg-white rounded-lg p-8 shadow-lg border border-border">
            <h3 className="text-2xl font-bold text-foreground mb-6">
              Envie sua Mensagem
            </h3>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <Label htmlFor="nome">Nome</Label>
                <Input
                  id="nome"
                  {...register("nome")}
                  placeholder="Digite seu nome completo"
                  className="mt-1"
                />
                {errors.nome && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.nome.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  {...register("email")}
                  placeholder="Digite seu e-mail"
                  className="mt-1"
                />
                {errors.email && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="telefone">Telefone</Label>
                <Input
                  id="telefone"
                  {...register("telefone")}
                  placeholder="Digite seu telefone"
                  className="mt-1"
                />
                {errors.telefone && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.telefone.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="mensagem">Mensagem</Label>
                <Textarea
                  id="mensagem"
                  {...register("mensagem")}
                  placeholder="Descreva sua situação ou dúvida"
                  className="mt-1 min-h-[120px]"
                />
                {errors.mensagem && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.mensagem.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary hover:bg-primary/90 text-white py-4 text-lg font-semibold"
              >
                <Send className="h-5 w-5 mr-2" />
                {isSubmitting ? "Enviando..." : "Enviar mensagem"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
