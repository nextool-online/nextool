import Link from "next/link";

import type { LanguageCode } from "../../data/languages";

type MoneySeoContentProps = {
  lang: LanguageCode;
  toolId: string;
};

type MoneySeoEntry = {
  intent: string;
  bestFor: string[];
  example: string;
  mistakes: string[];
  nextStep: {
    label: string;
    href: string;
    text: string;
  };
};

const seoCopy: Record<string, Record<LanguageCode, MoneySeoEntry>> = {
  "loan-calculator": {
    en: {
      intent: "Use this loan calculator when you want to compare a monthly payment before taking a personal loan, auto loan, student loan or business loan. It turns loan amount, annual interest and repayment term into a monthly payment, total repayment and total interest estimate.",
      bestFor: ["estimating monthly loan payments", "comparing shorter and longer terms", "checking how much interest a loan may cost", "testing rate changes before speaking with a lender"],
      example: "For example, a borrower can compare a 36-month loan against a 60-month loan and see the trade-off: the shorter term usually raises the monthly payment but can reduce total interest.",
      mistakes: ["looking only at the monthly payment and ignoring total interest", "using a monthly interest rate instead of an annual rate", "forgetting fees, insurance or taxes that may be added by the lender"],
      nextStep: { label: "Compare home financing", href: "/tools/mortgage-calculator", text: "If the loan is for a property, use the mortgage calculator next because down payment and loan term change the decision." },
    },
    pt: {
      intent: "Use esta calculadora de empréstimo para comparar uma parcela mensal antes de contratar crédito pessoal, financiamento de veículo, empréstimo estudantil ou capital para negócio. Ela transforma valor, taxa anual e prazo em parcela, total pago e juros estimados.",
      bestFor: ["estimar parcelas de empréstimo", "comparar prazos curtos e longos", "entender quanto os juros podem custar", "testar mudanças de taxa antes de falar com o banco"],
      example: "Por exemplo: é possível comparar um empréstimo em 36 meses com outro em 60 meses. O prazo menor costuma aumentar a parcela, mas pode reduzir os juros totais.",
      mistakes: ["olhar só a parcela e ignorar os juros totais", "informar taxa mensal quando o campo pede taxa anual", "esquecer tarifas, seguros ou impostos cobrados pelo credor"],
      nextStep: { label: "Comparar financiamento imobiliário", href: "/tools/calculadora-financiamento-imobiliario", text: "Se o crédito for para imóvel, use a calculadora de financiamento porque entrada e prazo mudam bastante a decisão." },
    },
  },
  "mortgage-calculator": {
    en: {
      intent: "Use this mortgage calculator to estimate a home loan payment from home price, down payment, interest rate and loan term. It helps separate the home price from the actual mortgage balance and shows the long-term cost of interest.",
      bestFor: ["estimating a monthly mortgage payment", "testing different down payments", "comparing 15-year and 30-year terms", "understanding total interest on a home loan"],
      example: "A larger down payment reduces the financed amount. Even when the interest rate stays the same, that can lower both the monthly payment and the total interest paid over the mortgage.",
      mistakes: ["forgetting that property tax, insurance and HOA fees may be separate", "comparing homes only by price instead of monthly pressure", "assuming a pre-approval amount is automatically comfortable"],
      nextStep: { label: "Check a simpler loan", href: "/tools/loan-calculator", text: "Use the loan calculator for personal or auto loans where there is no home price and down payment structure." },
    },
    pt: {
      intent: "Use esta calculadora de financiamento imobiliário para estimar a parcela a partir do preço do imóvel, entrada, taxa de juros e prazo. Ela separa o preço do imóvel do saldo financiado e mostra o custo dos juros no longo prazo.",
      bestFor: ["estimar parcela de financiamento", "testar entradas diferentes", "comparar prazos menores e maiores", "entender juros totais de um imóvel"],
      example: "Uma entrada maior reduz o valor financiado. Mesmo com a mesma taxa, isso pode baixar a parcela mensal e também os juros totais ao longo do contrato.",
      mistakes: ["esquecer custos como impostos, seguros, condomínio e taxas", "comparar imóveis só pelo preço e não pela pressão mensal", "assumir que o valor pré-aprovado cabe no orçamento"],
      nextStep: { label: "Calcular um empréstimo comum", href: "/tools/calculadora-emprestimo", text: "Use a calculadora de empréstimo para crédito pessoal, veículo ou cenários sem entrada imobiliária." },
    },
  },
  "compound-interest-calculator": {
    en: {
      intent: "Use this compound interest calculator to see how an initial investment, recurring contributions, annual return and time work together. It is useful for understanding the compounding effect instead of looking only at deposits.",
      bestFor: ["projecting long-term compound growth", "comparing contribution amounts", "testing different annual return assumptions", "seeing how time changes the final balance"],
      example: "Small monthly contributions can become meaningful over long periods because each year adds growth on top of previous growth, not only on the original amount.",
      mistakes: ["treating the projected return as guaranteed", "ignoring taxes, fees and inflation", "underestimating the impact of starting earlier"],
      nextStep: { label: "Compare investment growth", href: "/tools/investment-calculator", text: "Use the investment calculator next if you want a more investment-focused view of contributions and gains." },
    },
    pt: {
      intent: "Use esta calculadora de juros compostos para ver como investimento inicial, aportes, retorno anual e tempo trabalham juntos. Ela ajuda a entender o efeito dos juros sobre juros, e não apenas a soma dos depósitos.",
      bestFor: ["projetar crescimento de longo prazo", "comparar valores de aporte", "testar hipóteses de retorno anual", "ver como o tempo altera o saldo final"],
      example: "Aportes mensais pequenos podem virar um valor relevante em prazos longos porque o crescimento passa a ocorrer sobre ganhos anteriores, não apenas sobre o valor inicial.",
      mistakes: ["tratar o retorno projetado como garantido", "ignorar impostos, taxas e inflação", "subestimar o impacto de começar antes"],
      nextStep: { label: "Comparar crescimento de investimento", href: "/tools/calculadora-investimentos", text: "Use a calculadora de investimentos se quiser uma leitura mais focada em aportes e ganho estimado." },
    },
  },
  "savings-calculator": {
    en: {
      intent: "Use this savings calculator to estimate how a starting deposit, monthly savings and interest rate can build a future balance. It is designed for practical savings goals, emergency funds and medium-term planning.",
      bestFor: ["planning an emergency fund", "setting a savings target", "checking monthly savings habits", "estimating interest earned on deposits"],
      example: "If the target feels too far away, test a higher monthly savings amount or a longer time horizon to see which change is more realistic.",
      mistakes: ["using an investment return for a low-risk savings account", "forgeting that rates can change", "not separating savings goals from risky investments"],
      nextStep: { label: "See compound growth", href: "/tools/compound-interest-calculator", text: "Use compound interest next when the goal is long-term growth with recurring contributions." },
    },
    pt: {
      intent: "Use esta calculadora de poupança para estimar como depósito inicial, economia mensal e taxa podem formar um saldo futuro. Ela serve para reserva de emergência, metas de curto/médio prazo e planejamento simples.",
      bestFor: ["planejar reserva de emergência", "definir meta de economia", "testar hábito mensal de poupar", "estimar juros sobre depósitos"],
      example: "Se a meta parecer distante, teste um aporte mensal maior ou um prazo mais longo para ver qual mudança é mais realista.",
      mistakes: ["usar retorno de investimento arriscado como se fosse poupança segura", "esquecer que taxas podem mudar", "misturar reserva de emergência com investimento de risco"],
      nextStep: { label: "Ver crescimento composto", href: "/tools/calculadora-juros-compostos", text: "Use juros compostos quando a meta envolver crescimento de longo prazo com aportes recorrentes." },
    },
  },
  "investment-calculator": {
    en: {
      intent: "Use this investment calculator to estimate future value, total contributions and potential investment gains from a simple recurring contribution plan. It helps make return assumptions visible before you commit money.",
      bestFor: ["projecting a recurring investment plan", "comparing monthly contributions", "testing return assumptions", "separating contributions from growth"],
      example: "A higher expected return can change the projection dramatically, but the assumption also usually means more uncertainty or risk.",
      mistakes: ["choosing an unrealistic annual return", "ignoring fees and taxes", "comparing investments without considering risk and time"],
      nextStep: { label: "Plan retirement savings", href: "/tools/retirement-calculator", text: "Use the retirement calculator if the investment goal is tied to a target retirement age." },
    },
    pt: {
      intent: "Use esta calculadora de investimentos para estimar valor futuro, aportes totais e ganho potencial com contribuições recorrentes. Ela deixa as hipóteses de retorno visíveis antes de comprometer dinheiro.",
      bestFor: ["projetar plano de investimento recorrente", "comparar aportes mensais", "testar hipóteses de retorno", "separar aportes de crescimento"],
      example: "Um retorno esperado maior pode mudar muito a projeção, mas normalmente também representa mais incerteza ou risco.",
      mistakes: ["escolher retorno anual irrealista", "ignorar taxas e impostos", "comparar investimentos sem considerar risco e prazo"],
      nextStep: { label: "Planejar aposentadoria", href: "/tools/calculadora-aposentadoria", text: "Use aposentadoria se o objetivo estiver ligado a uma idade futura específica." },
    },
  },
  "retirement-calculator": {
    en: {
      intent: "Use this retirement calculator to estimate how current age, target retirement age, current savings, monthly contributions and expected return can shape a projected retirement balance.",
      bestFor: ["estimating years until retirement", "testing monthly contribution levels", "checking if current savings are on track", "making long-term assumptions explicit"],
      example: "Changing the retirement age by only a few years can strongly affect the final balance because it changes both contribution time and compounding time.",
      mistakes: ["ignoring inflation and future living costs", "assuming one return rate for every year", "not reviewing the plan as income changes"],
      nextStep: { label: "Test investment assumptions", href: "/tools/investment-calculator", text: "Use the investment calculator to isolate contribution and return assumptions outside the retirement age model." },
    },
    pt: {
      intent: "Use esta calculadora de aposentadoria para estimar como idade atual, idade-alvo, saldo atual, aportes mensais e retorno esperado podem formar um patrimônio futuro.",
      bestFor: ["estimar anos até aposentadoria", "testar aportes mensais", "ver se a economia atual está no caminho", "deixar hipóteses de longo prazo explícitas"],
      example: "Mudar a idade de aposentadoria em poucos anos pode alterar bastante o saldo final, porque muda tanto o tempo de aporte quanto o tempo de juros compostos.",
      mistakes: ["ignorar inflação e custo de vida futuro", "assumir a mesma taxa de retorno todos os anos", "não revisar o plano conforme a renda muda"],
      nextStep: { label: "Testar hipóteses de investimento", href: "/tools/calculadora-investimentos", text: "Use investimentos para isolar aportes e retorno sem depender da idade de aposentadoria." },
    },
  },
  "roi-calculator": {
    en: {
      intent: "Use this ROI calculator to measure return on investment from cost and net profit. It is useful for campaigns, projects, products, equipment purchases and simple business cases.",
      bestFor: ["calculating marketing ROI", "checking project profitability", "comparing business investments", "separating profit from total return"],
      example: "If a campaign costs $10,000 and generates $3,000 in net profit, the ROI is 30%. That means the profit equals 30% of the original cost.",
      mistakes: ["using revenue instead of net profit", "ignoring time and risk", "comparing ROI across projects with different time horizons"],
      nextStep: { label: "Find break-even point", href: "/tools/break-even-calculator", text: "Use break-even next when you need to know how many units or sales are required before profit begins." },
    },
    pt: {
      intent: "Use esta calculadora de ROI para medir retorno sobre investimento a partir do custo e do lucro líquido. Ela serve para campanhas, projetos, produtos, equipamentos e decisões simples de negócio.",
      bestFor: ["calcular ROI de marketing", "verificar rentabilidade de projeto", "comparar investimentos de negócio", "separar lucro de retorno total"],
      example: "Se uma campanha custa R$ 10.000 e gera R$ 3.000 de lucro líquido, o ROI é 30%. Isso significa que o lucro equivale a 30% do custo inicial.",
      mistakes: ["usar faturamento em vez de lucro líquido", "ignorar tempo e risco", "comparar ROI de projetos com prazos diferentes"],
      nextStep: { label: "Encontrar ponto de equilíbrio", href: "/tools/calculadora-ponto-de-equilibrio", text: "Use ponto de equilíbrio quando precisar saber quantas vendas são necessárias antes do lucro começar." },
    },
  },
  "inflation-calculator": {
    en: {
      intent: "Use this inflation calculator to estimate how prices may change over time and how much future money may be needed to keep similar purchasing power.",
      bestFor: ["estimating future cost of living", "adjusting a price for inflation", "understanding purchasing power", "stress-testing long-term savings goals"],
      example: "If inflation stays positive for many years, the future amount needed can be much higher than the current price, even when the annual rate looks small.",
      mistakes: ["assuming inflation is constant every year", "confusing future price with investment return", "forgetting local inflation can differ from headline inflation"],
      nextStep: { label: "Check savings growth", href: "/tools/savings-calculator", text: "Use savings next to compare whether deposits and interest may keep pace with rising prices." },
    },
    pt: {
      intent: "Use esta calculadora de inflação para estimar como preços podem mudar com o tempo e quanto dinheiro futuro seria necessário para manter poder de compra semelhante.",
      bestFor: ["estimar custo de vida futuro", "corrigir preço pela inflação", "entender poder de compra", "testar metas financeiras de longo prazo"],
      example: "Se a inflação permanece positiva por muitos anos, o valor futuro necessário pode ficar muito maior que o preço atual, mesmo quando a taxa anual parece pequena.",
      mistakes: ["assumir inflação constante todos os anos", "confundir preço futuro com retorno de investimento", "esquecer que a inflação pessoal pode diferir do índice oficial"],
      nextStep: { label: "Checar crescimento da poupança", href: "/tools/calculadora-poupanca", text: "Use poupança para comparar se depósitos e juros acompanham a alta dos preços." },
    },
  },
  "break-even-calculator": {
    en: {
      intent: "Use this break-even calculator to estimate how many units must be sold before a product, service or campaign covers fixed costs. It connects price, variable cost and fixed cost into one practical target.",
      bestFor: ["pricing a product", "planning a small business launch", "checking campaign economics", "estimating required sales volume"],
      example: "If fixed costs are high or unit margin is low, the break-even volume can rise quickly. That is why both price and cost per unit matter.",
      mistakes: ["forgetting variable costs", "using gross revenue as if it were profit", "ignoring refunds, payment fees or shipping costs"],
      nextStep: { label: "Measure ROI after profit", href: "/tools/roi-calculator", text: "Use ROI next when you already know net profit and want to compare return against cost." },
    },
    pt: {
      intent: "Use esta calculadora de ponto de equilíbrio para estimar quantas unidades precisam ser vendidas antes de um produto, serviço ou campanha cobrir custos fixos. Ela conecta preço, custo variável e custo fixo em uma meta prática.",
      bestFor: ["precificar produto", "planejar lançamento de pequeno negócio", "checar economia de campanha", "estimar volume mínimo de vendas"],
      example: "Se os custos fixos são altos ou a margem por unidade é baixa, o ponto de equilíbrio sobe rapidamente. Por isso preço e custo unitário importam juntos.",
      mistakes: ["esquecer custos variáveis", "usar faturamento como se fosse lucro", "ignorar reembolsos, taxas de pagamento ou frete"],
      nextStep: { label: "Medir ROI depois do lucro", href: "/tools/calculadora-roi", text: "Use ROI quando já souber o lucro líquido e quiser comparar retorno contra custo." },
    },
  },
  "percentage-calculator": {
    en: {
      intent: "Use this percentage calculator for quick money math: discounts, taxes, tips, interest, margin checks and everyday comparisons. It answers percent-of-value questions instantly.",
      bestFor: ["calculating discounts", "checking tax or tip amounts", "finding a percent of a price", "doing quick finance and shopping math"],
      example: "If you need 20% of 150, the result is 30. In money decisions, that can represent a discount, tax amount, fee or margin.",
      mistakes: ["mixing percent points with percent change", "forgetting to apply the result back to the original price", "rounding too early in multi-step calculations"],
      nextStep: { label: "Calculate ROI", href: "/tools/roi-calculator", text: "Use ROI next when the percentage is tied to investment cost and profit." },
    },
    pt: {
      intent: "Use esta calculadora de porcentagem para contas rápidas de dinheiro: descontos, impostos, gorjetas, juros, margens e comparações do dia a dia. Ela responde imediatamente quanto é uma porcentagem de um valor.",
      bestFor: ["calcular descontos", "checar impostos ou gorjetas", "encontrar porcentagem de um preço", "fazer contas financeiras rápidas"],
      example: "Se você precisa de 20% de 150, o resultado é 30. Em decisões de dinheiro, isso pode representar desconto, imposto, taxa ou margem.",
      mistakes: ["misturar pontos percentuais com variação percentual", "esquecer de aplicar o resultado ao preço original", "arredondar cedo demais em contas com várias etapas"],
      nextStep: { label: "Calcular ROI", href: "/tools/calculadora-roi", text: "Use ROI quando a porcentagem estiver ligada a custo de investimento e lucro." },
    },
  },
};

