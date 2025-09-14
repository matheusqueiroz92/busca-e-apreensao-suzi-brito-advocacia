// Configuração do Google Tag Manager
export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || "GTM-K3RX8NMD";

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
    window.dataLayer.push({
      event: eventName,
      ...parameters,
    });
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
