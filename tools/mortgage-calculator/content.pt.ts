export const mortgageCalculatorContent = {
  slug: {
    pt: "calculadora-financiamento-imobiliario",
  },

  title: {
    pt: "Calculadora de Financiamento Imobiliário",
  },

  description: {
    pt: "Calcule parcelas, juros totais e custo total de um financiamento imobiliário.",
  },

  seo: {
    title: {
      pt: "Calculadora de Financiamento Imobiliário - Parcelas e Juros",
    },

    description: {
      pt: "Calcule parcelas mensais, valor financiado, juros totais e custo total de um financiamento imobiliário com esta calculadora gratuita.",
    },
  },

  article: [
    {
      heading: {
        pt: "O Que É uma Calculadora de Financiamento Imobiliário?",
      },

      body: {
        pt: "Uma calculadora de financiamento imobiliário estima parcelas mensais com base no valor do imóvel, entrada, taxa de juros e prazo do financiamento.",
      },
    },

    {
      heading: {
        pt: "Como Funcionam as Parcelas",
      },

      body: {
        pt: "As parcelas normalmente incluem amortização do saldo devedor e juros cobrados pela instituição financeira.",
      },
    },

    {
      heading: {
        pt: "Por Que a Entrada É Importante",
      },

      body: {
        pt: "Uma entrada maior reduz o valor financiado, diminui as parcelas e reduz o total de juros pagos ao longo do contrato.",
      },
    },

    {
      heading: {
        pt: "O Impacto das Taxas de Juros",
      },

      body: {
        pt: "Pequenas diferenças nas taxas de juros podem representar milhares de reais de diferença no custo total do financiamento.",
      },
    },

    {
      heading: {
        pt: "Exemplo Prático",
      },

      body: {
        pt: "Um imóvel de R$ 300.000 com entrada de R$ 60.000 gera um financiamento de R$ 240.000. Dependendo da taxa e do prazo, o custo total pode variar significativamente.",
      },
    },

    {
      heading: {
        pt: "Escolhendo o Prazo Ideal",
      },

      body: {
        pt: "Prazos menores geralmente resultam em parcelas maiores, porém reduzem o total de juros pagos ao banco.",
      },
    },

    {
      heading: {
        pt: "Erros Comuns em Financiamentos",
      },

      body: {
        pt: "Muitos compradores focam apenas na parcela mensal e ignoram o custo total do financiamento ao longo dos anos.",
      },
    },

    {
      heading: {
        pt: "Como Utilizar Esta Ferramenta",
      },

      body: {
        pt: "Informe o valor do imóvel, entrada, taxa de juros anual e prazo para estimar parcelas, juros e valor total pago.",
      },
    },
  ],

  faq: [
    {
      question: {
        pt: "Esta calculadora é precisa?",
      },

      answer: {
        pt: "Ela utiliza a fórmula padrão de amortização e fornece boas estimativas para financiamentos de taxa fixa.",
      },
    },

    {
      question: {
        pt: "Os impostos estão incluídos?",
      },

      answer: {
        pt: "Não. A calculadora considera apenas principal e juros.",
      },
    },

    {
      question: {
        pt: "Qual taxa de juros devo usar?",
      },

      answer: {
        pt: "Utilize a taxa anual oferecida pela instituição financeira.",
      },
    },

    {
      question: {
        pt: "Quanto devo dar de entrada?",
      },

      answer: {
        pt: "Muitos compradores procuram dar pelo menos 20% de entrada, mas isso varia conforme o banco e o perfil do cliente.",
      },
    },

    {
      question: {
        pt: "Uma entrada maior ajuda?",
      },

      answer: {
        pt: "Sim. Ela reduz o valor financiado e o total de juros pagos.",
      },
    },

    {
      question: {
        pt: "Prazo menor é melhor?",
      },

      answer: {
        pt: "Geralmente reduz o custo total, mas aumenta o valor das parcelas.",
      },
    },

    {
      question: {
        pt: "Posso comparar cenários?",
      },

      answer: {
        pt: "Sim. Altere entrada, prazo ou juros para comparar diferentes possibilidades.",
      },
    },

    {
      question: {
        pt: "O que influencia a aprovação?",
      },

      answer: {
        pt: "Renda, histórico de crédito, dívidas existentes e valor da entrada costumam ser fatores importantes.",
      },
    },

    {
      question: {
        pt: "Quanto imóvel posso financiar?",
      },

      answer: {
        pt: "Isso depende da renda, comprometimento financeiro e critérios da instituição financeira.",
      },
    },

    {
      question: {
        pt: "Esta calculadora é gratuita?",
      },

      answer: {
        pt: "Sim. Você pode utilizá-la gratuitamente diretamente no navegador.",
      },
    },
  ],

  formula: {
    expression: {
      pt: "M = P × [r(1+r)^n] / [(1+r)^n − 1]",
    },

    explanation: {
      pt: "<strong>M</strong> = Parcela Mensal<br/><strong>P</strong> = Valor Financiado<br/><strong>r</strong> = Taxa de Juros Mensal<br/><strong>n</strong> = Número Total de Parcelas",
    },
  },


  advancedSeo: {
    examples: [
      {
        title: { pt: "cenário de entrada no financiamento" },
        description: { pt: "Compare como uma entrada maior reduz o saldo financiado e pode diminuir a parcela mensal." },
        calculation: { pt: "Imóvel de R$ 300.000 - R$ 60.000 de entrada = R$ 240.000 financiados" },
      },
      {
        title: { pt: "estimativa de financiamento em 30 anos" },
        description: { pt: "Use um prazo longo para estimar menor pressão mensal e entender o custo em juros totais." },
        calculation: { pt: "R$ 240.000 a 6,5% por 30 anos ≈ R$ 1.516,96/mês" },
      },
      {
        title: { pt: "comparação 15 anos vs 30 anos" },
        description: { pt: "Um prazo menor pode reduzir juros totais, mas exige parcela mensal maior." },
        calculation: { pt: "Mesmo saldo, prazo menor = parcela maior e quitação mais rápida" },
      },
    ],
    useCases: [
      { title: { pt: "Checar quanto imóvel cabe no orçamento" }, description: { pt: "Estime se a faixa de parcela parece realista antes de buscar imóveis mais caros." } },
      { title: { pt: "Planejamento de entrada" }, description: { pt: "Teste como uma entrada adicional altera o saldo financiado e a parcela estimada." } },
      { title: { pt: "Sensibilidade à taxa" }, description: { pt: "Compare o mesmo preço de imóvel com diferentes hipóteses de juros." } },
    ],
    comparisonTable: {
      title: { pt: "Comparação de prazo de financiamento" },
      headers: [{ pt: "Escolha" }, { pt: "Parcela mensal" }, { pt: "Efeito de longo prazo" }],
      rows: [
        [{ pt: "Entrada maior" }, { pt: "Geralmente menor" }, { pt: "Menos dívida e menos juros" }],
        [{ pt: "Prazo maior" }, { pt: "Geralmente menor" }, { pt: "Mais juros totais" }],
        [{ pt: "Prazo menor" }, { pt: "Geralmente maior" }, { pt: "Menos juros totais" }],
      ],
    },
    commonMistakes: [
      { title: { pt: "Ignorar impostos e seguros" }, description: { pt: "A estimativa da parcela pode não incluir impostos, seguro, condomínio, taxas ou custos de fechamento." } },
      { title: { pt: "Comprar no limite da aprovação" }, description: { pt: "O valor aprovado pelo banco não é necessariamente uma parcela confortável." } },
      { title: { pt: "Comparar só preço do imóvel" }, description: { pt: "Taxa, entrada e prazo podem mudar a pressão mensal mais do que o preço sugere." } },
    ],
    relatedQueries: [
      { pt: "calculadora de parcela de financiamento imobiliário" },
      { pt: "calculadora de financiamento com entrada" },
      { pt: "simulador de financiamento em 30 anos" },
      { pt: "financiamento 15 anos vs 30 anos" },
      { pt: "calculadora de juros de financiamento imobiliário" },
    ],
    schemaType: "Calculator",
  },

  ui: {
    heading: {
      pt: "Calculadora de Financiamento Imobiliário",
    },

    helper: {
      pt: "Estime parcelas e custos do seu financiamento.",
    },

    homePrice: {
      pt: "Valor do imóvel",
    },

    downPayment: {
      pt: "Entrada",
    },

    interestRate: {
      pt: "Taxa de juros anual (%)",
    },

    years: {
      pt: "Prazo (anos)",
    },

    loanAmount: {
      pt: "Valor financiado",
    },

    monthlyPayment: {
      pt: "Parcela mensal",
    },

    totalPayment: {
      pt: "Total pago",
    },

    totalInterest: {
      pt: "Total de juros",
    },
  },
};