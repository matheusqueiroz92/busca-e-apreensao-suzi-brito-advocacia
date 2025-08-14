"use client";

import { Linkedin, Instagram, MessageCircle } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Início", href: "#inicio" },
    { name: "Problemas", href: "#problemas" },
    { name: "Soluções", href: "#solucoes" },
    { name: "Sobre", href: "#sobre" },
    { name: "FAQ", href: "#faq" },
    { name: "Contato", href: "#contato" },
  ];

  const policyLinks = [
    { name: "Política de Privacidade", href: "/privacidade" },
    { name: "Termos de Uso", href: "/termos" },
    { name: "Cookies", href: "/cookies" },
  ];

  return (
    <>
      <footer className="bg-primary text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Coluna 1 - Logo e Descrição */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                  <span className="text-primary font-bold text-lg">SB</span>
                </div>
                <div>
                  <div className="text-2xl font-bold">SUZY BRITO</div>
                  <div className="text-sm text-white/80">
                    ADVOGADA ESPECIALISTA
                  </div>
                </div>
              </div>
              <p className="text-white/80 mb-6 max-w-md">
                Especialistas em defesa do consumidor e ações de busca e
                apreensão. Protegemos seus direitos e bens com estratégia e
                eficiência.
              </p>

              {/* Redes Sociais */}
              <div className="flex space-x-4">
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-white transition-colors"
                >
                  <Linkedin className="h-6 w-6" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-white transition-colors"
                >
                  <Instagram className="h-6 w-6" />
                </a>
              </div>
            </div>

            {/* Coluna 2 - Links Rápidos */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Links Rápidos</h3>
              <ul className="space-y-2">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-white/80 hover:text-white transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Coluna 3 - Políticas */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Políticas</h3>
              <ul className="space-y-2">
                {policyLinks.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-white/80 hover:text-white transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Linha de Copyright */}
          <div className="border-t border-white/20 mt-8 pt-8 text-center">
            <p className="text-white/80">
              © {currentYear} Suzy Brito Advocacia. Todos os direitos
              reservados.
            </p>
            <p className="text-white/60 text-sm mt-2">
              OAB/BA 66.418 | CNPJ: 12.345.678/0001-90
            </p>
          </div>
        </div>
      </footer>

      {/* Botão Flutuante do WhatsApp */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => window.open("https://wa.me/5571999999999", "_blank")}
          className="bg-green-600 hover:bg-green-700 text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
        >
          <MessageCircle className="h-6 w-6" />
        </button>
      </div>
    </>
  );
}
