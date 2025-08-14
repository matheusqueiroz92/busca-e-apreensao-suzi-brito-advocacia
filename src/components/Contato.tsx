"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MapPin, Phone, Mail, MessageCircle, Send } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

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
    // Simular envio do formulário
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Dados do formulário:", data);
    reset();
    setIsSubmitting(false);
    alert("Mensagem enviada com sucesso! Entraremos em contato em breve.");
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      content: "contato@suzibrito.adv.br",
    },
    {
      icon: Phone,
      title: "Telefone",
      content: "(71) 99999-9999",
    },
    {
      icon: MapPin,
      title: "Endereço",
      content: "Rua das Flores, 123 - Centro, Salvador/BA",
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
                    window.open("https://wa.me/5571999999999", "_blank")
                  }
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-4 text-lg font-semibold"
                >
                  <MessageCircle className="h-5 w-5 mr-2" />
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
