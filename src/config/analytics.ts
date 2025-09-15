// Configuração do Google Analytics/Ads
export const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "AW-17557882845";

// Eventos personalizados que você pode usar
export const GA_EVENTS = {
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

// Função para disparar eventos personalizados no Google Analytics
export const trackGAEvent = (
  eventName: string,
  parameters?: Record<string, unknown>
) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventName, parameters);
  }
};

// Função para rastrear conversões
export const trackConversion = (
  conversionType: string,
  value?: number,
  currency = "BRL"
) => {
  trackGAEvent("conversion", {
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
  trackGAEvent(GA_EVENTS.FORM_SUBMIT, {
    form_name: formName,
    ...formData,
  });
};

// Função para rastrear cliques em botões
export const trackButtonClick = (buttonName: string, location?: string) => {
  trackGAEvent(GA_EVENTS.CLICK, {
    event_category: "engagement",
    event_label: buttonName,
    location: location,
  });
};
