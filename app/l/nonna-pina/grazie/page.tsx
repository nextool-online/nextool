import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Grazie — La Cucina Naturale di Nonna Pina",
  description: "Pagina di conferma acquisto per La Cucina Naturale di Nonna Pina.",
  robots: { index: false, follow: false },
};

const steps = [
  {
    number: "01",
    title: "Controlla la tua email",
    text: "Hotmart ti invierà il messaggio con i dati di accesso e il link per scaricare il tuo ebook digitale.",
  },
  {
    number: "02",
    title: "Apri l’area acquisti Hotmart",
    text: "Se non trovi subito l’email, entra nella tua area Hotmart con lo stesso indirizzo usato durante l’acquisto.",
  },
  {
    number: "03",
    title: "Salva il PDF sul tuo dispositivo",
    text: "Scarica il libro e tienilo a portata di mano su cellulare, tablet o computer per consultarlo quando vuoi.",
  },
];

const reminders = [
  "Controlla anche la cartella spam, promozioni o posta indesiderata.",
  "Usa la stessa email inserita al momento del pagamento.",
  "Il rilascio dell’accesso può richiedere qualche minuto in base al metodo di pagamento.",
];

export default function NonnaPinaThankYouPage() {
  return (
    <main className="min-h-screen bg-[#fbf7ed] text-[#231f18]">
      <section className="relative overflow-hidden bg-[#173b0d] px-5 py-16 text-center text-white md:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_5%,rgba(230,166,54,.22),transparent_36%),linear-gradient(180deg,rgba(0,0,0,.18),rgba(0,0,0,0))]" />
        <div className="relative mx-auto max-w-3xl">
          <p className="mb-4 text-xl italic text-[#e39a27]" style={{ fontFamily: "Georgia, serif" }}>
            Grazie di cuore
          </p>
          <h1 className="mx-auto max-w-3xl text-4xl font-black leading-[1.02] md:text-6xl" style={{ fontFamily: "Georgia, serif" }}>
            Il tuo acquisto è stato approvato.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg italic leading-8 text-[#f5ead0] md:text-xl" style={{ fontFamily: "Georgia, serif" }}>
            La Cucina Naturale di Nonna Pina sta per arrivare nella tua libreria digitale. Segui i passaggi qui sotto per accedere al PDF.
          </p>

          <div className="mx-auto mt-10 w-48 rotate-[-2deg] rounded-2xl bg-[#fff6df] p-2 shadow-2xl md:w-60">
            <Image
              src="/nonna-pina/cover.webp"
              alt="Copertina dell’ebook La Cucina Naturale di Nonna Pina"
              width={420}
              height={594}
              priority
              className="h-auto w-full rounded-xl"
            />
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-16 md:py-20">
        <div className="mx-auto max-w-4xl">
          <p className="mb-3 text-center text-xs font-bold uppercase tracking-[0.36em] text-[#c98324]">
            Prossimi passi
          </p>
          <h2 className="text-center text-3xl font-black text-[#214e16] md:text-4xl" style={{ fontFamily: "Georgia, serif" }}>
            Come accedere al tuo ebook
          </h2>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {steps.map((step) => (
              <div key={step.number} className="rounded-2xl border border-[#eadfcf] bg-[#fffaf0] p-6 shadow-sm">
                <p className="text-sm font-black tracking-[0.24em] text-[#c98324]">{step.number}</p>
                <h3 className="mt-3 text-2xl font-black text-[#214e16]" style={{ fontFamily: "Georgia, serif" }}>
                  {step.title}
                </h3>
                <p className="mt-4 text-base font-semibold leading-7 text-[#30271d]">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f4ead2] px-5 py-16 md:py-20">
        <div className="mx-auto max-w-3xl rounded-3xl bg-[#255716] p-8 text-white shadow-2xl md:p-10">
          <h2 className="text-center text-3xl font-black md:text-4xl" style={{ fontFamily: "Georgia, serif" }}>
            Non trovi l’accesso?
          </h2>
          <ul className="mt-8 space-y-4 text-lg font-semibold leading-8">
            {reminders.map((item) => (
              <li key={item} className="border-t border-white/15 pt-4">✅ {item}</li>
            ))}
          </ul>
          <p className="mt-8 rounded-2xl bg-white/10 p-5 text-center text-base leading-7 text-[#f5ead0]">
            Se il pagamento è appena stato approvato, attendi qualche minuto: Hotmart può impiegare un breve tempo per inviare tutte le informazioni di accesso.
          </p>
        </div>
      </section>

      <section className="bg-white px-5 py-16 text-center md:py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl font-black text-[#214e16] md:text-4xl" style={{ fontFamily: "Georgia, serif" }}>
            Buona lettura — e benvenuta nella cucina di Nonna Pina.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-[#51483d]">
            Tieni il libro vicino. Aprilo con calma. Scegli il capitolo giusto e lascia che i piccoli rituali della tradizione tornino nella tua giornata.
          </p>
          <Link
            href="/l/nonna-pina"
            className="mt-8 inline-flex items-center justify-center rounded-full border-2 border-[#255716] px-7 py-4 text-base font-black text-[#255716] transition hover:bg-[#255716] hover:text-white"
          >
            Tornare alla pagina del libro
          </Link>
        </div>
      </section>

      <footer className="bg-[#101010] px-5 py-8 text-center text-xs leading-6 text-[#8f8f8f]">
        <p>© 2026 Nonna Pina. Tutti i diritti riservati.</p>
        <p className="mt-2">Pagina riservata ai clienti dopo l’approvazione dell’acquisto.</p>
      </footer>
    </main>
  );
}
