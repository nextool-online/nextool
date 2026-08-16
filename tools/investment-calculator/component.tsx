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

export default function InvestmentCalculatorTool({ lang, ui }: ToolComponentProps) {
  const toolUi = ui!; const [initialInvestment, setInitialInvestment] = useState(""); const [monthlyContribution, setMonthlyContribution] = useState(""); const [annualReturn, setAnnualReturn] = useState(""); const [years, setYears] = useState("");
  const result = useMemo(() => { const principal = parseUserNumber(initialInvestment); const contribution = parseUserNumber(monthlyContribution); const rate = parseUserNumber(annualReturn); const yearsValue = parseUserNumber(years); if (!initialInvestment || !monthlyContribution || !annualReturn || !years || yearsValue <= 0) return null; const monthlyRate = rate / 100 / 12; const months = yearsValue * 12; let balance = principal; for (let i = 0; i < months; i += 1) balance = balance * (1 + monthlyRate) + contribution; const totalContributions = principal + contribution * months; const investmentGain = balance - totalContributions; return { futureValue: balance, totalContributions, investmentGain }; }, [initialInvestment, monthlyContribution, annualReturn, years]);
  const helper = result ? (lang === "pt" ? `Ganho estimado de ${formatCurrency(result.investmentGain, lang)} antes de impostos, taxas e risco.` : `Estimated gain of ${formatCurrency(result.investmentGain, lang)} before taxes, fees and risk.`) : (lang === "pt" ? "Projete um cenário com aporte inicial, contribuição mensal e retorno anual." : "Project a scenario with starting amount, monthly contribution and annual return.");
  return <ToolBox className={shellClass}><ToolSection title={getText(toolUi.heading, lang)} description={getText(toolUi.helper, lang)}><div className="space-y-6"><div className="grid gap-3 md:grid-cols-4"><MoneyInput value={initialInvestment} setValue={setInitialInvestment} placeholder={getText(toolUi.initialInvestment, lang)} /><MoneyInput value={monthlyContribution} setValue={setMonthlyContribution} placeholder={getText(toolUi.monthlyContribution, lang)} /><MoneyInput value={annualReturn} setValue={setAnnualReturn} placeholder={getText(toolUi.annualReturn, lang)} /><MoneyInput value={years} setValue={setYears} placeholder={getText(toolUi.years, lang)} /></div><MoneyResultCard label={getText(toolUi.futureValue, lang)} value={result ? formatCurrency(result.futureValue, lang) : "—"} helper={helper} />{result && <MoneyMetricGrid metrics={[{ label: getText(toolUi.totalContributions, lang), value: formatCurrency(result.totalContributions, lang) }, { label: getText(toolUi.investmentGain, lang), value: formatCurrency(result.investmentGain, lang) }, { label: lang === "pt" ? "Retorno sobre aportes" : "Return on contributions", value: formatPercent(result.totalContributions ? (result.investmentGain / result.totalContributions) * 100 : 0, lang) }]} />}<MoneyToolCallout lang={lang} /></div></ToolSection></ToolBox>;
}
