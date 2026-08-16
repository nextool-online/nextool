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

export default function InflationCalculatorTool({ lang, ui }: ToolComponentProps) {
  const toolUi = ui!; const [amount, setAmount] = useState(""); const [inflationRate, setInflationRate] = useState(""); const [years, setYears] = useState("");
  const result = useMemo(() => { const currentAmount = parseUserNumber(amount); const rate = parseUserNumber(inflationRate); const period = parseUserNumber(years); if (!amount || !inflationRate || !years) return null; const futureValue = currentAmount * Math.pow(1 + rate / 100, period); const inflationImpact = futureValue - currentAmount; return { futureValue, inflationImpact, currentAmount }; }, [amount, inflationRate, years]);
  const helper = result ? (lang === "pt" ? `Você precisaria de ${formatCurrency(result.futureValue, lang)} para manter poder de compra semelhante.` : `You would need ${formatCurrency(result.futureValue, lang)} to keep similar purchasing power.`) : (lang === "pt" ? "Informe valor atual, inflação anual e prazo para estimar impacto." : "Enter current amount, annual inflation and time period to estimate impact.");
  return <ToolBox className={shellClass}><ToolSection title={getText(toolUi.heading, lang)} description={getText(toolUi.helper, lang)}><div className="space-y-6"><div className="grid gap-3 md:grid-cols-3"><MoneyInput value={amount} setValue={setAmount} placeholder={getText(toolUi.amount, lang)} /><MoneyInput value={inflationRate} setValue={setInflationRate} placeholder={getText(toolUi.inflationRate, lang)} /><MoneyInput value={years} setValue={setYears} placeholder={getText(toolUi.years, lang)} /></div><MoneyResultCard label={getText(toolUi.futureValue, lang)} value={result ? formatCurrency(result.futureValue, lang) : "—"} helper={helper} tone="amber" />{result && <MoneyMetricGrid metrics={[{ label: lang === "pt" ? "Valor atual" : "Current amount", value: formatCurrency(result.currentAmount, lang) }, { label: getText(toolUi.inflationImpact, lang), value: formatCurrency(result.inflationImpact, lang) }, { label: lang === "pt" ? "Aumento necessário" : "Required increase", value: formatPercent(result.currentAmount ? (result.inflationImpact / result.currentAmount) * 100 : 0, lang) }]} />}<MoneyToolCallout lang={lang} /></div></ToolSection></ToolBox>;
}
