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

export default function RoiCalculatorTool({ lang, ui }: ToolComponentProps) {
  const toolUi = ui!; const [investmentCost, setInvestmentCost] = useState(""); const [netProfit, setNetProfit] = useState("");
  const result = useMemo(() => { const cost = parseUserNumber(investmentCost); const profit = parseUserNumber(netProfit); if (!investmentCost || !netProfit || cost === 0) return null; const roi = (profit / cost) * 100; const totalReturn = cost + profit; return { roi, totalReturn, profit, cost }; }, [investmentCost, netProfit]);
  const helper = result ? (lang === "pt" ? `Para cada ${formatCurrency(result.cost, lang)} investido, o lucro estimado foi ${formatCurrency(result.profit, lang)}.` : `For ${formatCurrency(result.cost, lang)} invested, the estimated net profit is ${formatCurrency(result.profit, lang)}.`) : (lang === "pt" ? "Informe o custo do investimento e o lucro líquido para calcular o ROI." : "Enter investment cost and net profit to calculate ROI.");
  return <ToolBox className={shellClass}><ToolSection title={getText(toolUi.heading, lang)} description={getText(toolUi.helper, lang)}><div className="space-y-6"><div className="grid gap-3 md:grid-cols-2"><MoneyInput value={investmentCost} setValue={setInvestmentCost} placeholder={getText(toolUi.investmentCost, lang)} /><MoneyInput value={netProfit} setValue={setNetProfit} placeholder={getText(toolUi.netProfit, lang)} /></div><MoneyResultCard label={getText(toolUi.roi, lang)} value={result ? `${formatNumber(result.roi, lang)}%` : "—"} helper={helper} tone={result && result.roi < 0 ? "amber" : "emerald"} />{result && <MoneyMetricGrid metrics={[{ label: getText(toolUi.totalReturn, lang), value: formatCurrency(result.totalReturn, lang) }, { label: lang === "pt" ? "Lucro líquido" : "Net profit", value: formatCurrency(result.profit, lang) }, { label: lang === "pt" ? "Custo" : "Cost", value: formatCurrency(result.cost, lang) }]} />}<MoneyToolCallout lang={lang} /></div></ToolSection></ToolBox>;
}
