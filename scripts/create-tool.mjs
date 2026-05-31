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
const lowerTitle = title.toLowerCase();

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
    en: "Use this free ${lowerTitle} quickly and easily.",
  },

  seo: {
    title: {
      en: "${title} - Free Online Tool",
    },

    description: {
      en: "Use this free ${lowerTitle} online tool to complete your calculation quickly and easily.",
    },
  },

  article: [
    {
      heading: {
        en: "Understanding ${lowerTitle}",
      },

      body: {
        en: "This tool helps you complete a specific calculation or conversion directly in your browser.",
      },
    },
    {
      heading: {
        en: "How to use this tool",
      },

      body: {
        en: "Enter the required values, review the result and adjust the inputs if you want to compare different scenarios.",
      },
    },
    {
      heading: {
        en: "Common use cases",
      },

      body: {
        en: "You can use this tool for quick checks, everyday calculations, study, work or personal planning.",
      },
    },
  ],

  faq: [
    {
      question: {
        en: "Is this ${lowerTitle} free to use?",
      },

      answer: {
        en: "Yes. This tool is free to use directly in your browser.",
      },
    },
    {
      question: {
        en: "Do I need to create an account?",
      },

      answer: {
        en: "No. You can use this tool without registration.",
      },
    },
    {
      question: {
        en: "Are the results calculated instantly?",
      },

      answer: {
        en: "Yes. Results update directly in the browser as you enter or change values.",
      },
    },
    {
      question: {
        en: "Can I use this tool on mobile?",
      },

      answer: {
        en: "Yes. The tool is designed to work on desktop, tablet and mobile devices.",
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
import ToolSection from "../../components/toolkit/ToolSection";

import { getText } from "../../data/i18n";

import { ${contentName} } from "./content";

import type { ToolComponentProps } from "../types";

export default function ${componentName}({ lang }: ToolComponentProps) {
  const ui = ${contentName}.ui;

  return (
    <ToolBox>
      <ToolSection
        title={getText(ui.heading, lang)}
        description={getText(ui.helper, lang)}
      >
        <div className="rounded-xl border border-dashed border-zinc-300 bg-zinc-50 p-6 text-sm text-zinc-500">
          Build the tool UI here.
        </div>
      </ToolSection>
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

  featured: false,

  popular: false,

  isNew: true,

  difficulty: "basic",

  availableLanguages: ["en"],

  relatedTools: [],

  tags: [
    "calculator",
    "online tool",
  ],

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
console.log("Quality checklist:");
console.log("- Replace generic article text with tool-specific content");
console.log("- Replace generic FAQ with tool-specific FAQ");
console.log("- Add correct relatedTools");
console.log("- Add useful tags");
console.log("- Set featured/popular only when appropriate");
console.log("- Build the real component UI");
console.log("");