import Image from "next/image";
import type { Metadata } from "next";

import HotmartAttribution from "@/components/nonna-pina/HotmartAttribution";

const checkoutUrl = "https://pay.hotmart.com/C107995869L?checkoutMode=10";

export const metadata: Metadata = {
  title: "La Cucina Naturale di Nonna Pina — 50 ricette naturali della tradizione",
  description:
    "Ritrova il piacere dei piccoli rituali di casa: 50 ricette naturali in un ebook digitale, ordinato e facile da consultare.",
  robots: { index: false, follow: false },
};

const chapters = [
  { title: "Digestione, gonfiore e intestino", count: 8 },
  { title: "Sonno, tensione e relax", count: 5 },
  { title: "Gola, tosse e vie respiratorie", count: 5 },
  { title: "Pelle, acne e irritazioni leggere", count: 5 },
  { title: "Capelli e cuoio capelluto", count: 5 },
  { title: "Muscoli, articolazioni e sollievo quotidiano", count: 5 },
  { title: "Circolazione, gambe leggere e drenaggio", count: 4 },
  { title: "Vitalità e rituali quotidiani", count: 4 },
  { title: "Bocca, gola e mucose", count: 4 },
  { title: "Metabolismo, cuore e benessere quotidiano", count: 5 },
];

const faqs = [
  {
    q: "Come ricevo il libro?",
    a: "Dopo il pagamento, Hotmart invia via email le istruzioni per accedere al tuo acquisto digitale e scaricare il PDF.",
  },
  {
    q: "Posso leggerlo dal cellulare?",
    a: "Sì. Puoi aprire il PDF su cellulare, tablet o computer.",
  },
  {
    q: "Quante ricette contiene?",
    a: "50 ricette distribuite in 10 capitoli tematici, in 71 pagine visuali.",
  },
  {
    q: "C’è una garanzia?",
    a: "L’acquisto tramite Hotmart è coperto dalla garanzia di 7 giorni prevista dalla piattaforma.",
  },
];

function CtaButton({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <a
      href={checkoutUrl}
      className={`inline-flex min-h-14 items-center justify-center rounded-full border-2 border-[#ffd786] bg-[#f2a51f] px-8 py-5 text-center text-xl font-black text-[#173b0d] shadow-[0_0_0_5px_rgba(242,165,31,.18),0_14px_36px_rgba(0,0,0,.34)] transition hover:-translate-y-1 hover:bg-[#ffc04a] focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[#f2a51f] md:text-2xl ${className}`}
      rel="nofollow sponsored noopener noreferrer"
    >
      {children}
    </a>
  );
}

