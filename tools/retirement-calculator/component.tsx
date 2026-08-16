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

function formatNumber(value: number, lang: "en" | "pt", maximumFractionDigits = 2) {
  return new Intl.NumberFormat(lang === "pt" ? "pt-BR" : "en-US", {
    maximumFractionDigits,
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

export default function RetirementCalculatorTool({ lang, ui }: ToolComponentProps) {
  const toolUi = ui!; const [currentAge, setCurrentAge] = useState(""); const [retirementAge, setRetirementAge] = useState(""); const [currentSavings, setCurrentSavings] = useState(""); const [monthlyContribution, setMonthlyContribution] = useState(""); const [annualReturn, setAnnualReturn] = useState("");
  const result = useMemo(() => { const ageNow = parseUserNumber(currentAge); const ageRetire = parseUserNumber(retirementAge); const savings = parseUserNumber(currentSavings); const contribution = parseUserNumber(monthlyContribution); const rate = parseUserNumber(annualReturn); if (!currentAge || !retirementAge || !currentSavings || !monthlyContribution || !annualReturn || ageRetire <= ageNow) return null; const years = ageRetire - ageNow; const monthlyRate = rate / 100 / 12; const months = years * 12; let balance = savings; for (let i = 0; i < months; i += 1) balance = balance * (1 + monthlyRate) + contribution; const totalContributions = savings + contribution * months; return { yearsUntilRetirement: years, totalContributions, projectedSavings: balance }; }, [currentAge, retirementAge, currentSavings, monthlyContribution, annualReturn]);
  const helper = result ? (lang === "pt" ? `Você tem cerca de ${formatNumber(result.yearsUntilRetirement, lang, 0)} anos até a idade de aposentadoria informada.` : `You have about ${formatNumber(result.yearsUntilRetirement, lang, 0)} years until the retirement age entered.`) : (lang === "pt" ? "Informe idade atual, idade desejada, economia atual, aporte e retorno." : "Enter current age, target age, savings, contribution and expected return.");
  return <ToolBox className={shellClass}><ToolSection title={getText(toolUi.heading, lang)} description={getText(toolUi.helper, lang)}><div className="space-y-6"><div className="grid gap-3 md:grid-cols-5"><MoneyInput value={currentAge} setValue={setCurrentAge} placeholder={getText(toolUi.currentAge, lang)} /><MoneyInput value={retirementAge} setValue={setRetirementAge} placeholder={getText(toolUi.retirementAge, lang)} /><MoneyInput value={currentSavings} setValue={setCurrentSavings} placeholder={getText(toolUi.currentSavings, lang)} /><MoneyInput value={monthlyContribution} setValue={setMonthlyContribution} placeholder={getText(toolUi.monthlyContribution, lang)} /><MoneyInput value={annualReturn} setValue={setAnnualReturn} placeholder={getText(toolUi.annualReturn, lang)} /></div><MoneyResultCard label={getText(toolUi.projectedSavings, lang)} value={result ? formatCurrency(result.projectedSavings, lang) : "—"} helper={helper} />{result && <MoneyMetricGrid metrics={[{ label: getText(toolUi.yearsUntilRetirement, lang), value: formatNumber(result.yearsUntilRetirement, lang, 0) }, { label: getText(toolUi.totalContributions, lang), value: formatCurrency(result.totalContributions, lang) }, { label: lang === "pt" ? "Crescimento estimado" : "Estimated growth", value: formatCurrency(result.projectedSavings - result.totalContributions, lang) }]} />}<MoneyToolCallout lang={lang} /></div></ToolSection></ToolBox>;
}
