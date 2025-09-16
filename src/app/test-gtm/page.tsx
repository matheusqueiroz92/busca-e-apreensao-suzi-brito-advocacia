"use client";

import { trackGTMEvent, trackButtonClick, GTM_EVENTS } from "@/config/gtm";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

export default function TestGTMPage() {
  const [gtmStatus, setGtmStatus] = useState({
    dataLayer: false,
    scriptLoaded: false,
    dataLayerLength: 0,
  });

  useEffect(() => {
    // Verificar status do GTM após o carregamento
    const checkGTMStatus = () => {
      if (typeof window !== "undefined") {
        setGtmStatus({
          dataLayer: !!window.dataLayer,
          scriptLoaded: !!window.dataLayer && window.dataLayer.length > 0,
          dataLayerLength: window.dataLayer?.length || 0,
        });
      }
    };

    // Verificar imediatamente
    checkGTMStatus();

    // Verificar novamente após um delay para garantir que o script carregou
    const timer = setTimeout(checkGTMStatus, 2000);

    return () => clearTimeout(timer);
  }, []);

  const testCTA = () => {
    // Teste do CTA como implementado nos componentes
    trackButtonClick("Teste CTA - Página de Teste", "test_page");
    trackGTMEvent(GTM_EVENTS.CLICK, {
      event_category: "cta",
      event_label: "test_cta",
      button_text: "Teste CTA",
      location: "test_page",
    });

    alert("Evento CTA disparado! Verifique o GTM.");
  };

  const testContact = () => {
    trackGTMEvent(GTM_EVENTS.CONTACT, {
      event_category: "engagement",
      event_label: "test_contact",
      value: 1,
    });
    alert("Evento de contato disparado!");
  };

  const testConversion = () => {
    trackGTMEvent("conversion", {
      conversion_type: "test",
      value: 100,
      currency: "BRL",
    });
    alert("Evento de conversão disparado!");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Teste do Google Tag Manager
        </h1>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Status do GTM</h2>
          <div className="space-y-2">
            <p>
              <strong>GTM ID:</strong> GTM-5BZQ434J
            </p>
            <p>
              <strong>DataLayer:</strong>{" "}
              {gtmStatus.dataLayer ? "✅ Inicializado" : "❌ Não encontrado"}
            </p>
            <p>
              <strong>Script carregado:</strong>{" "}
              {gtmStatus.scriptLoaded ? "✅ Sim" : "❌ Não"}
            </p>
            <p>
              <strong>Eventos no DataLayer:</strong> {gtmStatus.dataLayerLength}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Testes de Eventos CTA</h2>
          <div className="space-y-4">
            <Button
              onClick={() => {
                if (typeof window !== "undefined") {
                  setGtmStatus({
                    dataLayer: !!window.dataLayer,
                    scriptLoaded:
                      !!window.dataLayer && window.dataLayer.length > 0,
                    dataLayerLength: window.dataLayer?.length || 0,
                  });
                }
              }}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              Atualizar Status do GTM
            </Button>
            <Button
              onClick={testCTA}
              className="w-full bg-green-600 hover:bg-green-700"
            >
              Testar CTA (Como nos botões do site)
            </Button>
            <Button onClick={testContact} className="w-full">
              Testar Evento de Contato
            </Button>
            <Button
              onClick={testConversion}
              className="w-full bg-purple-600 hover:bg-purple-700"
            >
              Testar Conversão
            </Button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">
            Como verificar se está funcionando:
          </h2>
          <ol className="list-decimal list-inside space-y-2 text-sm">
            <li>Abra o Console do navegador (F12)</li>
            <li>
              Digite:{" "}
              <code className="bg-gray-100 px-2 py-1 rounded">
                window.dataLayer
              </code>
            </li>
            <li>Deve retornar um array com dados do GTM</li>
            <li>Instale a extensão "Tag Assistant Legacy" no Chrome</li>
            <li>Recarregue a página e verifique se o GTM aparece como ativo</li>
            <li>
              Clique nos botões de teste e verifique se os eventos aparecem no
              console
            </li>
            <li>
              <strong>No GTM:</strong> Vá em "Preview" para ver os eventos em
              tempo real
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
}
