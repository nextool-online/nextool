import Image from "next/image";
import type { Metadata } from "next";

const checkoutUrl = "https://pay.hotmart.com/SEU_CHECKOUT_AQUI";

export const metadata: Metadata = {
  title: "La Cucina Naturale di Nonna Pina — 50 ricette naturali della tradizione",
  description:
    "Ebook digitale in italiano con 50 ricette naturali della tradizione mediterranea: tisane, infusi, impacchi, bagni e rituali quotidiani.",
  robots: { index: false, follow: false },
};

const painPoints = [
  "Spendere soldi in prodotti diversi per ogni piccolo fastidio… e poi lasciarli dimenticati in un cassetto.",
  "Cercare rimedi online e trovare solo informazioni confuse, fredde, contraddittorie o scritte senza anima.",
  "Volere qualcosa di più naturale, ma senza perdere il buon senso e la semplicità della vita reale.",
  "Sentire la mancanza di quei consigli di casa: una tisana, un impacco, un bagno caldo, un gesto fatto al momento giusto.",
  "Amare la saggezza delle nonne italiane, ma volerla ordinata in un libro bello, pratico e sempre a portata di mano.",
];

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

const inside = [
  "50 ricette naturali spiegate passo dopo passo",
  "71 pagine visuali, eleganti e facili da consultare",
  "Tisane, infusi, impacchi, bagni, risciacqui e piccoli rituali quotidiani",
  "Ingredienti semplici della tradizione mediterranea",
  "Capitoli divisi per bisogno: digestione, sonno, gola, pelle, capelli, gambe, vitalità e altro",
  "PDF digitale da aprire subito su cellulare, tablet o computer",
];

const desireBullets = [
  "Apri il PDF, scegli il capitolo e trovi subito il rituale giusto.",
  "Niente ricerche infinite, niente caos, niente appunti sparsi.",
  "Un libro caldo, visivo e ordinato — bello da leggere e utile da tenere.",
  "Perfetto per chi ama la tradizione italiana e i rimedi semplici della cucina di casa.",
  "Prezzo di lancio pensato per entrare subito nella tua libreria digitale.",
  "Una piccola raccolta da consultare oggi, domani e ogni volta che serve un gesto semplice di cura.",
];

const faqs = [
  {
    q: "Come ricevo il libro?",
    a: "Subito dopo il pagamento su Hotmart ricevi l’accesso digitale per scaricare il PDF.",
  },
  {
    q: "Posso leggerlo dal cellulare?",
    a: "Sì. È un PDF digitale: puoi aprirlo su cellulare, tablet o computer.",
  },
  {
    q: "È in italiano?",
    a: "Sì. Il libro è stato creato in italiano, con tono semplice, caldo e tradizionale.",
  },
  {
    q: "Quante ricette contiene?",
    a: "Contiene 50 ricette naturali distribuite in 10 capitoli tematici.",
  },
  {
    q: "C’è garanzia?",
    a: "Sì. L’acquisto tramite Hotmart segue la garanzia di 7 giorni della piattaforma.",
  },
];

