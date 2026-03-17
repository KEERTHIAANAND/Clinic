export const APP_ROUTES = {
  home: "/",
  aboutUs: "/about-us",
  services: "/services",
  blog: "/blog",
  contact: "/contact",
  privacy: "/privacy",
  terms: "/terms",
} as const;

export type AppRoute = (typeof APP_ROUTES)[keyof typeof APP_ROUTES];
