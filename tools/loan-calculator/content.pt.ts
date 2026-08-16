export const loanCalculatorContent = {
  slug: {
    pt: "calculadora-emprestimo",
  },

  title: {
    pt: "Calculadora de Empréstimo",
  },

  description: {
    pt: "Calcule parcelas mensais, valor total pago e juros de um empréstimo.",
  },

  seo: {
    title: {
      pt: "Calculadora de Empréstimo - Parcelas, Juros e Financiamento",
    },

    description: {
      pt: "Calcule parcelas mensais, juros totais e custo total de empréstimos e financiamentos com esta calculadora gratuita.",
    },
  },

  article: [
    {
      heading: {
        pt: "O Que É uma Calculadora de Empréstimo?",
      },

      body: {
        pt: "Uma calculadora de empréstimo estima parcelas mensais, valor total pago e juros totais com base no valor financiado, taxa de juros e prazo de pagamento.",
      },
    },

    {
      heading: {
        pt: "Como Funcionam as Parcelas",
      },

      body: {
        pt: "A maioria dos empréstimos é paga por meio de parcelas mensais fixas compostas por amortização do principal e juros.",
      },
    },

    {
      heading: {
        pt: "Principal e Juros",
      },

      body: {
        pt: "O principal é o valor emprestado. Os juros representam o custo cobrado pela instituição financeira pelo empréstimo.",
      },
    },

    {
      heading: {
        pt: "Como os Juros Afetam o Empréstimo",
      },

      body: {
        pt: "Taxas de juros mais altas aumentam tanto o valor das parcelas quanto o custo total do financiamento.",
      },
    },

    {
      heading: {
        pt: "Exemplo Prático",
      },

      body: {
        pt: "Um empréstimo de R$ 20.000 com juros de 6% ao ano em 60 meses terá uma parcela diferente do mesmo empréstimo pago em 36 meses.",
      },
    },

    {
      heading: {
        pt: "Empréstimos de Curto e Longo Prazo",
      },

      body: {
        pt: "Prazos menores normalmente geram parcelas maiores, porém reduzem o total de juros pagos.",
      },
    },

    {
      heading: {
        pt: "Tipos Comuns de Empréstimos",
      },

      body: {
        pt: "Esta calculadora pode ser utilizada para empréstimos pessoais, financiamentos de veículos, crédito estudantil e diversas modalidades de crédito.",
      },
    },

    {
      heading: {
        pt: "Como Utilizar Esta Ferramenta",
      },

      body: {
        pt: "Informe o valor do empréstimo, a taxa de juros anual e o prazo de pagamento para estimar parcelas e custos totais.",
      },
    },
  ],

  faq: [
    {
      question: {
        pt: "Esta calculadora é precisa?",
      },

      answer: {
        pt: "Ela utiliza a fórmula padrão de amortização e fornece estimativas confiáveis para a maioria dos empréstimos com taxa fixa.",
      },
    },

    {
      question: {
        pt: "Posso usar para financiamento imobiliário?",
      },

      answer: {
        pt: "Sim. Ela pode ser utilizada para financiamentos imobiliários e outros empréstimos de taxa fixa.",
      },
    },

    {
      question: {
        pt: "Qual taxa de juros devo informar?",
      },

      answer: {
        pt: "Utilize a taxa anual fornecida pela instituição financeira.",
      },
    },

    {
      question: {
        pt: "Por que o valor total pago é maior que o empréstimo?",
      },

      answer: {
        pt: "Porque o valor total inclui tanto o principal quanto os juros acumulados.",
      },
    },

    {
      question: {
        pt: "Posso comparar diferentes prazos?",
      },

      answer: {
        pt: "Sim. Alterar o prazo permite comparar parcelas e custos totais.",
      },
    },

    {
      question: {
        pt: "O que é amortização?",
      },

      answer: {
        pt: "É o processo de quitar gradualmente uma dívida por meio de pagamentos periódicos.",
      },
    },

    {
      question: {
        pt: "Prazos menores economizam dinheiro?",
      },

      answer: {
        pt: "Em muitos casos sim, pois reduzem o total de juros pagos.",
      },
    },

    {
      question: {
        pt: "Posso usar para financiamento de veículos?",
      },

      answer: {
        pt: "Sim. Funciona para financiamentos de veículos e empréstimos pessoais.",
      },
    },

    {
      question: {
        pt: "Posso usar para crédito empresarial?",
      },

      answer: {
        pt: "Sim. Ela pode fornecer estimativas para diversos cenários de financiamento empresarial.",
      },
    },

    {
      question: {
        pt: "Esta calculadora é gratuita?",
      },

      answer: {
        pt: "Sim. Você pode utilizar esta calculadora gratuitamente diretamente no navegador.",
      },
    },
  ],

  formula: {
    expression: {
      pt: "M = P × [r(1+r)^n] / [(1+r)^n − 1]",
    },

    explanation: {
      pt: "<strong>M</strong> = Parcela Mensal<br/><strong>P</strong> = Valor do Empréstimo<br/><strong>r</strong> = Taxa de Juros Mensal<br/><strong>n</strong> = Número Total de Parcelas",
    },
  },


  advancedSeo: {
    examples: [
      {
        title: { pt: "cenário de parcela de empréstimo pessoal" },
        description: { pt: "Estime como a parcela muda quando o prazo passa de curto para longo." },
        calculation: { pt: "R$ 20.000 a 6% ao ano por 60 meses ≈ R$ 386,66/mês" },
      },
      {
        title: { pt: "comparação de financiamento de veículo" },
        description: { pt: "Compare uma parcela menor contra os juros extras ao alongar o prazo de um financiamento." },
        calculation: { pt: "R$ 25.000 a 7% em 48 vs 72 meses muda parcela e juros totais" },
      },
      {
        title: { pt: "planejamento de empréstimo para negócio" },
        description: { pt: "Use a estimativa para ver se o fluxo de caixa mensal suporta a dívida." },
        calculation: { pt: "O lucro mensal deve ficar confortavelmente acima da parcela estimada" },
      },
    ],
    useCases: [
      { title: { pt: "Planejamento da parcela" }, description: { pt: "Veja se o empréstimo cabe no orçamento mensal antes de comparar ofertas." } },
      { title: { pt: "Comparação de juros" }, description: { pt: "Compare como os juros totais mudam quando prazo ou taxa mudam." } },
      { title: { pt: "Triagem de ofertas" }, description: { pt: "Use propostas de bancos como entrada e compare a estimativa total de pagamento." } },
    ],
    comparisonTable: {
      title: { pt: "Comparação de prazo do empréstimo" },
      headers: [{ pt: "Cenário" }, { pt: "Pressão mensal" }, { pt: "Juros totais" }],
      rows: [
        [{ pt: "Prazo menor" }, { pt: "Parcela mais alta" }, { pt: "Geralmente juros totais menores" }],
        [{ pt: "Prazo maior" }, { pt: "Parcela mais baixa" }, { pt: "Geralmente juros totais maiores" }],
        [{ pt: "Taxa menor" }, { pt: "Parcela menor no mesmo prazo" }, { pt: "Custo de crédito menor" }],
      ],
    },
    commonMistakes: [
      { title: { pt: "Comparar só a parcela" }, description: { pt: "Uma parcela menor pode esconder juros totais muito maiores quando o prazo é longo." } },
      { title: { pt: "Ignorar tarifas" }, description: { pt: "Tarifas, seguros e impostos podem mudar o custo efetivo e o valor final." } },
      { title: { pt: "Usar período errado da taxa" }, description: { pt: "A calculadora espera taxa anual, não taxa mensal." } },
    ],
    relatedQueries: [
      { pt: "calculadora de parcela de empréstimo" },
      { pt: "calculadora de empréstimo pessoal" },
      { pt: "calculadora de financiamento de veículo" },
      { pt: "calculadora de juros de empréstimo" },
      { pt: "comparador de prazo de empréstimo" },
    ],
    schemaType: "Calculator",
  },

  ui: {
    heading: {
      pt: "Calculadora de Empréstimo",
    },

    helper: {
      pt: "Informe valor, taxa de juros anual e prazo de pagamento.",
    },

    amount: {
      pt: "Valor do empréstimo",
    },

    interestRate: {
      pt: "Taxa de juros anual (%)",
    },

    months: {
      pt: "Prazo (meses)",
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