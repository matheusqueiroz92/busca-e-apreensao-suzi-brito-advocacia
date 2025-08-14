import { Header } from "@/components/Header";
import Hero from "@/components/Hero";
import { Problemas } from "@/components/Problemas";
import { Solucoes } from "@/components/Solucoes";
import { Sobre } from "@/components/Sobre";
import { FAQ } from "@/components/FAQ";
import { Contato } from "@/components/Contato";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Problemas />
      <Solucoes />
      <Sobre />
      <FAQ />
      <Contato />
      <Footer />
    </main>
  );
}
