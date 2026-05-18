import type { LanguageCode } from "./languages";

type Translation = Partial<Record<LanguageCode, string>>;

export const categories = [
  {
    id: "calculators",

    name: {
      en: "Calculators",
      it: "Calcolatori",
      pt: "Calculadoras",
      es: "Calculadoras",
      fr: "Calculatrices",
      de: "Rechner",
      ro: "Calculatoare",
      pl: "Kalkulatory",
      nl: "Rekenmachines",
      tr: "Hesaplayıcılar",
      ar: "آلات حاسبة",
    } satisfies Translation,

    title: {
      en: "Online Calculators",
      it: "Calcolatori Online",
      pt: "Calculadoras Online",
      es: "Calculadoras Online",
      fr: "Calculatrices en Ligne",
      de: "Online-Rechner",
      ro: "Calculatoare Online",
      pl: "Kalkulatory Online",
      nl: "Online Rekenmachines",
      tr: "Online Hesaplayıcılar",
      ar: "حاسبات عبر الإنترنت",
    } satisfies Translation,

    description: {
      en: "Fast and simple online calculators for everyday calculations.",
      it: "Calcolatori online semplici e veloci per calcoli quotidiani.",
      pt: "Calculadoras online simples e rápidas para cálculos do dia a dia.",
      es: "Calculadoras online simples y rápidas para cálculos cotidianos.",
      fr: "Calculatrices en ligne simples et rapides pour les calculs du quotidien.",
      de: "Schnelle und einfache Online-Rechner für alltägliche Berechnungen.",
      ro: "Calculatoare online simple și rapide pentru calcule de zi cu zi.",
      pl: "Szybkie i proste kalkulatory online do codziennych obliczeń.",
      nl: "Snelle en eenvoudige online rekenmachines voor dagelijkse berekeningen.",
      tr: "Günlük hesaplamalar için hızlı ve basit çevrimiçi hesaplayıcılar.",
      ar: "حاسبات سريعة وبسيطة عبر الإنترنت للحسابات اليومية.",
    } satisfies Translation,

    seo: {
      title: {
        en: "Online Calculators - Fast Free Tools | Nextool",
        it: "Calcolatori Online - Strumenti Gratuiti e Veloci | Nextool",
        pt: "Calculadoras Online - Ferramentas Gratuitas e Rápidas | Nextool",
        es: "Calculadoras Online - Herramientas Gratuitas y Rápidas | Nextool",
        fr: "Calculatrices en Ligne - Outils Gratuits et Rapides | Nextool",
        de: "Online-Rechner - Schnelle Kostenlose Tools | Nextool",
        ro: "Calculatoare Online - Instrumente Gratuite și Rapide | Nextool",
        pl: "Kalkulatory Online - Szybkie Darmowe Narzędzia | Nextool",
        nl: "Online Rekenmachines - Snelle Gratis Tools | Nextool",
        tr: "Online Hesaplayıcılar - Hızlı Ücretsiz Araçlar | Nextool",
        ar: "حاسبات عبر الإنترنت - أدوات مجانية وسريعة | Nextool",
      } satisfies Translation,

      description: {
        en: "Browse free online calculators for percentages, proportions and everyday calculations.",
        it: "Sfoglia calcolatori online gratuiti per percentuali, proporzioni e calcoli quotidiani.",
        pt: "Explore calculadoras online gratuitas para porcentagens, proporções e cálculos do dia a dia.",
        es: "Explora calculadoras online gratuitas para porcentajes, proporciones y cálculos cotidianos.",
        fr: "Parcourez des calculatrices en ligne gratuites pour pourcentages, proportions et calculs quotidiens.",
        de: "Entdecken Sie kostenlose Online-Rechner für Prozente, Proportionen und alltägliche Berechnungen.",
        ro: "Descoperă calculatoare online gratuite pentru procente, proporții și calcule zilnice.",
        pl: "Przeglądaj darmowe kalkulatory online do procentów, proporcji i codziennych obliczeń.",
        nl: "Bekijk gratis online rekenmachines voor percentages, verhoudingen en dagelijkse berekeningen.",
        tr: "Yüzdeler, oranlar ve günlük hesaplamalar için ücretsiz çevrimiçi hesaplayıcıları keşfedin.",
        ar: "تصفح حاسبات مجانية عبر الإنترنت للنسب المئوية والتناسبات والحسابات اليومية.",
      } satisfies Translation,
    },
  },

  {
    id: "developer-tools",

    name: {
      en: "Developer Tools",
      it: "Strumenti per Sviluppatori",
      pt: "Ferramentas para Desenvolvedores",
      es: "Herramientas para Desarrolladores",
      fr: "Outils pour Développeurs",
      de: "Entwicklerwerkzeuge",
      ro: "Instrumente pentru Dezvoltatori",
      pl: "Narzędzia Deweloperskie",
      nl: "Ontwikkelaarstools",
      tr: "Geliştirici Araçları",
      ar: "أدوات المطورين",
    } satisfies Translation,

    title: {
      en: "Developer Tools",
      it: "Strumenti per Sviluppatori",
      pt: "Ferramentas para Desenvolvedores",
      es: "Herramientas para Desarrolladores",
      fr: "Outils pour Développeurs",
      de: "Entwicklerwerkzeuge",
      ro: "Instrumente pentru Dezvoltatori",
      pl: "Narzędzia Deweloperskie",
      nl: "Ontwikkelaarstools",
      tr: "Geliştirici Araçları",
      ar: "أدوات المطورين",
    } satisfies Translation,

    description: {
      en: "Useful online tools for developers and technical workflows.",
      it: "Strumenti online utili per sviluppatori e flussi di lavoro tecnici.",
      pt: "Ferramentas online úteis para desenvolvedores e fluxos técnicos.",
      es: "Herramientas online útiles para desarrolladores y flujos técnicos.",
      fr: "Outils en ligne utiles pour les développeurs et les flux techniques.",
      de: "Nützliche Online-Tools für Entwickler und technische Arbeitsabläufe.",
      ro: "Instrumente online utile pentru dezvoltatori și fluxuri tehnice.",
      pl: "Przydatne narzędzia online dla programistów i pracy technicznej.",
      nl: "Handige online tools voor ontwikkelaars en technische workflows.",
      tr: "Geliştiriciler ve teknik iş akışları için kullanışlı çevrimiçi araçlar.",
      ar: "أدوات مفيدة عبر الإنترنت للمطورين وسير العمل التقني.",
    } satisfies Translation,

    seo: {
      title: {
        en: "Developer Tools Online - Free Fast Utilities | Nextool",
        it: "Strumenti per Sviluppatori Online - Utility Gratuite | Nextool",
        pt: "Ferramentas para Desenvolvedores Online - Utilitários Gratuitos | Nextool",
        es: "Herramientas para Desarrolladores Online - Utilidades Gratis | Nextool",
        fr: "Outils pour Développeurs en Ligne - Utilitaires Gratuits | Nextool",
        de: "Entwicklerwerkzeuge Online - Kostenlose Tools | Nextool",
        ro: "Instrumente pentru Dezvoltatori Online - Utilitare Gratuite | Nextool",
        pl: "Narzędzia Deweloperskie Online - Darmowe Utilsy | Nextool",
        nl: "Ontwikkelaarstools Online - Gratis Hulpmiddelen | Nextool",
        tr: "Online Geliştirici Araçları - Ücretsiz Araçlar | Nextool",
        ar: "أدوات المطورين عبر الإنترنت - أدوات مجانية | Nextool",
      } satisfies Translation,

      description: {
        en: "Browse free online developer tools for formatting, validating and everyday technical tasks.",
        it: "Sfoglia strumenti gratuiti per sviluppatori per formattazione, validazione e attività tecniche quotidiane.",
        pt: "Explore ferramentas gratuitas para desenvolvedores para formatação, validação e tarefas técnicas do dia a dia.",
        es: "Explora herramientas gratuitas para desarrolladores para formato, validación y tareas técnicas cotidianas.",
        fr: "Parcourez des outils gratuits pour développeurs pour le formatage, la validation et les tâches techniques.",
        de: "Entdecken Sie kostenlose Entwicklerwerkzeuge für Formatierung, Validierung und technische Aufgaben.",
        ro: "Descoperă instrumente gratuite pentru dezvoltatori pentru formatare, validare și sarcini tehnice.",
        pl: "Przeglądaj darmowe narzędzia deweloperskie do formatowania, walidacji i zadań technicznych.",
        nl: "Bekijk gratis ontwikkelaarstools voor formatteren, valideren en technische taken.",
        tr: "Biçimlendirme, doğrulama ve teknik işler için ücretsiz geliştirici araçlarını keşfedin.",
        ar: "تصفح أدوات مجانية للمطورين للتنسيق والتحقق والمهام التقنية اليومية.",
      } satisfies Translation,
    },
  },
];