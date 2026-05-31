"use client";

import { useMemo, useState } from "react";

import ToolBox from "../../components/ui/ToolBox";
import ToolInput from "../../components/toolkit/ToolInput";
import ToolResult from "../../components/toolkit/ToolResult";
import ToolSection from "../../components/toolkit/ToolSection";

import { getText } from "../../data/i18n";

import { discountCalculatorContent } from "./content";

import type { ToolComponentProps } from "../types";

export default function DiscountCalculatorTool({
  lang,
}: ToolComponentProps) {
  const ui = discountCalculatorContent.ui;

  const [originalPrice, setOriginalPrice] = useState("");
  const [discount, setDiscount] = useState("");

  const result = useMemo(() => {
    const priceValue = Number(originalPrice);
    const discountValue = Number(discount);

    if (!priceValue || discountValue < 0 || discount === "") {
      return {
        finalPrice: "",
        savings: "",
      };
    }

    const savings = (priceValue * discountValue) / 100;
    const finalPrice = priceValue - savings;

    return {
      finalPrice: finalPrice.toFixed(2),
      savings: savings.toFixed(2),
    };
  }, [originalPrice, discount]);

  return (
    <ToolBox>
      <ToolSection
        title={getText(ui.heading, lang)}
        description={getText(ui.helper, lang)}
      >
        <div className="space-y-5">
          <div className="grid gap-3 md:grid-cols-2">
            <ToolInput
              type="number"
              value={originalPrice}
              onChange={(event) =>
                setOriginalPrice(event.target.value)
              }
              placeholder={getText(ui.originalPrice, lang)}
            />

            <ToolInput
              type="number"
              value={discount}
              onChange={(event) =>
                setDiscount(event.target.value)
              }
              placeholder={getText(ui.discount, lang)}
            />
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            <div>
              <p className="mb-2 text-center text-xs font-semibold uppercase tracking-wide text-zinc-400">
                {getText(ui.finalPrice, lang)}
              </p>

              <ToolResult
                value={result.finalPrice}
                placeholder="0.00"
              />
            </div>

            <div>
              <p className="mb-2 text-center text-xs font-semibold uppercase tracking-wide text-zinc-400">
                {getText(ui.savings, lang)}
              </p>

              <ToolResult
                value={result.savings}
                placeholder="0.00"
              />
            </div>
          </div>
        </div>
      </ToolSection>
    </ToolBox>
  );
}