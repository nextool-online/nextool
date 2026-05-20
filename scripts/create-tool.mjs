import fs from "fs";
import path from "path";

const toolId = process.argv[2];

if (!toolId) {
  console.error("Usage: node scripts/create-tool.mjs tool-id");
  process.exit(1);
}

const root = process.cwd();
const toolDir = path.join(root, "tools", toolId);

if (fs.existsSync(toolDir)) {
  console.error(`Tool already exists: ${toolId}`);
  process.exit(1);
}

function toPascalCase(value) {
  return value
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
}

function toCamelCase(value) {
  const pascal = toPascalCase(value);
  return pascal.charAt(0).toLowerCase() + pascal.slice(1);
}

function toTitle(value) {
  return value
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

const pascalName = toPascalCase(toolId);
const camelName = toCamelCase(toolId);
const componentName = `${pascalName}Tool`;
const contentName = `${camelName}Content`;
const definitionName = `${camelName}Tool`;
const title = toTitle(toolId);

fs.mkdirSync(toolDir, { recursive: true });

fs.writeFileSync(
  path.join(toolDir, "content.ts"),
  `export const ${contentName} = {
  slug: {
    en: "${toolId}",
  },

  title: {
    en: "${title}",
  },

  description: {
    en: "Use this free online tool quickly and easily.",
  },

  seo: {
    title: {
      en: "${title} - Free Online Tool",
    },

    description: {
      en: "Use this free ${title.toLowerCase()} online tool quickly and easily.",
    },
  },

  article: [
    {
      heading: {
        en: "What is this tool?",
      },

      body: {
        en: "This tool helps you complete a specific task directly in your browser.",
      },
    },
  ],

  ui: {
    heading: {
      en: "${title}",
    },

    helper: {
      en: "Enter the values and get the result instantly.",
    },
  },
};
`
);

fs.writeFileSync(
  path.join(toolDir, "component.tsx"),
  `"use client";

import ToolBox from "../../components/ui/ToolBox";
import { getText } from "../../data/i18n";

import { ${contentName} } from "./content";

import type { ToolComponentProps } from "../types";

export default function ${componentName}({ lang }: ToolComponentProps) {
  const ui = ${contentName}.ui;

  return (
    <ToolBox>
      <div className="mb-5">
        <h2 className="text-xl font-bold md:text-2xl">
          {getText(ui.heading, lang)}
        </h2>

        <p className="mt-2 text-sm text-zinc-600">
          {getText(ui.helper, lang)}
        </p>
      </div>

      <div className="rounded-xl border border-dashed border-zinc-300 bg-zinc-50 p-6 text-sm text-zinc-500">
        Build the tool UI here.
      </div>
    </ToolBox>
  );
}
`
);

fs.writeFileSync(
  path.join(toolDir, "index.ts"),
  `import ${componentName} from "./component";
import { ${contentName} } from "./content";

import type { ToolDefinition } from "../types";

export const ${definitionName}: ToolDefinition = {
  id: "${toolId}",

  category: "calculators",

  availableLanguages: ["en"],

  ...${contentName},

  component: ${componentName},
};
`
);

console.log("");
console.log(`Created tool module: tools/${toolId}`);
console.log("");
console.log("Add this import to tools/registry.ts:");
console.log(`import { ${definitionName} } from "./${toolId}";`);
console.log("");
console.log("Then add this item to the tools array:");
console.log(definitionName);
console.log("");