import type { LanguageCode } from "./languages";

export type LegalPageContent = {
  title: string;
  description: string;
  sections: Array<{
    heading?: string;
    body: string;
  }>;
};

export const legalContent: Record<
  "privacy" | "terms" | "disclaimer",
  Record<LanguageCode, LegalPageContent>
> = {
  privacy: {
    en: {
      title: "Privacy Policy",
      description: "Privacy policy for Nextool.",
      sections: [
        {
          body: "Nextool provides free online tools and calculators. This page explains how basic information may be handled when you use the website.",
        },
        {
          heading: "Information we collect",
          body: "Nextool does not require account registration to use its public tools. Some technical information, such as browser type, device information and usage data, may be processed through hosting, analytics or security services.",
        },
        {
          heading: "Cookies",
          body: "Nextool may use cookies or similar technologies to improve website functionality, measure usage and support future monetization features.",
        },
        {
          heading: "Third-party services",
          body: "The website may use third-party services for hosting, analytics, performance monitoring or advertising. These services may process data according to their own policies.",
        },
        {
          heading: "Contact",
          body: "For privacy-related questions, contact the site owner through the official communication channels provided on Nextool.",
        },
      ],
    },
    pt: {
      title: "Política de Privacidade",
      description: "Política de privacidade do Nextool.",
      sections: [
        {
          body: "O Nextool oferece ferramentas e calculadoras online gratuitas. Esta página explica como informações básicas podem ser tratadas durante o uso do site.",
        },
        {
          heading: "Informações que coletamos",
          body: "O Nextool não exige cadastro para usar suas ferramentas públicas. Algumas informações técnicas, como tipo de navegador, dispositivo e dados de uso, podem ser processadas por serviços de hospedagem, análise ou segurança.",
        },
        {
          heading: "Cookies",
          body: "O Nextool pode usar cookies ou tecnologias semelhantes para melhorar o funcionamento do site, medir uso e apoiar recursos futuros de monetização.",
        },
        {
          heading: "Serviços de terceiros",
          body: "O site pode usar serviços de terceiros para hospedagem, análise, monitoramento de desempenho ou publicidade. Esses serviços podem processar dados conforme suas próprias políticas.",
        },
        {
          heading: "Contato",
          body: "Para dúvidas sobre privacidade, entre em contato com o responsável pelo site pelos canais oficiais informados no Nextool.",
        },
      ],
    },
  },
  terms: {
    en: {
      title: "Terms of Use",
      description: "Terms of use for Nextool.",
      sections: [
        {
          body: "By using Nextool, you agree to use the website responsibly and only for lawful purposes.",
        },
        {
          heading: "Use of tools",
          body: "The tools and calculators on Nextool are provided for general informational and practical purposes. Results should be checked before being used for important decisions.",
        },
        {
          heading: "Availability",
          body: "Nextool may change, remove or update tools and content at any time without prior notice.",
        },
        {
          heading: "Limitation of liability",
          body: "Nextool is provided as-is. The site owner is not responsible for losses or damages resulting from the use of the website or its tools.",
        },
      ],
    },
    pt: {
      title: "Termos de Uso",
      description: "Termos de uso do Nextool.",
      sections: [
        {
          body: "Ao usar o Nextool, você concorda em utilizar o site de forma responsável e apenas para fins legais.",
        },
        {
          heading: "Uso das ferramentas",
          body: "As ferramentas e calculadoras do Nextool são oferecidas para fins gerais, informativos e práticos. Os resultados devem ser conferidos antes de serem usados em decisões importantes.",
        },
        {
          heading: "Disponibilidade",
          body: "O Nextool pode alterar, remover ou atualizar ferramentas e conteúdos a qualquer momento, sem aviso prévio.",
        },
        {
          heading: "Limitação de responsabilidade",
          body: "O Nextool é fornecido como está. O responsável pelo site não se responsabiliza por perdas ou danos resultantes do uso do site ou de suas ferramentas.",
        },
      ],
    },
  },
  disclaimer: {
    en: {
      title: "Disclaimer",
      description: "Disclaimer for Nextool tools and calculators.",
      sections: [
        {
          body: "Nextool tools are provided for convenience and general information. They are not a substitute for professional advice.",
        },
        {
          heading: "Accuracy of results",
          body: "We aim to provide useful and accurate tools, but we do not guarantee that every result will be error-free, complete or suitable for every situation.",
        },
        {
          heading: "Professional advice",
          body: "For financial, legal, medical, tax or other important matters, consult a qualified professional before making decisions.",
        },
        {
          heading: "Use at your own risk",
          body: "By using Nextool, you understand that results are provided without warranty and should be independently verified when needed.",
        },
      ],
    },
    pt: {
      title: "Isenção de Responsabilidade",
      description: "Isenção de responsabilidade para ferramentas e calculadoras do Nextool.",
      sections: [
        {
          body: "As ferramentas do Nextool são fornecidas por conveniência e informação geral. Elas não substituem orientação profissional.",
        },
        {
          heading: "Precisão dos resultados",
          body: "Buscamos oferecer ferramentas úteis e precisas, mas não garantimos que todos os resultados sejam livres de erros, completos ou adequados para todas as situações.",
        },
        {
          heading: "Orientação profissional",
          body: "Para assuntos financeiros, legais, médicos, tributários ou outras decisões importantes, consulte um profissional qualificado antes de agir.",
        },
        {
          heading: "Uso por sua conta e risco",
          body: "Ao usar o Nextool, você entende que os resultados são fornecidos sem garantia e devem ser verificados de forma independente quando necessário.",
        },
      ],
    },
  },
};
