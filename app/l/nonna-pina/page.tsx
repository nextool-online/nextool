import Image from "next/image";
import type { Metadata } from "next";

const checkoutUrl = "https://pay.hotmart.com/SEU_CHECKOUT_AQUI";

export const metadata: Metadata = {
  title: "La Cucina Naturale di Nonna Pina — Ebook de receitas naturais",
  description:
    "Página de vendas do ebook La Cucina Naturale di Nonna Pina: 50 receitas naturais em PDF, acesso imediato e garantia de 7 dias.",
  robots: { index: false, follow: false },
};

const chapters = [
  {
    title: "Digestione, gonfiore e intestino",
    items: ["Tisana al Finocchio", "Infuso di Menta Piperita", "Gel di Psillio"],
  },
  {
    title: "Sonno, tensione e relax",
    items: ["Tisana alla Verbena", "Infuso di Valeriana", "Bagno Serale alla Lavanda"],
  },
  {
    title: "Gola, tosse e vie respiratorie",
    items: ["Tisana al Timo", "Malva e Miele", "Macerato Freddo di Altea"],
  },
  {
    title: "Pelle, acne e irritazioni leggere",
    items: ["Impacco alla Calendula", "Bagno d’Avena", "Maschera d’Avena e Miele"],
  },
  {
    title: "Capelli e cuoio capelluto",
    items: ["Risciacquo al Rosmarino", "Risciacquo all’Ortica", "Risciacquo alla Camomilla"],
  },
  {
    title: "Muscoli, articolazioni e sollievo quotidiano",
    items: ["Bagno Caldo al Rosmarino", "Tisana Curcuma e Zenzero", "Pediluvio Caldo"],
  },
  {
    title: "Circolazione, vitalità e benessere quotidiano",
    items: ["Tisana alle Foglie di Betulla", "Crema di Miele e Noci", "Infuso di Carciofo e Limone"],
  },
];

const audience = [
  "Você gosta de soluções simples, naturais e tradicionais para o dia a dia.",
  "Você quer um material bonito, organizado e fácil de consultar no celular.",
  "Você prefere receitas com ingredientes conhecidos, sem linguagem complicada.",
  "Você quer ter uma pequena biblioteca de rituais caseiros para consultar quando precisar.",
  "Você valoriza tradição, cuidado familiar e bom senso antes de exageros.",
  "Você quer presentear alguém que ama receitas naturais e cultura italiana.",
];

const faqs = [
  {
    q: "Como recebo o ebook?",
    a: "Após a confirmação do pagamento na Hotmart, você recebe o acesso digital para baixar o PDF. O processo é automático.",
  },
  {
    q: "Funciona no celular?",
    a: "Sim. O ebook é em PDF e pode ser aberto no celular, tablet ou computador, sem precisar instalar aplicativos especiais.",
  },
  {
    q: "As receitas substituem consulta médica?",
    a: "Não. O material é educativo e tradicional. Ele não substitui diagnóstico, tratamento ou acompanhamento de um profissional de saúde.",
  },
  {
    q: "Os ingredientes são difíceis de encontrar?",
    a: "A proposta é usar ingredientes conhecidos, ervas, chás e itens comuns em mercados, feiras, lojas naturais ou no quintal.",
  },
  {
    q: "Tem garantia?",
    a: "Sim. A compra pela Hotmart conta com garantia de 7 dias, conforme as regras da plataforma.",
  },
];

