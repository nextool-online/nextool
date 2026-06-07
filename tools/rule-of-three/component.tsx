"use client";

import { useMemo, useState } from "react";

import ToolBox from "../../components/ui/ToolBox";
import ToolInput from "../../components/toolkit/ToolInput";
import ToolResult from "../../components/toolkit/ToolResult";
import ToolSection from "../../components/toolkit/ToolSection";

import { dictionary } from "../../data/dictionary";
import { getText } from "../../data/i18n";

import type { ToolComponentProps } from "../types";

export default function RuleOfThreeCalculator({
  lang,
  ui,
}: ToolComponentProps) {
  const toolUi = ui!;

  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [c, setC] = useState("");
  const [copied, setCopied] = useState(false);

  const result = useMemo(() => {
    const valueA = Number(a);
    const valueB = Number(b);
    const valueC = Number(c);

    if (!valueA || !valueB || !valueC) {
      return "";
    }

    const calculated =
      (valueB * valueC) / valueA;

    return Number.isInteger(calculated)
      ? calculated.toString()
      : calculated.toFixed(4).replace(/\.?0+$/, "");
  }, [a, b, c]);

  async function copyResult() {
    if (!result) {
      return;
    }

    await navigator.clipboard.writeText(result);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1500);
  }

  return (
    <ToolBox>
      <ToolSection
        title={getText(
          toolUi.heading,
          lang
        )}
        description={getText(
          toolUi.helper,
          lang
        )}
      >
        <div className="space-y-4">
          <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 md:gap-4">
            <ToolInput
              type="number"
              value={a}
              onChange={(event) =>
                setA(event.target.value)
              }
              placeholder={getText(
                toolUi.valueA,
                lang
              )}
            />

            <span className="text-sm font-bold text-zinc-400">
              →
            </span>

            <ToolInput
              type="number"
              value={b}
              onChange={(event) =>
                setB(event.target.value)
              }
              placeholder={getText(
                toolUi.valueB,
                lang
              )}
            />
          </div>

          <div className="text-center text-xs font-semibold uppercase tracking-wide text-zinc-400">
            {getText(
              toolUi.as,
              lang
            )}
          </div>

          <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 md:gap-4">
            <ToolInput
              type="number"
              value={c}
              onChange={(event) =>
                setC(event.target.value)
              }
              placeholder={getText(
                toolUi.valueC,
                lang
              )}
            />

            <span className="text-sm font-bold text-zinc-400">
              →
            </span>

            <ToolResult
              value={result}
              placeholder="X"
              onCopy={copyResult}
              copied={copied}
              copyLabel={getText(
                dictionary.copyResult,
                lang
              )}
            />
          </div>
        </div>
      </ToolSection>
    </ToolBox>
  );
}