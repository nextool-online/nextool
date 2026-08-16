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

export default function SavingsCalculatorTool({ lang, ui }: ToolComponentProps) {
  const toolUi = ui!;
  const [initialDeposit, setInitialDeposit] = useState(""); const [monthlySavings, setMonthlySavings] = useState(""); const [interestRate, setInterestRate] = useState(""); const [years, setYears] = useState("");
  const result = useMemo(() => { const initial = parseUserNumber(initialDeposit); const monthly = parseUserNumber(monthlySavings); const rate = parseUserNumber(interestRate); const yearsValue = parseUserNumber(years); if (!initialDeposit || !monthlySavings || !interestRate || !years || yearsValue <= 0) return null; const monthlyRate = rate / 100 / 12; const months = yearsValue * 12; let balance = initial; for (let i = 0; i < months; i += 1) balance = balance * (1 + monthlyRate) + monthly; const totalDeposited = initial + monthly * months; const interestEarned = balance - totalDeposited; return { futureValue: balance, totalDeposited, interestEarned }; }, [initialDeposit, monthlySavings, interestRate, years]);
  const helper = result ? (lang === "pt" ? `Esta é a estimativa de economia acumulada em ${years} anos.` : `This is the estimated savings balance after ${years} years.`) : (lang === "pt" ? "Informe depósito inicial, economia mensal, taxa e prazo." : "Enter starting deposit, monthly savings, rate and time horizon.");
  return <ToolBox className={shellClass}><ToolSection title={getText(toolUi.heading, lang)} description={getText(toolUi.helper, lang)}><div className="space-y-6"><div className="grid gap-3 md:grid-cols-4"><MoneyInput value={initialDeposit} setValue={setInitialDeposit} placeholder={getText(toolUi.initialDeposit, lang)} /><MoneyInput value={monthlySavings} setValue={setMonthlySavings} placeholder={getText(toolUi.monthlySavings, lang)} /><MoneyInput value={interestRate} setValue={setInterestRate} placeholder={getText(toolUi.interestRate, lang)} /><MoneyInput value={years} setValue={setYears} placeholder={getText(toolUi.years, lang)} /></div><MoneyResultCard label={getText(toolUi.futureValue, lang)} value={result ? formatCurrency(result.futureValue, lang) : "—"} helper={helper} />{result && <MoneyMetricGrid metrics={[{ label: getText(toolUi.totalDeposited, lang), value: formatCurrency(result.totalDeposited, lang) }, { label: getText(toolUi.interestEarned, lang), value: formatCurrency(result.interestEarned, lang) }, { label: lang === "pt" ? "Juros sobre depósitos" : "Interest on deposits", value: formatPercent(result.totalDeposited ? (result.interestEarned / result.totalDeposited) * 100 : 0, lang) }]} />}<MoneyToolCallout lang={lang} /></div></ToolSection></ToolBox>;
}