function CtaButton({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <a
      href={checkoutUrl}
      className={`inline-flex items-center justify-center rounded-full bg-[#e39a27] px-7 py-4 text-center text-base font-black text-white shadow-[0_18px_45px_rgba(227,154,39,.34)] transition hover:-translate-y-0.5 hover:bg-[#f0a934] md:text-lg ${className}`}
      rel="nofollow sponsored noopener noreferrer"
    >
      {children}
    </a>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="mb-3 text-center text-xs font-bold uppercase tracking-[0.36em] text-[#c98324]">{children}</p>;
}

export default function NonnaPinaSalesPage() {
  return (
    <main className="min-h-screen bg-[#fbf7ed] text-[#231f18]">
      <div className="bg-[#bc3a2d] px-4 py-2 text-center text-sm font-black text-[#fff1d5] md:text-base">
        ⚠️ Prezzo di lancio: solo 4,99€ — offerta temporanea
      </div>

      <section className="relative overflow-hidden bg-[#173b0d] px-5 py-14 text-center text-white md:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_5%,rgba(230,166,54,.20),transparent_34%),linear-gradient(180deg,rgba(0,0,0,.16),rgba(0,0,0,0))]" />
        <div className="relative mx-auto max-w-3xl">
          <p className="mb-5 text-xl italic text-[#e39a27]" style={{ fontFamily: "Georgia, serif" }}>
            Dalla cucina di Nonna Pina
          </p>
          <div className="mx-auto mb-8 w-52 rotate-[-2deg] rounded-2xl bg-[#fff6df] p-2 shadow-2xl md:w-64">
            <Image
              src="/nonna-pina/cover.webp"
              alt="Copertina dell’ebook La Cucina Naturale di Nonna Pina"
              width={420}
              height={594}
              priority
              className="h-auto w-full rounded-xl"
            />
          </div>
          <h1 className="mx-auto max-w-3xl text-4xl font-black leading-[0.98] md:text-6xl" style={{ fontFamily: "Georgia, serif" }}>
            50 ricette naturali che sembrano uscite dal quaderno segreto di una nonna italiana.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg italic leading-8 text-[#f5ead0] md:text-xl" style={{ fontFamily: "Georgia, serif" }}>
            Tisane, infusi, impacchi, bagni e rituali semplici per portare nella tua casa il calore della tradizione mediterranea.
          </p>
          <div className="mt-8">
            <CtaButton>🌿 Voglio il libro ora — 4,99€</CtaButton>
            <p className="mt-4 text-sm font-semibold text-[#d7c6a6]">Download immediato • PDF con 71 pagine • Garanzia 7 giorni</p>
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-16 md:py-20">
        <div className="mx-auto max-w-3xl">
          <SectionLabel>Il problema</SectionLabel>
          <h2 className="text-center text-3xl font-black text-[#214e16] md:text-4xl" style={{ fontFamily: "Georgia, serif" }}>
            La verità? Abbiamo dimenticato i rimedi semplici che una volta vivevano in ogni cucina.
          </h2>
          <div className="mt-10 divide-y divide-[#e6ddd0] rounded-2xl bg-white shadow-sm">
            {painPoints.map((item) => (
              <p key={item} className="flex gap-4 px-5 py-5 text-lg font-semibold leading-7 text-[#30271d] md:text-xl md:leading-8">
                <span className="mt-0.5 text-2xl font-black text-[#bc3a2d]">×</span>
                <span>{item}</span>
              </p>
            ))}
          </div>
          <div className="mt-10 rounded-xl bg-[#255716] p-7 text-center text-xl italic leading-9 text-white shadow-xl md:text-2xl" style={{ fontFamily: "Georgia, serif" }}>
            “Quando sai cosa preparare, bastano pochi ingredienti, un po’ di tempo… e la saggezza giusta.”
          </div>
        </div>
      </section>

      <section className="bg-[#f4ead2] px-5 py-16 md:py-24">
        <div className="mx-auto grid max-w-4xl items-center gap-10 md:grid-cols-[1.25fr_.75fr]">
          <div>
            <SectionLabel>Il libro</SectionLabel>
            <h2 className="text-3xl font-black text-[#214e16] md:text-4xl" style={{ fontFamily: "Georgia, serif" }}>
              Un piccolo tesoro digitale per chi ama i rimedi naturali, la cucina italiana e le cose fatte con calma.
            </h2>
            <div className="mt-7 space-y-5 text-lg leading-8 text-[#30271d]">
              <p>
                La Cucina Naturale di Nonna Pina raccoglie 50 preparazioni tradizionali in un formato bello, ordinato e immediato.
              </p>
              <p>
                Ogni pagina è pensata per essere consultata velocemente: ingredienti, preparazione, modo d’uso e piccole attenzioni pratiche.
              </p>
              <p className="font-black text-[#214e16]">
                Non è un manuale freddo. È un libro da tenere vicino, come quei quaderni di famiglia pieni di note, profumi e memoria.
              </p>
            </div>
          </div>
          <div className="rounded-[2rem] border-8 border-[#e39a27] bg-white p-3 shadow-xl">
            <Image
              src="/nonna-pina/sample-final.webp"
              alt="Pagina di esempio dell’ebook Nonna Pina"
              width={420}
              height={594}
              className="h-auto w-full rounded-[1.4rem]"
            />
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-16 md:py-24">
        <div className="mx-auto max-w-4xl">
          <SectionLabel>Dentro l’ebook</SectionLabel>
          <h2 className="text-center text-3xl font-black text-[#214e16] md:text-4xl" style={{ fontFamily: "Georgia, serif" }}>
            10 capitoli. 50 ricette. Un’unica raccolta ordinata.
          </h2>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {["sample-digestione.webp", "sample-relax.webp", "sample-respiratorio.webp"].map((img, index) => (
              <div key={img} className="rounded-2xl border border-[#eadfcf] bg-[#fffaf0] p-3 shadow-lg">
                <Image
                  src={`/nonna-pina/${img}`}
                  alt={`Pagina di esempio ${index + 1} dell’ebook Nonna Pina`}
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
                <p className="text-xs font-black uppercase tracking-[0.28em] text-[#c98324]">Capitolo {index + 1}</p>
                <h3 className="mt-2 text-xl font-black text-[#214e16]" style={{ fontFamily: "Georgia, serif" }}>
                  {chapter.title}
                </h3>
                <p className="mt-4 text-lg font-black text-[#bc3a2d]">
                  {chapter.count} {chapter.count === 1 ? "ricetta" : "ricette"}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f4ead2] px-5 py-16 md:py-20">
        <div className="mx-auto max-w-4xl">
          <SectionLabel>Perché lo vorrai</SectionLabel>
          <h2 className="text-center text-3xl font-black text-[#214e16] md:text-4xl" style={{ fontFamily: "Georgia, serif" }}>
            Non comprare un altro prodotto da dimenticare. Prendi il libro che ti dice cosa fare.
          </h2>
          <div className="mt-9 grid gap-4 md:grid-cols-2">
            {desireBullets.map((item) => (
              <div key={item} className="flex gap-3 rounded-xl bg-white p-5 shadow-sm">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded bg-[#46c878] text-base font-black text-white">✓</span>
                <p className="text-lg font-semibold leading-7 text-[#30271d]">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-16 md:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <SectionLabel>Offerta di lancio</SectionLabel>
          <h2 className="text-3xl font-black text-[#214e16] md:text-4xl" style={{ fontFamily: "Georgia, serif" }}>
            Oggi puoi aggiungere il quaderno di Nonna Pina alla tua libreria per meno di un caffè e un dolce.
          </h2>
          <div className="mt-10 rounded-3xl bg-[#255716] p-8 text-white shadow-2xl md:p-10">
            <p className="text-sm font-bold text-[#c8b99f] line-through">Prezzo futuro: 19,90€</p>
            <p className="mt-1 text-6xl font-black" style={{ fontFamily: "Georgia, serif" }}>4,99€</p>
            <p className="mt-2 text-base font-semibold text-[#e9ddc6]">Prezzo di lancio — disponibile per un periodo limitato</p>
            <ul className="mx-auto mt-8 max-w-xl space-y-3 text-left text-base font-semibold leading-7">
              {inside.map((item) => (
                <li key={item} className="border-t border-white/15 pt-3">✅ {item}</li>
              ))}
            </ul>
            <div className="mt-8">
              <CtaButton className="w-full max-w-md">🌿 Sì, voglio Nonna Pina a 4,99€</CtaButton>
            </div>
            <p className="mt-4 text-sm text-[#c8b99f]">Pagamento sicuro tramite Hotmart</p>
          </div>
        </div>
      </section>

      <section className="bg-[#f4ead2] px-5 py-16 md:py-20">
        <div className="mx-auto max-w-3xl rounded-2xl border border-[#e39a27] bg-[#fffaf0] p-8 text-center shadow-sm">
          <div className="text-4xl">🛡️</div>
          <h2 className="mt-3 text-2xl font-black text-[#214e16]" style={{ fontFamily: "Georgia, serif" }}>
            Garanzia 7 giorni
          </h2>
          <p className="mt-4 text-lg leading-8 text-[#30271d]">
            Lo provi senza rischio: se non fa per te, puoi richiedere il rimborso entro 7 giorni secondo le regole di Hotmart.
          </p>
        </div>
      </section>

      <section className="bg-white px-5 py-16 md:py-24">
        <div className="mx-auto max-w-3xl">
          <SectionLabel>Domande frequenti</SectionLabel>
          <h2 className="text-center text-3xl font-black text-[#214e16] md:text-4xl" style={{ fontFamily: "Georgia, serif" }}>
            Prima di prendere il libro
          </h2>
          <div className="mt-10 divide-y divide-[#e6ddd0] rounded-2xl border border-[#eee3d2] bg-[#fffaf0]">
            {faqs.map((faq) => (
              <details key={faq.q} className="group p-5 open:bg-white">
                <summary className="cursor-pointer list-none text-lg font-black text-[#214e16]">
                  <span className="mr-2 text-[#c98324]">?</span>
                  {faq.q}
                </summary>
                <p className="mt-3 text-base leading-7 text-[#51483d]">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#173b0d] px-5 py-16 text-center text-white md:py-24">
        <h2 className="mx-auto max-w-3xl text-3xl font-black md:text-5xl" style={{ fontFamily: "Georgia, serif" }}>
          Il sapere delle nonne non dovrebbe perdersi nel rumore di internet.
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-[#e6dcc8]">
          Portalo nella tua libreria oggi. 50 ricette naturali, ordinate e pronte da consultare quando vuoi.
        </p>
        <div className="mt-8">
          <CtaButton>🌿 Scarica il libro per 4,99€</CtaButton>
          <p className="mt-4 text-sm text-[#c8b99f]">Accesso immediato • Offerta di lancio • Garanzia 7 giorni</p>
        </div>
      </section>

      <footer className="bg-[#101010] px-5 py-8 text-center text-xs leading-6 text-[#8f8f8f]">
        <p>© 2026 Nonna Pina. Tutti i diritti riservati.</p>
        <p className="mt-2">Contenuto informativo e tradizionale. Non sostituisce il parere di un professionista qualificato.</p>
      </footer>
    </main>
  );
}
