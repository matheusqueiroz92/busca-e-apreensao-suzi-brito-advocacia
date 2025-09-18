// Configuração do Google Tag Manager
export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || "GTM-5BZQ434J";

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
  trackGTMEvent(GTM_EVENTS.CLICK, {
    event_category: "engagement",
    event_label: buttonName,
    location: location,
  });
};
