import type { LanguageCode } from "./languages";

type Translation = Record<LanguageCode, string>;

export const dictionary = {
  homepageTitle: {
    en: "Fast online tools and calculators",
    it: "Strumenti e calcolatrici online veloci",
    pt: "Ferramentas e calculadoras online rápidas",
    es: "Herramientas y calculadoras online rápidas",
    
  } satisfies Translation,

  homepageDescription: {
    en: "Simple, fast and free utilities for developers, students and everyday tasks.",
    it: "Utility semplici, veloci e gratuite per sviluppatori, studenti e attività quotidiane.",
    pt: "Utilitários simples, rápidos e gratuitos para desenvolvedores, estudantes e tarefas diárias.",
    es: "Utilidades simples, rápidas y gratuitas para desarrolladores, estudiantes y tareas diarias.",
    
  } satisfies Translation,

  searchPlaceholder: {
    en: "Search tools...",
    it: "Cerca strumenti...",
    pt: "Buscar ferramentas...",
    es: "Buscar herramientas...",
    
  } satisfies Translation,

  browseByCategory: {
    en: "Browse by category",
    it: "Sfoglia per categoria",
    pt: "Navegar por categoria",
    es: "Explorar por categoría",
    
  } satisfies Translation,

  calculatorLabel: {
  en: "Calculator",
  it: "Calcolatore",
  pt: "Calculadora",
  es: "Calculadora",
 
} satisfies Translation,

copyResult: {
  en: "Copy result",
  it: "Copia risultato",
  pt: "Copiar resultado",
  es: "Copiar resultado",
  
} satisfies Translation,

relatedTools: {
  en: "Related tools",
  it: "Strumenti correlati",
  pt: "Ferramentas relacionadas",
  es: "Herramientas relacionadas",
 
} satisfies Translation,

faqTitle: {
  en: "Frequently Asked Questions",
  it: "Domande frequenti",
  pt: "Perguntas frequentes",
  es: "Preguntas frecuentes",
  
} satisfies Translation,

homeLabel: {
  en: "Home",
  it: "Home",
  pt: "Início",
  es: "Inicio",
  
} satisfies Translation,

resultLabel: {
  en: "Result",
  it: "Risultato",
  pt: "Resultado",
  es: "Resultado",
  
} satisfies Translation,

allToolsTitle: {
  en: "All tools",
  it: "Tutti gli strumenti",
  pt: "Todas as ferramentas",
  es: "Todas las herramientas",
  
} satisfies Translation,

featuredToolsTitle: {
  en: "Featured tools",
  it: "Strumenti in evidenza",
  pt: "Ferramentas em destaque",
  es: "Herramientas destacadas",
  
} satisfies Translation,

popularCategoriesTitle: {
  en: "Popular categories",
  it: "Categorie popolari",
  pt: "Categorias populares",
  es: "Categorías populares",
  
} satisfies Translation,

viewAllTools: {
  en: "View all tools",
  it: "Vedi tutti gli strumenti",
  pt: "Ver todas as ferramentas",
  es: "Ver todas las herramientas",
  
} satisfies Translation,
};