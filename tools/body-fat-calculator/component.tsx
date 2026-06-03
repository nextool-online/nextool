"use client";

import { useMemo, useState } from "react";

import ToolBox from "../../components/ui/ToolBox";
import ToolInput from "../../components/toolkit/ToolInput";
import ToolResult from "../../components/toolkit/ToolResult";
import ToolSection from "../../components/toolkit/ToolSection";
import ToolSelect from "../../components/toolkit/ToolSelect";

import { getText } from "../../data/i18n";

import { bodyFatCalculatorContent } from "./content";

import type { ToolComponentProps } from "../types";

export default function BodyFatCalculatorTool({
  lang,
}: ToolComponentProps) {
  const ui = bodyFatCalculatorContent.ui;

  const [gender, setGender] =
    useState("male");

  const [height, setHeight] =
    useState("");

  const [neck, setNeck] =
    useState("");

  const [waist, setWaist] =
    useState("");

  const [hip, setHip] =
    useState("");

  const result = useMemo(() => {
    const h = Number(height);
    const n = Number(neck);
    const w = Number(waist);
    const hp = Number(hip);

    if (
      !height ||
      !neck ||
      !waist
    ) {
      return {
        bodyFat: "",
      };
    }

    let bodyFat = 0;

    if (gender === "male") {
      bodyFat =
        495 /
          (1.0324 -
            0.19077 *
              Math.log10(w - n) +
            0.15456 *
              Math.log10(h)) -
        450;
    } else {
      if (!hip) {
        return {
          bodyFat: "",
        };
      }

      bodyFat =
        495 /
          (1.29579 -
            0.35004 *
              Math.log10(
                w + hp - n
              ) +
            0.221 *
              Math.log10(h)) -
        450;
    }

    return {
      bodyFat:
        bodyFat.toFixed(1),
    };
  }, [
    gender,
    height,
    neck,
    waist,
    hip,
  ]);

  return (
    <ToolBox>
      <ToolSection
        title={getText(ui.heading, lang)}
        description={getText(ui.helper, lang)}
      >
        <div className="space-y-4">
          <ToolSelect
            value={gender}
            onChange={(event) =>
              setGender(
                event.target.value
              )
            }
          >
            <option value="male">
              Male
            </option>

            <option value="female">
              Female
            </option>
          </ToolSelect>

          <ToolInput
            type="number"
            value={height}
            onChange={(event) =>
              setHeight(
                event.target.value
              )
            }
            placeholder={getText(
              ui.height,
              lang
            )}
          />

          <ToolInput
            type="number"
            value={neck}
            onChange={(event) =>
              setNeck(
                event.target.value
              )
            }
            placeholder={getText(
              ui.neck,
              lang
            )}
          />

          <ToolInput
            type="number"
            value={waist}
            onChange={(event) =>
              setWaist(
                event.target.value
              )
            }
            placeholder={getText(
              ui.waist,
              lang
            )}
          />

          <ToolInput
            type="number"
            value={hip}
            onChange={(event) =>
              setHip(
                event.target.value
              )
            }
            placeholder={getText(
              ui.hip,
              lang
            )}
          />

          <div>
            <p className="mb-2 text-center text-xs font-semibold uppercase tracking-wide text-zinc-400">
              {getText(
                ui.bodyFat,
                lang
              )}
            </p>

            <ToolResult
              value={result.bodyFat}
              placeholder="0.0"
            />
          </div>
        </div>
      </ToolSection>
    </ToolBox>
  );
}