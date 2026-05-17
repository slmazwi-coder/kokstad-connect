import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";
import { useState } from "react";
import { Calendar } from "lucide-react";

export const Route = createFileRoute("/news")({
  component: News,
  head: () => ({ meta: [{ title: "News & Events — Kokstad College" }, { name: "description", content: "Latest news, achievements, and upcoming events at Kokstad College." }] }),
});

const items = [
  { tag: "Academic", date: "12 May 2026", title: "Grade 12 Achieves 95% Pass Rate", excerpt: "Our matric class of 2024 continues Kokstad College's proud tradition." },
  { tag: "Sport", date: "28 April 2026", title: "First XV Rugby Wins District Final", excerpt: "A thrilling victory at the Harry Gwala district tournament." },
  { tag: "Events", date: "15 April 2026", title: "Applications for 2027 Now Open", excerpt: "Secure your child's place at Kokstad College." },
  { tag: "Sport", date: "02 April 2026", title: "Netball Team Tours the Western Cape", excerpt: "Our senior netball team competes in a five-day fixture." },
  { tag: "Academic", date: "20 March 2026", title: "Science Olympiad Top 10", excerpt: "Three Grade 11 learners place in the provincial top 10." },
  { tag: "General", date: "01 March 2026", title: "New Multi-Purpose Hall Opens", excerpt: "The college welcomes a new state-of-the-art sports facility." },
];

const events = [
  { date: "20 Jun 2026", name: "Founders' Day Assembly", desc: "Celebrating 126 years of Kokstad College." },
  { date: "12 Jul 2026", name: "Inter-House Athletics", desc: "Annual athletics competition on the main field." },
  { date: "31 Aug 2026", name: "Applications Close", desc: "Final day for 2027 admissions." },
];

const cats = ["All", "Academic", "Sport", "Events", "General"];

function News() {
  const [c, setC] = useState("All");
  const filtered = c === "All" ? items : items.filter((i) => i.tag === c);
  return (
    <div>
      <PageHeader eyebrow="What's Happening" title="News & Events" subtitle="Stories of achievement, community, and milestones." />

      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex flex-wrap gap-2 mb-8">
            {cats.map((x) => (
              <button key={x} onClick={() => setC(x)} className={`px-4 py-2 rounded-full text-sm font-medium transition ${c === x ? "bg-navy text-white" : "bg-secondary text-navy hover:bg-navy hover:text-white"}`}>{x}</button>
            ))}
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((n) => (
              <article key={n.title} className="bg-card rounded-xl overflow-hidden border hover:shadow-xl transition group">
                <div className="h-44 gradient-navy relative">
                  <span className="absolute top-4 left-4 bg-gold text-navy text-xs font-semibold px-3 py-1 rounded">{n.tag}</span>
                </div>
                <div className="p-6">
                  <p className="text-xs text-muted-foreground">{n.date}</p>
                  <h3 className="font-display text-xl text-navy mt-2 group-hover:text-gold transition">{n.title}</h3>
                  <p className="mt-3 text-sm text-muted-foreground">{n.excerpt}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-secondary">
        <div className="mx-auto max-w-4xl px-4">
          <div className="flex items-center gap-3 mb-6">
            <Calendar className="text-gold" />
            <h2 className="font-display text-2xl text-navy">Upcoming Events</h2>
          </div>
          <div className="space-y-3">
            {events.map((e) => (
              <div key={e.name} className="bg-card border rounded-lg p-5 flex items-center gap-5">
                <div className="text-center min-w-20">
                  <p className="font-display text-sm text-gold uppercase tracking-wider">{e.date.split(" ")[1]}</p>
                  <p className="font-display text-2xl text-navy font-bold">{e.date.split(" ")[0]}</p>
                </div>
                <div className="border-l pl-5">
                  <p className="font-semibold text-navy">{e.name}</p>
                  <p className="text-sm text-muted-foreground">{e.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
