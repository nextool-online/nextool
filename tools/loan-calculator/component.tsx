"use client";

import { useMemo, useState } from "react";

import MoneyMetricGrid from "../../components/money/MoneyMetricGrid";
import MoneyResultCard from "../../components/money/MoneyResultCard";
import MoneyToolCallout from "../../components/money/MoneyToolCallout";
import ToolBox from "../../components/ui/ToolBox";
import ToolInput from "../../components/toolkit/ToolInput";
import ToolSection from "../../components/toolkit/ToolSection";

import { getText } from "../../data/i18n";

import type { ToolComponentProps } from "../types";

function parseUserNumber(value: string) {
  return Number(value.replace(",", "."));
}

function formatCurrency(value: number, lang: "en" | "pt") {
  return new Intl.NumberFormat(lang === "pt" ? "pt-BR" : "en-US", {
    style: "currency",
    currency: lang === "pt" ? "BRL" : "USD",
    maximumFractionDigits: 2,
  }).format(value);
}

function formatPercent(value: number, lang: "en" | "pt") {
  return new Intl.NumberFormat(lang === "pt" ? "pt-BR" : "en-US", {
    style: "percent",
    maximumFractionDigits: 2,
  }).format(value / 100);
}

export default function LoanCalculatorTool({ lang, ui }: ToolComponentProps) {
  const toolUi = ui!;

  const [amount, setAmount] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [months, setMonths] = useState("");

  const result = useMemo(() => {
    const principal = parseUserNumber(amount);
    const annualRate = parseUserNumber(interestRate);
    const loanMonths = parseUserNumber(months);

    if (!principal || annualRate < 0 || !loanMonths) {
      return null;
    }

    const monthlyRate = annualRate / 100 / 12;
    const monthlyPayment = monthlyRate === 0
      ? principal / loanMonths
      : (principal * monthlyRate * Math.pow(1 + monthlyRate, loanMonths)) /
        (Math.pow(1 + monthlyRate, loanMonths) - 1);

    const totalPayment = monthlyPayment * loanMonths;
    const totalInterest = totalPayment - principal;

    return {
      monthlyPayment,
      totalPayment,
      totalInterest,
      interestShare: principal > 0 ? (totalInterest / principal) * 100 : 0,
    };
  }, [amount, interestRate, months]);

  const primaryHelper = result
    ? lang === "pt"
      ? `Esta é a parcela mensal estimada. Ao longo de ${months} meses, você pagaria ${formatCurrency(result.totalInterest, lang)} em juros.`
      : `This is the estimated monthly payment. Over ${months} months, you would pay ${formatCurrency(result.totalInterest, lang)} in interest.`
    : lang === "pt"
      ? "Preencha valor, taxa anual e prazo para ver uma estimativa clara da parcela."
      : "Enter amount, annual rate and term to see a clear monthly payment estimate.";

  return (
    <ToolBox variant="fitness" className="rounded-[2rem] border border-emerald-200 bg-white/95 p-4 text-slate-950 shadow-[0_24px_70px_rgba(6,78,59,0.16)] ring-1 ring-emerald-100 md:p-8">
      <ToolSection title={getText(toolUi.heading, lang)} description={getText(toolUi.helper, lang)}>
        <div className="space-y-6">
          <div className="grid gap-3 md:grid-cols-3">
            <ToolInput
              type="text"
              inputMode="decimal"
              value={amount}
              onChange={(event) => setAmount(event.target.value)}
              onInput={(event) => setAmount(event.currentTarget.value)}
              placeholder={getText(toolUi.amount, lang)}
            />

            <ToolInput
              type="text"
              inputMode="decimal"
              value={interestRate}
              onChange={(event) => setInterestRate(event.target.value)}
              onInput={(event) => setInterestRate(event.currentTarget.value)}
              placeholder={getText(toolUi.interestRate, lang)}
            />

            <ToolInput
              type="text"
              inputMode="decimal"
              value={months}
              onChange={(event) => setMonths(event.target.value)}
              onInput={(event) => setMonths(event.currentTarget.value)}
              placeholder={getText(toolUi.months, lang)}
            />
          </div>

          <MoneyResultCard
            label={getText(toolUi.monthlyPayment, lang)}
            value={result ? formatCurrency(result.monthlyPayment, lang) : "—"}
            helper={primaryHelper}
          />

          {result && (
            <MoneyMetricGrid
              metrics={[
                {
                  label: getText(toolUi.totalPayment, lang),
                  value: formatCurrency(result.totalPayment, lang),
                  helper: lang === "pt" ? "Valor total estimado pago no período." : "Estimated total repaid over the term.",
                },
                {
                  label: getText(toolUi.totalInterest, lang),
                  value: formatCurrency(result.totalInterest, lang),
                  helper: lang === "pt" ? "Custo estimado do dinheiro emprestado." : "Estimated cost of borrowing the money.",
                },
                {
                  label: lang === "pt" ? "Juros / principal" : "Interest / principal",
                  value: formatPercent(result.interestShare, lang),
                  helper: lang === "pt" ? "Ajuda a comparar o peso dos juros." : "Helps compare the weight of interest.",
                },
              ]}
            />
          )}

          <MoneyToolCallout lang={lang} />
        </div>
      </ToolSection>
    </ToolBox>
  );
}
