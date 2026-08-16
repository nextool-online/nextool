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

export default function PercentageCalculator({ lang, ui }: ToolComponentProps) {
  const toolUi = ui!; const [percentage, setPercentage] = useState(""); const [value, setValue] = useState("");
  const result = useMemo(() => { const p = parseUserNumber(percentage); const v = parseUserNumber(value); if (!percentage || !value) return null; const calculated = (p / 100) * v; return { calculated, percentage: p, value: v }; }, [percentage, value]);
  const helper = result ? (lang === "pt" ? `${formatNumber(result.percentage, lang)}% de ${formatNumber(result.value, lang)} é ${formatNumber(result.calculated, lang)}.` : `${formatNumber(result.percentage, lang)}% of ${formatNumber(result.value, lang)} is ${formatNumber(result.calculated, lang)}.`) : (lang === "pt" ? "Informe a porcentagem e o valor para obter a resposta imediatamente." : "Enter the percentage and value to get the answer instantly.");
  return <ToolBox className={shellClass}><ToolSection title={getText(toolUi.heading, lang)} description={getText(toolUi.helper, lang)}><div className="space-y-6"><div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 md:gap-4"><MoneyInput value={percentage} setValue={setPercentage} placeholder={getText(toolUi.percentage, lang)} /><span className="text-sm font-black text-emerald-600">%</span><MoneyInput value={value} setValue={setValue} placeholder={getText(toolUi.value, lang)} /></div><MoneyResultCard label={lang === "pt" ? "Resultado" : "Result"} value={result ? formatNumber(result.calculated, lang, 4) : "—"} helper={helper} tone="blue" />{result && <MoneyMetricGrid metrics={[{ label: lang === "pt" ? "Porcentagem" : "Percentage", value: `${formatNumber(result.percentage, lang)}%` }, { label: lang === "pt" ? "Valor base" : "Base value", value: formatNumber(result.value, lang) }, { label: lang === "pt" ? "Proporção decimal" : "Decimal ratio", value: formatNumber(result.percentage / 100, lang, 4) }]} />}<MoneyToolCallout lang={lang} /></div></ToolSection></ToolBox>;
}
