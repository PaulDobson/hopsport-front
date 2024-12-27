export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "HopsSport",
  description:
    "HopSport es una plataforma que te entregará herramientas para tus entrenamientos.",
  navItems: [
    {
      label: "Inicio",
      href: "/home",
    },
    {
      label: "Entrenar",
      href: "/training",
    },
    {
      label: "Administracion",
      href: "/admin",
    },
    {
      label: "Blog",
      href: "/blog",
    },
    {
      label: "Proximamente",
      href: "/comingsoon",
    },
  ],
  navMenuItems: [
    {
      label: "Perfil",
      href: "/profile",
    },

    {
      label: "Entrenar",
      href: "/traning",
    },
    {
      label: "Administracion",
      href: "/admin",
    },
    {
      label: "Blog",
      href: "/blog",
    },
    {
      label: "Settings",
      href: "/settings",
    },
    {
      label: "Help & Feedback",
      href: "/help-feedback",
    },
    {
      label: "Logout",
      href: "/logout",
    },
  ],
  links: {
    github: "",
    twitter: "",
    docs: "",
    discord: "",
    sponsor: "",
  },
};
