// Configuração do Google Tag Manager
export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || "GTM-MKV94H7F";

// Eventos personalizados que você pode usar
export const GTM_EVENTS = {
  PAGE_VIEW: "page_view",
  VIEW_CONTENT: "view_content",
  LEAD: "generate_lead",
  CONTACT: "contact",
  SCHEDULE: "schedule",
  SEARCH: "search",
  ADD_TO_CART: "add_to_cart",
  BEGIN_CHECKOUT: "begin_checkout",
  PURCHASE: "purchase",
  FORM_SUBMIT: "form_submit",
  CLICK: "click",
  SCROLL: "scroll",
} as const;

// Função para disparar eventos personalizados no GTM
export const trackGTMEvent = (
  eventName: string,
  parameters?: Record<string, unknown>
) => {
  if (typeof window !== "undefined" && window.dataLayer) {
    const eventData = {
      event: eventName,
      ...parameters,
    };

    console.log("GTM Event disparado:", eventData);
    window.dataLayer.push(eventData);
    console.log("DataLayer após push:", window.dataLayer);
  } else {
    console.warn("GTM não disponível - window.dataLayer não encontrado");
  }
};

// Função para disparar eventos de clique que o GTM pode capturar automaticamente
export const trackGTMClick = (
  element: string,
  location: string,
  additionalData?: Record<string, unknown>
) => {
  if (typeof window !== "undefined" && window.dataLayer) {
    const eventData = {
      event: "gtm.click",
      gtm: {
        element: element,
        elementClasses: "",
        elementId: "",
        elementTarget: "",
        elementText: element,
        elementUrl: "",
        event: "gtm.click",
        eventCategory: "engagement",
        eventLabel: element,
        eventAction: "click",
        eventValue: 1,
        location: location,
        ...additionalData,
      },
    };

    console.log("GTM Click Event disparado:", eventData);
    window.dataLayer.push(eventData);
    console.log("DataLayer após push:", window.dataLayer);
  } else {
    console.warn("GTM não disponível - window.dataLayer não encontrado");
  }
};

// Função para rastrear conversões
export const trackConversion = (
  conversionType: string,
  value?: number,
  currency = "BRL"
) => {
  trackGTMEvent("conversion", {
    conversion_type: conversionType,
    value: value,
    currency: currency,
  });
};

// Função para rastrear formulários
export const trackFormSubmit = (
  formName: string,
  formData?: Record<string, unknown>
) => {
  trackGTMEvent(GTM_EVENTS.FORM_SUBMIT, {
    form_name: formName,
    ...formData,
  });
};

// Função para rastrear cliques em botões
export const trackButtonClick = (buttonName: string, location?: string) => {
  // Usar o evento gtm.click que o GTM captura automaticamente
  trackGTMClick(buttonName, location || "unknown", {
    event_category: "engagement",
    event_label: buttonName,
    button_text: buttonName,
  });
};