export default function NonnaPinaSalesPage() {
  return (
    <main className="min-h-screen bg-[#fbf7ed] text-[#231f18]">
      <HotmartAttribution />
      <div className="bg-[#bc3a2d] px-4 py-2 text-center text-sm font-black text-[#fff1d5] md:text-base">
        Prezzo speciale di lancio: 4,99€
      </div>

      <section className="relative overflow-hidden bg-[#173b0d] px-5 py-10 text-center text-white md:py-16">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_5%,rgba(230,166,54,.20),transparent_34%),linear-gradient(180deg,rgba(0,0,0,.16),rgba(0,0,0,0))]" />
        <div className="relative mx-auto max-w-3xl">
          <p className="mb-4 text-sm font-black uppercase tracking-[0.28em] text-[#e39a27] md:text-base">
            Un piccolo tesoro dalla cucina di Nonna Pina
          </p>
          <h1 className="mx-auto max-w-2xl text-3xl font-black leading-[1.08] md:text-4xl" style={{ fontFamily: "Georgia, serif" }}>
            50 ricette naturali segrete di una nonna italiana.
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-sm font-semibold leading-6 text-[#f5ead0] md:text-base md:leading-7">
            Apri il quaderno. Trova la ricetta giusta. Riporta in cucina i gesti semplici della tradizione.
          </p>

          <div className="mx-auto mt-7 w-48 rotate-[-2deg] rounded-2xl bg-[#fff6df] p-2 shadow-2xl md:w-56">
            <Image
              src="/nonna-pina/cover.webp"
              alt="Copertina dell’ebook La Cucina Naturale di Nonna Pina"
              width={420}
              height={594}
              priority
              className="h-auto w-full rounded-xl"
            />
          </div>

          <div className="mt-7">
            <CtaButton className="w-full max-w-md text-2xl md:text-3xl">Sì, voglio! — 4,99€</CtaButton>
            <p className="mx-auto mt-3 max-w-md text-sm font-semibold leading-6 text-[#d7c6a6]">
              50 ricette · 10 capitoli · 71 pagine · Garanzia Hotmart di 7 giorni
            </p>
          </div>
        </div>
      </section>

      <section className="px-5 py-12 md:py-16">
        <div className="mx-auto max-w-4xl">
          <p className="text-center text-xs font-bold uppercase tracking-[0.34em] text-[#c98324]">Immagina di avere tutto in un solo posto</p>
          <h2 className="mx-auto mt-3 max-w-3xl text-center text-2xl font-black leading-tight text-[#214e16] md:text-3xl" style={{ fontFamily: "Georgia, serif" }}>
            Niente più ricerche confuse. Apri il capitolo, trova l’idea giusta e porta un po’ di tradizione nella tua giornata.
          </h2>
          <div className="mt-7 grid gap-3 md:grid-cols-3">
            {[
              "Ricette ordinate per tema, facili da ritrovare quando ti servono.",
              "Ingredienti semplici e rituali ispirati alla tradizione mediterranea.",
              "Un ebook visuale da consultare con calma, dal telefono o dal computer.",
            ].map((item) => (
              <div key={item} className="rounded-2xl border border-[#eadfcf] bg-white p-5 text-center text-base font-bold leading-7 text-[#30271d] shadow-sm">
                <span className="mb-2 block text-2xl text-[#2d7220]">✓</span>
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f4ead2] px-5 py-12 md:py-16">
        <div className="mx-auto grid max-w-4xl items-center gap-8 md:grid-cols-[1fr_1fr]">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.34em] text-[#c98324]">Dentro il quaderno</p>
            <h2 className="mt-3 text-3xl font-black leading-tight text-[#214e16] md:text-4xl" style={{ fontFamily: "Georgia, serif" }}>
              10 capitoli. 50 ricette. Tutto ritrovabile in pochi secondi.
            </h2>
            <p className="mt-4 text-base leading-7 text-justify text-[#51483d]">
              Dalla digestione al relax, dalla pelle alla vitalità: scegli l’argomento e consulta una raccolta pensata per accompagnarti nella vita di tutti i giorni.
            </p>
            <div className="mt-5 grid gap-2 sm:grid-cols-2">
              {chapters.map((chapter) => (
                <div key={chapter.title} className="flex min-h-14 items-center justify-between gap-3 rounded-xl border border-[#e7d8b8] bg-[#fffaf0] px-3 py-2.5 shadow-sm">
                  <span className="flex-1 text-sm font-bold leading-5 text-[#214e16]">{chapter.title}</span>
                  <span className="shrink-0 rounded-full bg-[#255716] px-2.5 py-1 text-xs font-black text-white">
                    {chapter.count} {chapter.count === 1 ? "ricetta" : "ricette"}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="mx-auto w-full max-w-xs rounded-[2rem] border-8 border-[#e39a27] bg-white p-3 shadow-xl">
            <Image
              src="/nonna-pina/sample-respiratorio.webp"
              alt="Ricetta illustrata della tisana al timo nell’ebook Nonna Pina"
              width={420}
              height={594}
              className="h-auto w-full rounded-[1.4rem]"
            />
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-12 md:py-16">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.34em] text-[#c98324]">Il prezzo speciale di lancio</p>
          <h2 className="mx-auto mt-3 max-w-2xl text-3xl font-black leading-tight text-[#214e16] md:text-4xl" style={{ fontFamily: "Georgia, serif" }}>
            Porta oggi a casa il quaderno di Nonna Pina.
          </h2>
          <div className="mt-7 rounded-3xl bg-[#255716] p-7 text-white shadow-2xl md:p-9">
            <p className="text-sm font-bold text-[#e9ddc6]">50 ricette · 10 capitoli · ebook digitale</p>
            <p className="mt-1 text-6xl font-black" style={{ fontFamily: "Georgia, serif" }}>4,99€</p>
            <p className="mt-1 text-sm font-semibold text-[#e9ddc6]">Prezzo speciale di lancio, finché l’offerta è attiva</p>
            <CtaButton className="mt-6 w-full max-w-md">Sì, voglio!</CtaButton>
            <p className="mt-3 text-sm text-[#d7c6a6]">Pagamento sicuro tramite Hotmart · Garanzia di 7 giorni</p>
          </div>
        </div>
      </section>

      <section className="bg-[#fbf7ed] px-5 py-10">
        <div className="mx-auto max-w-3xl divide-y divide-[#e6ddd0] rounded-2xl border border-[#eee3d2] bg-white">
          {faqs.map((faq) => (
            <details key={faq.q} className="group p-5 open:bg-[#fffaf0]">
              <summary className="cursor-pointer list-none text-base font-black text-[#214e16]">
                <span className="mr-2 text-[#c98324]">+</span>{faq.q}
              </summary>
              <p className="mt-3 text-sm leading-6 text-[#51483d]">{faq.a}</p>
            </details>
          ))}
        </div>
      </section>

      <footer className="bg-[#101010] px-5 py-6 text-center text-xs leading-6 text-[#8f8f8f]">
        <p>© 2026 Nonna Pina. Tutti i diritti riservati.</p>
        <p className="mt-2">Contenuto informativo e tradizionale. Non sostituisce il parere di un professionista qualificato.</p>
      </footer>
    </main>
  );
}
