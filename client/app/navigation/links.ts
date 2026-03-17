import { APP_ROUTES, type AppRoute } from "./routes";

export type NavLink = {
  label: string;
  href: AppRoute;
};

export const PRIMARY_NAV_LINKS: readonly NavLink[] = [
  { label: "Home", href: APP_ROUTES.home },
  { label: "About", href: APP_ROUTES.aboutUs },
  { label: "Services", href: APP_ROUTES.services },
  { label: "Blog", href: APP_ROUTES.blog },
  { label: "Contact", href: APP_ROUTES.contact },
] as const;

export const LEGAL_NAV_LINKS: readonly NavLink[] = [
  { label: "Privacy Policy", href: APP_ROUTES.privacy },
  { label: "Terms of Service", href: APP_ROUTES.terms },
] as const;
