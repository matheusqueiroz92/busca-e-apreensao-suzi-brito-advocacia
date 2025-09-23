"use client";

import { Button } from "@/components/ui/button";
import {
  Menu,
  X,
  Instagram,
  Home,
  AlertTriangle,
  Lightbulb,
  User,
  HelpCircle,
  Mail,
} from "lucide-react";
import { WhatsAppIcon } from "./ui/whatsapp-icon";
import Image from "next/image";
import { useState } from "react";
import logoHeader from "../../public/logo-header.png";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { name: "Início", href: "#inicio", icon: Home },
    { name: "Problemas", href: "#problemas", icon: AlertTriangle },
    { name: "Soluções", href: "#solucoes", icon: Lightbulb },
    { name: "Sobre", href: "#sobre", icon: User },
    { name: "FAQ", href: "#faq", icon: HelpCircle },
    { name: "Contato", href: "#contato", icon: Mail },
  ];

  const socialLinks = [
    {
      name: "Instagram",
      href: "https://instagram.com/suzybritoadv",
      icon: Instagram,
    },
    {
      name: "WhatsApp",
      href: "https://wa.me/5577991112894?text=Ol%C3%A1%2C%20Suzy%20Brito%20Advocacia!%20Visitei%20o%20site%20e%20gostaria%20de%20conversar%20sobre%20a%20revis%C3%A3o%20do%20meu%20contrato%20e%20juros%20abusivos.%20Poderiam%20me%20ajudar%3F",
      icon: WhatsAppIcon,
    },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center space-x-3 group">
            <Image
              src={logoHeader}
              alt="Suzy Brito Advocacia"
              width={220}
              height={100}
              className="transition-transform duration-300 group-hover:scale-105"
            />
          </div>

          {/* Desktop Menu */}
          <nav className="hidden lg:flex items-center">
            {menuItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="group relative text-sm font-medium text-foreground hover:text-primary transition-all duration-300 flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-primary/5"
              >
                <item.icon className="w-4 h-4 transition-all duration-300 group-hover:scale-110" />
                <span className="relative">
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary transition-all duration-300 group-hover:w-full"></span>
                </span>
                <div className="absolute inset-0 bg-primary/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
              </button>
            ))}
          </nav>

          {/* Social Icons */}
          <div className="hidden lg:flex items-center space-x-4">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`group relative p-3 text-muted-foreground hover:text-primary rounded-xl transition-all duration-300 hover:bg-gradient-to-r hover:from-primary/10 hover:to-secondary/10 hover:shadow-lg hover:-translate-y-1 ${
                  social.name === "WhatsApp" ? "botao-whatsapp" : ""
                }`}
                aria-label={social.name}
              >
                <social.icon className="w-5 h-5 transition-all duration-300 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-background border-t border-border">
              {menuItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-2 text-base font-medium text-foreground hover:text-primary transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <div className="flex items-center space-x-4 px-3 py-2">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-foreground hover:text-primary transition-colors ${
                      social.name === "WhatsApp" ? "botao-whatsapp" : ""
                    }`}
                    aria-label={social.name}
                  >
                    <social.icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
