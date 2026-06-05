# Nextool Improvements Roadmap

Última atualização: Junho 2026

---

# PRIORIDADE 1 — SEO

## Reescrever títulos SEO

Status: Concluído ✅

Resultado:

- títulos específicos por ferramenta
- foco em intenção de busca
- melhoria de CTR potencial

---

## Reescrever meta descriptions

Status: Concluído ✅

Resultado:

- descrições específicas
- melhor alinhamento com buscas reais
- maior potencial de CTR

---

## Expandir artigos

Status: Concluído ✅

Resultado:

- 6 a 8 seções por ferramenta
- conteúdo SEO V2
- exemplos práticos
- explicações mais completas
- melhor cobertura semântica

---

## Adicionar fórmulas aos artigos

Status: Concluído ✅

Resultado:

- fórmulas adicionadas
- explicação das variáveis
- bloco visual padronizado
- tabelas de referência em conversores

---

## Melhorar links internos

Status: Concluído ✅

Resultado:

- relatedTools implementado
- clusters criados

Clusters:

- Finance
- Health
- Math
- Converters

Objetivo alcançado:

- melhor distribuição de autoridade interna
- aumento de páginas por sessão
- reforço de contexto temático

---

# PRIORIDADE 2 — INTERNACIONALIZAÇÃO

## Simplificar idiomas ativos

Status: Planejado

Objetivo:

Manter inicialmente apenas:

- EN
- PT
- IT
- ES

Remover temporariamente:

- FR
- DE
- RO
- PL
- NL
- TR
- AR

Motivo:

Reduzir complexidade operacional e focar nos idiomas prioritários.

---

## Melhorar seletor de idioma

Status: Planejado

Problema:

Lista atual ocupa espaço excessivo e gera distração.

Objetivo:

Substituir por dropdown compacto.

Exemplo:

🌐 English ▼

---

## Definir arquitetura multilíngue

Status: Planejado

Avaliar estrutura:

tools/
  bmi-calculator/
    content.en.ts
    content.pt.ts
    content.it.ts
    content.es.ts

Objetivos:

- arquivos menores
- manutenção mais simples
- traduções independentes
- facilidade para IA e tradutores

---

## Traduzir todas as ferramentas para Italiano

Status: Planejado

Meta:

25 ferramentas em Italiano.

Motivo:

- mercado menos competitivo
- experiência pessoal na Itália
- potencial de ranqueamento rápido

---

## Traduzir todas as ferramentas para Português

Status: Planejado

Meta:

25 ferramentas em Português.

---

## Traduzir todas as ferramentas para Espanhol

Status: Planejado

Meta:

25 ferramentas em Espanhol.

---

## Revisar URLs traduzidas

Status: Futuro

Exemplos:

/it/calcolatore-mutuo

/pt/calculadora-financiamento

Objetivo:

Melhor SEO local.

---

# PRIORIDADE 3 — UX

## Aceitar vírgula decimal

Status: Pendente

Hoje:

1.75

Meta:

1,75
1.75

Ambos funcionam.

---

## Formatação automática de números

Status: Pendente

Hoje:

1234567.89

Meta:

1,234,567.89

ou

1.234.567,89

dependendo do idioma.

---

## Formatação monetária por localidade

Status: Pendente

Exemplos:

Brasil:
R$ 10.000,00

Estados Unidos:
$10,000.00

Canadá:
CAD 10,000.00

Itália:
€10.000,00

---

## Melhorar teclado numérico mobile

Status: Pendente

Problema:

Em alguns aparelhos o ponto decimal é difícil de inserir.

Investigar soluções.

---

## Expandir uso do ToolSelect

Status: Em andamento

Já utilizado em:

- Calorie Calculator

Aplicar também em:

- Body Fat Calculator
- BMR Calculator
- futuras ferramentas

Objetivo:

Reduzir erros do usuário.

---

## Botão copiar resultado