const labels = {
  en: {
    intent: "What this calculator is best for",
    bestFor: "Best uses",
    example: "Practical example",
    mistakes: "Common mistakes to avoid",
    next: "Next money step",
  },
  pt: {
    intent: "Para que esta calculadora serve melhor",
    bestFor: "Melhores usos",
    example: "Exemplo prático",
    mistakes: "Erros comuns para evitar",
    next: "Próximo passo financeiro",
  },
};

export default function MoneySeoContent({ lang, toolId }: MoneySeoContentProps) {
  const entry = seoCopy[toolId]?.[lang];
  const label = labels[lang];

  if (!entry) return null;

  return (
    <section className="mt-10 rounded-[2rem] border border-emerald-100 bg-white p-5 shadow-xl shadow-emerald-950/10 md:p-8">
      <div className="grid gap-6 lg:grid-cols-[1fr_0.85fr]">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.24em] text-emerald-700">NexTool Money Guide</p>
          <h2 className="mt-3 text-2xl font-black tracking-tight text-slate-950 md:text-3xl">
            {label.intent}
          </h2>
          <p className="mt-4 text-base font-semibold leading-8 text-slate-700">{entry.intent}</p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
          <h3 className="text-lg font-black text-slate-950">{label.bestFor}</h3>
          <ul className="mt-4 space-y-3">
            {entry.bestFor.map((item) => (
              <li key={item} className="flex gap-3 text-sm font-semibold leading-6 text-slate-700">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-emerald-500" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <div className="rounded-3xl border border-emerald-100 bg-emerald-50 p-5">
          <h3 className="text-lg font-black text-slate-950">{label.example}</h3>
          <p className="mt-3 text-sm font-semibold leading-7 text-slate-700">{entry.example}</p>
        </div>

        <div className="rounded-3xl border border-amber-100 bg-amber-50 p-5">
          <h3 className="text-lg font-black text-slate-950">{label.mistakes}</h3>
          <ul className="mt-3 space-y-2">
            {entry.mistakes.map((item) => (
              <li key={item} className="text-sm font-semibold leading-6 text-slate-700">• {item}</li>
            ))}
          </ul>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-slate-950 p-5 text-white">
          <h3 className="text-lg font-black">{label.next}</h3>
          <p className="mt-3 text-sm font-semibold leading-7 text-slate-200">{entry.nextStep.text}</p>
          <Link
            href={`/${lang}${entry.nextStep.href}`}
            className="mt-5 inline-flex rounded-full bg-emerald-400 px-5 py-3 text-sm font-black text-slate-950 transition hover:-translate-y-0.5 hover:bg-emerald-300"
          >
            {entry.nextStep.label}
          </Link>
        </div>
      </div>
    </section>
  );
}
