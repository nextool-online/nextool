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



function MoneyInput({ value, setValue, placeholder }: { value: string; setValue: (value: string) => void; placeholder: string }) {
  return (
    <ToolInput
      type="text"
      inputMode="decimal"
      value={value}
      onChange={(event) => setValue(event.target.value)}
      onInput={(event) => setValue(event.currentTarget.value)}
      placeholder={placeholder}
    />
  );
}

const shellClass = "rounded-[2rem] border border-emerald-200 bg-white/95 p-4 text-slate-950 shadow-[0_24px_70px_rgba(6,78,59,0.16)] ring-1 ring-emerald-100 md:p-8";

export default function MortgageCalculatorTool({ lang, ui }: ToolComponentProps) {
  const toolUi = ui!;
  const [homePrice, setHomePrice] = useState("");
  const [downPayment, setDownPayment] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [years, setYears] = useState("");

  const result = useMemo(() => {
    const propertyPrice = parseUserNumber(homePrice);
    const deposit = parseUserNumber(downPayment || "0");
    const annualRate = parseUserNumber(interestRate);
    const loanYears = parseUserNumber(years);
    const loanAmount = propertyPrice - deposit;
    const loanMonths = loanYears * 12;
    if (!propertyPrice || annualRate < 0 || loanYears <= 0 || deposit < 0 || deposit >= propertyPrice) return null;
    const monthlyRate = annualRate / 100 / 12;
    const monthlyPayment = monthlyRate === 0 ? loanAmount / loanMonths : (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, loanMonths)) / (Math.pow(1 + monthlyRate, loanMonths) - 1);
    const totalPayment = monthlyPayment * loanMonths;
    const totalInterest = totalPayment - loanAmount;
    return { loanAmount, monthlyPayment, totalPayment, totalInterest };
  }, [homePrice, downPayment, interestRate, years]);

  const helper = result
    ? lang === "pt" ? `Esta é a parcela mensal estimada para um financiamento de ${formatCurrency(result.loanAmount, lang)}.` : `This is the estimated monthly payment for a ${formatCurrency(result.loanAmount, lang)} mortgage balance.`
    : lang === "pt" ? "Informe preço, entrada, taxa e prazo para estimar a parcela mensal." : "Enter price, down payment, rate and term to estimate the monthly payment.";

  return (
    <ToolBox className={shellClass}>
      <ToolSection title={getText(toolUi.heading, lang)} description={getText(toolUi.helper, lang)}>
        <div className="space-y-6">
          <div className="grid gap-3 md:grid-cols-4">
            <MoneyInput value={homePrice} setValue={setHomePrice} placeholder={getText(toolUi.homePrice, lang)} />
            <MoneyInput value={downPayment} setValue={setDownPayment} placeholder={getText(toolUi.downPayment, lang)} />
            <MoneyInput value={interestRate} setValue={setInterestRate} placeholder={getText(toolUi.interestRate, lang)} />
            <MoneyInput value={years} setValue={setYears} placeholder={getText(toolUi.years, lang)} />
          </div>
          <MoneyResultCard label={getText(toolUi.monthlyPayment, lang)} value={result ? formatCurrency(result.monthlyPayment, lang) : "—"} helper={helper} />
          {result && <MoneyMetricGrid metrics={[{ label: getText(toolUi.loanAmount, lang), value: formatCurrency(result.loanAmount, lang) }, { label: getText(toolUi.totalPayment, lang), value: formatCurrency(result.totalPayment, lang) }, { label: getText(toolUi.totalInterest, lang), value: formatCurrency(result.totalInterest, lang) }]} />}
          <MoneyToolCallout lang={lang} />
        </div>
      </ToolSection>
    </ToolBox>
  );
}