function CtaButton({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <a
      href={checkoutUrl}
      className={`inline-flex items-center justify-center rounded-full bg-[#e39a27] px-7 py-4 text-center text-base font-black text-white shadow-[0_18px_45px_rgba(227,154,39,.32)] transition hover:-translate-y-0.5 hover:bg-[#f0a934] ${className}`}
      rel="nofollow sponsored noopener noreferrer"
    >
      {children}
    </a>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="mb-3 text-center text-xs font-bold uppercase tracking-[0.38em] text-[#c98324]">{children}</p>;
}

export default function NonnaPinaSalesPage() {
  return (
    <main className="min-h-screen bg-[#fbf7ed] text-[#231f18]">
      <div className="bg-[#bc3a2d] px-4 py-2 text-center text-xs font-bold text-[#fff1d5] md:text-sm">
        ⚠️ Oferta de lançamento — de R$ 97 por apenas R$ 37,90 — tempo limitado
      </div>

      <section className="relative overflow-hidden bg-[#173b0d] px-5 py-16 text-center text-white md:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_10%,rgba(230,166,54,.16),transparent_35%),linear-gradient(180deg,rgba(0,0,0,.18),rgba(0,0,0,0))]" />
        <div className="relative mx-auto max-w-3xl">
          <p className="mb-5 text-lg italic text-[#e39a27]" style={{ fontFamily: "Georgia, serif" }}>
            Nonna Pina
          </p>
          <div className="mx-auto mb-8 w-52 rotate-[-2deg] rounded-2xl bg-[#fff6df] p-2 shadow-2xl md:w-64">
            <Image
              src="/nonna-pina/cover.webp"
              alt="Capa do ebook La Cucina Naturale di Nonna Pina"
              width={420}
              height={594}
              priority
              className="h-auto w-full rounded-xl"
            />
          </div>
          <h1 className="mx-auto max-w-3xl text-4xl font-black leading-[0.98] md:text-6xl" style={{ fontFamily: "Georgia, serif" }}>
            50 receitas naturais da Nonna Pina para cuidar do dia a dia com simplicidade.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base italic leading-7 text-[#f5ead0] md:text-lg" style={{ fontFamily: "Georgia, serif" }}>
            Um ebook em PDF com chás, infusões, banhos, compressas e rituais tradicionais italianos — organizado, bonito e fácil de consultar no celular.
          </p>
          <div className="mt-8">
            <CtaButton>🌿 Quero garantir minha cópia — R$ 37,90</CtaButton>
            <p className="mt-4 text-xs text-[#d7c6a6]">Acesso imediato • PDF com 71 páginas • Garantia de 7 dias</p>
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-16 md:py-20">
        <div className="mx-auto max-w-3xl">
          <SectionLabel>Você reconhece isso?</SectionLabel>
          <h2 className="text-center text-3xl font-black text-[#214e16] md:text-4xl" style={{ fontFamily: "Georgia, serif" }}>
            Você já se cansou de procurar uma solução para cada pequeno desconforto?
          </h2>
          <div className="mt-10 divide-y divide-[#e6ddd0] rounded-2xl bg-white shadow-sm">
            {[
              "Comprar produtos diferentes para cada situação e depois esquecer tudo no armário.",
              "Procurar receitas na internet e encontrar informações bagunçadas, contraditórias ou exageradas.",
              "Querer algo mais natural, mas sem abrir mão de bom senso e segurança.",
              "Sentir falta daquele conhecimento simples de família: chá, infusão, banho, compressa, cuidado com calma.",
              "Gostar da tradição das nonnas italianas, mas querer tudo organizado em um material bonito.",
            ].map((item) => (
              <p key={item} className="flex gap-4 px-5 py-4 text-sm leading-6 md:text-base">
                <span className="font-bold text-[#bc3a2d]">×</span>
                <span>{item}</span>
              </p>
            ))}
          </div>
          <div className="mt-10 rounded-xl bg-[#255716] p-7 text-center text-lg italic leading-8 text-white shadow-xl" style={{ fontFamily: "Georgia, serif" }}>
            “E se você tivesse um livro simples, bonito e confiável para consultar antes de sair comprando mais uma coisa?”
          </div>
        </div>
      </section>

      <section className="bg-[#f4ead2] px-5 py-16 md:py-24">
        <div className="mx-auto grid max-w-4xl items-center gap-10 md:grid-cols-[1.35fr_.65fr]">
          <div>
            <SectionLabel>Quem é a Nonna Pina?</SectionLabel>
            <h2 className="text-3xl font-black text-[#214e16] md:text-4xl" style={{ fontFamily: "Georgia, serif" }}>
              Uma personagem criada para resgatar a sabedoria simples das cozinhas antigas.
            </h2>
            <div className="mt-7 space-y-5 text-base leading-8 text-[#30271d]">
              <p>
                A Nonna Pina representa aquela avó italiana que conhecia as ervas, respeitava o tempo das coisas e não complicava o cuidado diário.
              </p>
              <p>
                O ebook reúne 50 receitas naturais em formato visual, com ingredientes, modo de preparo, quando usar e observações de segurança.
              </p>
              <p className="font-bold">
                A ideia não é prometer milagre. É entregar um repertório prático, bonito e tradicional para consultar com calma.
              </p>
            </div>
          </div>
          <div className="rounded-full border-8 border-[#e39a27] bg-white p-3 shadow-xl">
            <Image
              src="/nonna-pina/sample-final.webp"
              alt="Página de amostra do ebook Nonna Pina"
              width={420}
              height={594}
              className="rounded-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-16 md:py-24">
        <div className="mx-auto max-w-4xl">
          <SectionLabel>O produto</SectionLabel>
          <h2 className="text-center text-3xl font-black text-[#214e16] md:text-4xl" style={{ fontFamily: "Georgia, serif" }}>
            O que está dentro do ebook
          </h2>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {["sample-digestione.webp", "sample-relax.webp", "sample-respiratorio.webp"].map((img, index) => (
              <div key={img} className="rounded-2xl border border-[#eadfcf] bg-[#fffaf0] p-3 shadow-lg">
                <Image
                  src={`/nonna-pina/${img}`}
                  alt={`Amostra de página ${index + 1} do ebook Nonna Pina`}
                  width={420}
                  height={594}
                  className="h-auto w-full rounded-xl"
                />
              </div>
            ))}
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {chapters.map((chapter, index) => (
              <div key={chapter.title} className="rounded-2xl border-l-4 border-[#2d7220] bg-[#fffaf0] p-6 shadow-sm">
                <p className="text-xs font-black uppercase tracking-[0.28em] text-[#c98324]">Capítulo {index + 1}</p>
                <h3 className="mt-2 text-xl font-black text-[#214e16]" style={{ fontFamily: "Georgia, serif" }}>
                  {chapter.title}
                </h3>
                <ul className="mt-4 space-y-2 text-sm leading-6">
                  {chapter.items.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="text-[#3cbf6a]">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <CtaButton>🌿 Quero as 50 receitas agora</CtaButton>
            <p className="mt-3 text-xs text-[#7a6f61]">PDF completo • Acesso vitalício • Funciona em qualquer celular</p>
          </div>
        </div>
      </section>

      <section className="bg-[#f4ead2] px-5 py-16 md:py-20">
        <div className="mx-auto max-w-4xl">
          <SectionLabel>É para você?</SectionLabel>
          <h2 className="text-center text-3xl font-black text-[#214e16] md:text-4xl" style={{ fontFamily: "Georgia, serif" }}>
            Esse ebook foi feito para você se...
          </h2>
          <div className="mt-9 grid gap-4 md:grid-cols-2">
            {audience.map((item) => (
              <div key={item} className="flex gap-3 rounded-xl bg-white p-5 shadow-sm">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-[#46c878] text-sm text-white">✓</span>
                <p className="text-sm leading-6">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-16 md:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <SectionLabel>Oferta de lançamento</SectionLabel>
          <h2 className="text-3xl font-black text-[#214e16] md:text-4xl" style={{ fontFamily: "Georgia, serif" }}>
            Quanto vale ter 50 receitas organizadas em um único livro?
          </h2>
          <div className="mt-10 rounded-3xl bg-[#255716] p-8 text-white shadow-2xl md:p-10">
            <p className="text-sm text-[#c8b99f] line-through">De R$ 97,00</p>
            <p className="mt-1 text-6xl font-black" style={{ fontFamily: "Georgia, serif" }}>R$ 37,90</p>
            <p className="mt-2 text-sm text-[#e9ddc6]">ou 3x de R$ 12,63 • Pix, cartão ou boleto</p>
            <ul className="mx-auto mt-8 max-w-xl space-y-3 text-left text-sm">
              {["Ebook completo com 50 receitas naturais", "PDF visual com 71 páginas", "Capítulos organizados por necessidade", "Acesso imediato após pagamento", "Garantia Hotmart de 7 dias"].map((item) => (
                <li key={item} className="border-t border-white/15 pt-3">✅ {item}</li>
              ))}
            </ul>
            <div className="mt-8">
              <CtaButton className="w-full max-w-md">🌿 Garantir minha cópia agora</CtaButton>
            </div>
            <p className="mt-4 text-xs text-[#c8b99f]">Pagamento seguro pela Hotmart</p>
          </div>
        </div>
      </section>

      <section className="bg-[#f4ead2] px-5 py-16 md:py-20">
        <div className="mx-auto max-w-3xl rounded-2xl border border-[#e39a27] bg-[#fffaf0] p-8 text-center shadow-sm">
          <div className="text-4xl">🛡️</div>
          <h2 className="mt-3 text-2xl font-black text-[#214e16]" style={{ fontFamily: "Georgia, serif" }}>
            Garantia de 7 dias
          </h2>
          <p className="mt-4 text-sm leading-7">
            Se o material não fizer sentido para você, basta solicitar o reembolso dentro do prazo de garantia da Hotmart. Sem complicação.
          </p>
        </div>
      </section>

      <section className="bg-white px-5 py-16 md:py-24">
        <div className="mx-auto max-w-3xl">
          <SectionLabel>Dúvidas frequentes</SectionLabel>
          <h2 className="text-center text-3xl font-black text-[#214e16] md:text-4xl" style={{ fontFamily: "Georgia, serif" }}>
            Perguntas frequentes
          </h2>
          <div className="mt-10 divide-y divide-[#e6ddd0] rounded-2xl border border-[#eee3d2] bg-[#fffaf0]">
            {faqs.map((faq) => (
              <details key={faq.q} className="group p-5 open:bg-white">
                <summary className="cursor-pointer list-none font-bold text-[#214e16]">
                  <span className="mr-2 text-[#c98324]">?</span>
                  {faq.q}
                </summary>
                <p className="mt-3 text-sm leading-7 text-[#51483d]">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#173b0d] px-5 py-16 text-center text-white md:py-24">
        <h2 className="mx-auto max-w-3xl text-3xl font-black md:text-5xl" style={{ fontFamily: "Georgia, serif" }}>
          A tradição fica mais útil quando está organizada na sua mão.
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-[#e6dcc8]">
          Receba o ebook da Nonna Pina em PDF e tenha 50 receitas naturais para consultar sempre que quiser.
        </p>
        <div className="mt-8">
          <CtaButton>🌿 Quero o ebook da Nonna Pina</CtaButton>
          <p className="mt-4 text-xs text-[#c8b99f]">R$ 37,90 • Acesso imediato • Garantia de 7 dias</p>
        </div>
      </section>

      <footer className="bg-[#101010] px-5 py-8 text-center text-xs leading-6 text-[#8f8f8f]">
        <p>© 2026 Nonna Pina. Todos os direitos reservados.</p>
        <p className="mt-2">Este material tem fins educativos e não substitui orientação profissional de saúde, diagnóstico ou tratamento.</p>
      </footer>
    </main>
  );
}
