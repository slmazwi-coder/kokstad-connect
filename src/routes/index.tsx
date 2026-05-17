import { createFileRoute, Link } from "@tanstack/react-router";
import { Hero } from "@/components/site/Hero";
import { Stats } from "@/components/site/Stats";
import { BookOpen, Trophy, Users, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/")({ component: Index });

const news = [
  {
    tag: "Academic",
    date: "12 May 2026",
    title: "Grade 12 Achieves 95% Pass Rate",
    excerpt:
      "Our matric class of 2024 continues Kokstad College's proud tradition of academic excellence.",
  },
  {
    tag: "Sport",
    date: "28 April 2026",
    title: "First XV Rugby Wins District Final",
    excerpt:
      "A thrilling victory at the Harry Gwala district rugby tournament cements our sporting reputation.",
  },
  {
    tag: "Events",
    date: "15 April 2026",
    title: "Applications for 2027 Now Open",
    excerpt:
      "Secure your child's place at Kokstad College. Forms available from the security gate.",
  },
];

function Index() {
  return (
    <div>
      <Hero />
      <Stats />

      {/* Welcome */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-5xl px-4 text-center">
          <p className="text-gold uppercase tracking-[0.3em] text-xs">Welcome</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-navy mt-4">
            A Proud Tradition of Excellence
          </h2>
          <div className="w-20 h-1 bg-gold mx-auto my-6" />
          <p className="text-lg text-muted-foreground leading-relaxed">
            Welcome to Kokstad College — a proud institution at the heart of the Kokstad community.
            Since our founding in 1900, we have been committed to developing well-rounded,
            academically excellent, and morally grounded young South Africans. We invite you to
            explore our school and join our family.
          </p>
          <p className="mt-6 font-display text-navy italic">— Mr. Brophy, Principal</p>
        </div>
      </section>

      {/* Feature cards */}
      <section className="pb-20">
        <div className="mx-auto max-w-7xl px-4 grid md:grid-cols-3 gap-6">
          {[
            {
              icon: BookOpen,
              title: "Academics",
              text: "A rigorous CAPS curriculum from Grade 8 to 12, with consistent matric results above 92%.",
              to: "/academics",
            },
            {
              icon: Trophy,
              title: "Sport & Culture",
              text: "Rugby, hockey, netball, cricket, athletics, soccer and a vibrant cultural programme.",
              to: "/about",
            },
            {
              icon: Users,
              title: "Community",
              text: "Over 120 years at the heart of East Griqualand, building leaders and citizens.",
              to: "/about",
            },
          ].map((f) => (
            <Link
              key={f.title}
              to={f.to}
              className="group bg-card border border-border rounded-xl p-8 hover:shadow-2xl hover:-translate-y-1 transition-all"
            >
              <div className="w-14 h-14 rounded-lg gradient-navy grid place-items-center text-gold mb-5">
                <f.icon size={26} />
              </div>
              <h3 className="font-display text-2xl text-navy">{f.title}</h3>
              <p className="mt-3 text-muted-foreground">{f.text}</p>
              <div className="mt-5 text-navy font-medium text-sm flex items-center gap-2 group-hover:gap-3 transition-all">
                Learn more <ArrowRight size={16} />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Latest news */}
      <section className="py-20 bg-secondary">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex items-end justify-between mb-10 gap-4 flex-wrap">
            <div>
              <p className="text-gold uppercase tracking-[0.3em] text-xs">News</p>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-navy mt-2">
                Latest from the College
              </h2>
            </div>
            <Link
              to="/news"
              className="text-navy font-semibold hover:text-gold transition flex items-center gap-2"
            >
              View all <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {news.map((n) => (
              <article
                key={n.title}
                className="bg-card rounded-xl overflow-hidden border border-border hover:shadow-xl transition group"
              >
                <div className="h-44 gradient-navy relative">
                  <span className="absolute top-4 left-4 bg-gold text-navy text-xs font-semibold px-3 py-1 rounded">
                    {n.tag}
                  </span>
                </div>
                <div className="p-6">
                  <p className="text-xs text-muted-foreground">{n.date}</p>
                  <h3 className="font-display text-xl text-navy mt-2 group-hover:text-gold transition">
                    {n.title}
                  </h3>
                  <p className="mt-3 text-sm text-muted-foreground">{n.excerpt}</p>
                  <Link
                    to="/news"
                    className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-navy hover:text-gold"
                  >
                    Read more <ArrowRight size={14} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="gradient-navy py-20">
        <div className="mx-auto max-w-4xl px-4 text-center text-white">
          <h2 className="font-display text-4xl md:text-5xl font-bold">
            Ready to Join Kokstad College?
          </h2>
          <p className="mt-4 text-white/80 text-lg">
            Applications for 2027 open 15 April 2026. Begin your child's journey today.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              to="/admissions"
              className="bg-gold text-navy px-8 py-3.5 rounded-md font-semibold hover:brightness-110 transition shadow-xl"
            >
              Apply Online
            </Link>
            <Link
              to="/contact"
              className="border-2 border-white/70 text-white px-8 py-3.5 rounded-md font-semibold hover:bg-white hover:text-navy transition"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
