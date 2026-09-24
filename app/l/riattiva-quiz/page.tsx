import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Riattiva Quiz Preview",
  description: "Quiz mobile IT for the Riattiva funnel.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <main style={{ margin: 0, minHeight: "100vh", background: "#05060a" }}>
      <iframe
        title="Riattiva Quiz Preview"
        src="/riattiva-quiz.html"
        style={{ border: 0, display: "block", width: "100%", height: "100vh", background: "#05060a" }}
        allow="clipboard-write"
      />
    </main>
  );
}
