"use client";

import { Mail, MapPin } from "lucide-react";
import { WhatsAppIcon } from "./ui/whatsapp-icon";
import { trackButtonClick } from "@/config/gtm";
import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <>
      <footer className="bg-primary text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col lg:flex-row items-center justify-center gap-12">
            {/* Logo e Nome da Empresa */}
            <div className="flex items-center gap-4">
              <Link href="#inicio">
                <Image
                  src="/logo-rodape.png"
                  alt="Logo Suzy Brito Advocacia"
                  width={300}
                  height={100}
                />
              </Link>
            </div>

            {/* Linha vertical separadora */}
            <div className="hidden lg:block w-px h-24 bg-white/30"></div>

            {/* Informações de Contato */}
            <div className="space-y-4 min-w-0 flex-1 max-w-md">
              {/* WhatsApp/Telefone */}
              <div className="flex items-center gap-3">
                <Link
                  href="https://wa.me/5577991112894?text=Ol%C3%A1%2C%20Suzy%20Brito%20Advocacia!%20Visitei%20o%20site%20e%20gostaria%20de%20conversar%20sobre%20busca%20e%20apreens%C3%A3o.%20Poderiam%20me%20ajudar%3F"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 text-white flex-shrink-0">
                      <WhatsAppIcon />
                    </div>
                    <span className="text-white font-medium whitespace-nowrap">
                      (77) 99111-2894
                    </span>
                  </div>
                </Link>
              </div>

              {/* Email */}
              <div className="flex items-center gap-3">
                <Link href="mailto:suzibrito.adv@gmail.com">
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-white flex-shrink-0" />
                    <span className="text-white font-medium whitespace-nowrap">
                      suzibrito.adv@gmail.com
                    </span>
                  </div>
                </Link>
              </div>

              {/* Endereço */}
              <div className="flex items-start gap-3">
                <Link
                  href="https://maps.app.goo.gl/4V73cQehhCYGo1v39"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-white mt-0.5 flex-shrink-0" />
                    <div className="text-white font-medium">
                      <p className="whitespace-nowrap">
                        Rua 7 de setembro, nº 29, Centro. Itapetinga-BA, CEP:
                        45700-000
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>

          {/* Barra de Copyright */}
          <div className="border-t border-white/20 mt-8 pt-6">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <p className="text-white/80 text-sm">
                {`© Todos os direitos reservados ${new Date().getFullYear()} - Suzy Brito Advocacia - OAB/BA 66.418`}
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Botão Flutuante do WhatsApp */}
      <div className="fixed bottom-6 right-6 z-50">
        <a
          href="https://wa.me/5577991112894?text=Ol%C3%A1%2C%20Suzy%20Brito%20Advocacia!%20Visitei%20o%20site%20e%20gostaria%20de%20conversar%20sobre%20busca%20e%20apreens%C3%A3o.%20Poderiam%20me%20ajudar%3F"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-600 hover:bg-green-700 text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 cursor-pointer"
          aria-label="Falar no WhatsApp"
          onClick={() => {
            // Rastrear clique no botão WhatsApp flutuante
            trackButtonClick("WhatsApp Flutuante - Footer", "footer_floating");
          }}
        >
          <WhatsAppIcon />
        </a>
      </div>
    </>
  );
}