Status: Futuro

Exemplo:

[ Copy Result ]

---

## Melhor exibição de resultados

Status: Futuro

Melhorar:

- números grandes
- resultados monetários
- alinhamento visual
- legibilidade

---

# PRIORIDADE 4 — VISUAL

## Dark Mode

Status: Planejado

Objetivo:

- melhorar experiência
- acompanhar padrão moderno

---

## Melhorar ToolResult

Status: Futuro

Adicionar:

- destaque visual
- animação leve
- melhor contraste

---

## Gráficos para ferramentas financeiras

Status: Futuro

Aplicar em:

- Investment Calculator
- Retirement Calculator
- Compound Interest Calculator
- Savings Calculator

Mostrar evolução ao longo do tempo.

---

## Revisar Language Switcher

Status: Planejado

Objetivo:

Transformar lista atual em componente mais limpo e compacto.

---

# PRIORIDADE 5 — CLUSTERS FUTUROS

## Developer Tools

Status: Planejado

Ferramentas:

- JSON Formatter
- JSON Validator
- Base64 Encoder
- Base64 Decoder
- UUID Generator
- JWT Decoder
- Hash Generator

Objetivo:

Atrair público técnico.

---

## Finance Advanced

Status: Planejado

Ferramentas:

- Debt Payoff Calculator
- APR Calculator
- Loan Comparison Calculator
- Credit Card Payoff Calculator

---

## Health Advanced

Status: Planejado

Ferramentas:

- Protein Calculator
- Macro Calculator
- Lean Body Mass Calculator
- Ideal Weight Calculator

---

## SEO Tools

Status: Planejado

Ferramentas:

- Meta Tag Generator
- Open Graph Generator
- Robots.txt Generator
- Sitemap Validator
- Slug Generator

---

# PRIORIDADE 6 — INFRAESTRUTURA

## Revisar Sitemap

Status: Futuro

Verificar indexação correta.

---

## Revisar robots.txt

Status: Futuro

---

## Revisar schema.org

Status: Futuro

Melhorar:

- FAQ
- HowTo
- Dataset
- WebApplication

---

## Revisar Core Web Vitals

Status: Futuro

Analisar:

- LCP
- CLS
- INP

---

## Deploy Final Vercel

Status: Planejado

---

## Conectar domínio nextool.online

Status: Planejado

---

## Search Console

Status: Planejado

---

## Bing Webmaster Tools

Status: Planejado

---

# PROCESSO PADRÃO DE NOVA FERRAMENTA

1. Criar ferramenta
2. Adicionar ao registry
3. Salvar arquivos
4. npm run build
5. Confirmar slug
6. Confirmar card
7. Testar URL
8. Git commit
9. Git push

---

# MARCOS DO PROJETO

## Marco 1

✓ Next.js configurado

✓ Domínio nextool.online adquirido

✓ GitHub configurado

✓ Estrutura base criada

---

## Marco 2

✓ 25 ferramentas funcionando

✓ Build verde

✓ ToolSelect criado

✓ SEO V2 implementado

✓ Fórmulas implementadas

✓ FAQs expandidas

✓ Artigos expandidos

✓ Internal Linking implementado

✓ Clusters criados

✓ GitHub Backup atualizado

---

## Próximo Marco

Objetivo:

Infraestrutura multilíngue consolidada

✓ EN

✓ PT preparado

✓ IT preparado

✓ ES preparado

✓ seletor de idioma revisado

✓ arquitetura de conteúdo definida

---

## Marco Futuro

Objetivo:

25 ferramentas

×

4 idiomas

=

100 páginas indexáveis

---

## Visão de Longo Prazo

Objetivo:

Transformar o Nextool em uma plataforma internacional de ferramentas online com:

- múltiplos idiomas
- SEO escalável
- clusters temáticos
- monetização via anúncios
- futura expansão para ferramentas técnicas e profissionais