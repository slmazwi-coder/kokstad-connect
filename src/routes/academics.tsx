import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";
import { GraduationCap, BookMarked, Trophy } from "lucide-react";

export const Route = createFileRoute("/academics")({
  component: Academics,
  head: () => ({ meta: [{ title: "Academics — Kokstad College" }, { name: "description", content: "CAPS curriculum from Grade 8 to 12, with a consistent 92%+ matric pass rate." }] }),
});

const results = [
  { year: "2021", pct: 97.8 },
  { year: "2022", pct: 96.1 },
  { year: "2023", pct: 95.3 },
  { year: "2024", pct: 92.3 },
];

function Academics() {
  const max = Math.max(...results.map((r) => r.pct));
  return (
    <div>
      <PageHeader eyebrow="Learning" title="Academics" subtitle="A rigorous CAPS curriculum delivered by 29 dedicated educators." />

      <section className="py-16">
        <div className="mx-auto max-w-5xl px-4">
          <p className="text-gold uppercase tracking-[0.3em] text-xs">Curriculum</p>
          <h2 className="font-display text-3xl text-navy mt-3">Curriculum Overview</h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Kokstad College follows the National Curriculum Statement (CAPS) as prescribed by
            the Department of Basic Education, with a strong emphasis on academic excellence,
            critical thinking, and the development of every learner.
          </p>
        </div>
      </section>

      <section className="pb-16">
        <div className="mx-auto max-w-6xl px-4 grid md:grid-cols-2 gap-6">
          <div className="bg-card border rounded-xl p-8">
            <GraduationCap className="text-gold mb-4" size={32} />
            <h3 className="font-display text-2xl text-navy">Senior Phase (Grade 8–9)</h3>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              {["Home Language", "First Additional Language", "Mathematics", "Natural Sciences", "Technology", "Social Sciences", "Economic Management Sciences", "Life Orientation", "Creative Arts"].map((s) => (
                <li key={s} className="flex gap-2"><span className="text-gold">•</span>{s}</li>
              ))}
            </ul>
          </div>
          <div className="bg-card border rounded-xl p-8">
            <BookMarked className="text-gold mb-4" size={32} />
            <h3 className="font-display text-2xl text-navy">FET Phase (Grade 10–12)</h3>
            <p className="mt-3 text-sm font-semibold text-navy">Compulsory</p>
            <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
              <li>Home Language · First Additional Language · Life Orientation · Mathematics or Mathematical Literacy</li>
            </ul>
            <p className="mt-4 text-sm font-semibold text-navy">Electives</p>
            <ul className="mt-2 grid grid-cols-2 gap-y-1 text-sm text-muted-foreground">
              {["Accounting", "History", "Geography", "Agricultural Sciences", "Economics", "Business Studies"].map((s) => (
                <li key={s} className="flex gap-2"><span className="text-gold">•</span>{s}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="py-16 bg-secondary">
        <div className="mx-auto max-w-5xl px-4">
          <div className="text-center mb-10">
            <Trophy className="text-gold mx-auto" size={36} />
            <h2 className="font-display text-3xl md:text-4xl text-navy mt-3">Matric Results Track Record</h2>
            <p className="mt-2 text-muted-foreground">Consistent excellence year after year.</p>
          </div>
          <div className="bg-card rounded-xl p-8 border">
            <div className="space-y-5">
              {results.map((r) => (
                <div key={r.year}>
                  <div className="flex justify-between text-sm font-semibold text-navy mb-2">
                    <span>{r.year}</span>
                    <span>{r.pct}%</span>
                  </div>
                  <div className="h-3 bg-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full gradient-navy rounded-full transition-all duration-1000"
                      style={{ width: `${(r.pct / max) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4 grid md:grid-cols-2 gap-6">
          <div className="bg-card border rounded-xl p-8">
            <h3 className="font-display text-2xl text-navy">Extra-Mural Activities</h3>
            <p className="mt-3 text-sm font-semibold text-navy">Sports</p>
            <p className="text-muted-foreground text-sm">Rugby · Cricket · Hockey · Soccer · Athletics · Netball</p>
            <p className="mt-4 text-sm font-semibold text-navy">Cultural</p>
            <p className="text-muted-foreground text-sm">Choir · Drama · Public Speaking · Debating</p>
          </div>
          <div className="bg-card border rounded-xl p-8">
            <h3 className="font-display text-2xl text-navy">Academic Support</h3>
            <p className="mt-3 text-muted-foreground text-sm">
              Subject-specific tutoring, after-school study sessions and matric examination preparation
              programmes ensure every learner reaches their full potential.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
