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

export default function BreakEvenCalculatorTool({ lang, ui }: ToolComponentProps) {
  const toolUi = ui!; const [fixedCosts, setFixedCosts] = useState(""); const [pricePerUnit, setPricePerUnit] = useState(""); const [costPerUnit, setCostPerUnit] = useState("");
  const result = useMemo(() => { const fixed = parseUserNumber(fixedCosts); const price = parseUserNumber(pricePerUnit); const cost = parseUserNumber(costPerUnit); if (!fixedCosts || !pricePerUnit || !costPerUnit || price <= cost) return null; const profitPerUnit = price - cost; const breakEvenUnits = fixed / profitPerUnit; const revenueNeeded = breakEvenUnits * price; return { breakEvenUnits, revenueNeeded, profitPerUnit }; }, [fixedCosts, pricePerUnit, costPerUnit]);
  const helper = result ? (lang === "pt" ? `Você precisa vender cerca de ${formatNumber(result.breakEvenUnits, lang)} unidades para cobrir os custos fixos.` : `You need to sell about ${formatNumber(result.breakEvenUnits, lang)} units to cover fixed costs.`) : (lang === "pt" ? "Informe custos fixos, preço e custo por unidade." : "Enter fixed costs, unit price and unit cost.");
  return <ToolBox className={shellClass}><ToolSection title={getText(toolUi.heading, lang)} description={getText(toolUi.helper, lang)}><div className="space-y-6"><div className="grid gap-3 md:grid-cols-3"><MoneyInput value={fixedCosts} setValue={setFixedCosts} placeholder={getText(toolUi.fixedCosts, lang)} /><MoneyInput value={pricePerUnit} setValue={setPricePerUnit} placeholder={getText(toolUi.pricePerUnit, lang)} /><MoneyInput value={costPerUnit} setValue={setCostPerUnit} placeholder={getText(toolUi.costPerUnit, lang)} /></div><MoneyResultCard label={getText(toolUi.breakEvenUnits, lang)} value={result ? formatNumber(result.breakEvenUnits, lang) : "—"} helper={helper} />{result && <MoneyMetricGrid metrics={[{ label: getText(toolUi.revenueNeeded, lang), value: formatCurrency(result.revenueNeeded, lang) }, { label: getText(toolUi.profitPerUnit, lang), value: formatCurrency(result.profitPerUnit, lang) }, { label: lang === "pt" ? "Margem unitária" : "Unit margin", value: formatPercent(parseUserNumber(pricePerUnit) ? (result.profitPerUnit / parseUserNumber(pricePerUnit)) * 100 : 0, lang) }]} />}<MoneyToolCallout lang={lang} /></div></ToolSection></ToolBox>;
}
