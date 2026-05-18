import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";
import { Award, Heart, Shield, Target, Users } from "lucide-react";

export const Route = createFileRoute("/about")({
  component: About,
  head: () => ({
    meta: [
      { title: "About — Kokstad College" },
      {
        name: "description",
        content:
          "Founded in 1900, Kokstad College has served the East Griqualand community with academic excellence for over 120 years.",
      },
    ],
  }),
});

function About() {
  return (
    <div>
      <PageHeader
        eyebrow="About Us"
        title="Our Story"
        subtitle="Over 120 years of academic excellence at the heart of East Griqualand."
      />

      <section className="py-20">
        <div className="mx-auto max-w-5xl px-4 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-gold uppercase tracking-[0.3em] text-xs">Our History</p>
            <h2 className="font-display text-3xl md:text-4xl text-navy mt-3">Founded in 1900</h2>
            <div className="w-16 h-1 bg-gold my-5" />
            <p className="text-muted-foreground leading-relaxed">
              Kokstad College has served the East Griqualand community for over 120 years. From
              humble beginnings, the school has grown into one of the leading public secondary
              institutions in the Harry Gwala District, with a proud heritage of producing graduates
              who go on to make meaningful contributions across South Africa and beyond.
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Today we are home to 521 learners and 29 dedicated educators, guided by our motto
              <em className="text-navy font-semibold"> Consiste Fide</em> — "Stand firm in faith."
            </p>
          </div>
          <div className="aspect-[4/5] rounded-xl gradient-navy grid place-items-center text-white/40 text-sm">
            principal-photo.jpg
          </div>
        </div>
      </section>

      <section className="py-20 bg-secondary">
        <div className="mx-auto max-w-5xl px-4">
          <div className="text-center mb-12">
            <p className="text-gold uppercase tracking-[0.3em] text-xs">Principal's Message</p>
            <h2 className="font-display text-3xl md:text-4xl text-navy mt-3">
              A Word from Mr. Brophy
            </h2>
          </div>
          <blockquote className="bg-card border-l-4 border-gold p-8 rounded-lg shadow-sm italic text-lg text-foreground/80 leading-relaxed">
            "At Kokstad College, we believe every learner carries the potential to lead, to serve,
            and to shape our nation's future. Our role as educators is to nurture that potential
            through discipline, opportunity, and unwavering support. I welcome you warmly to our
            school community."
            <footer className="mt-6 not-italic text-sm text-navy font-semibold">
              — Mr. Brophy, Principal
            </footer>
          </blockquote>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4 grid md:grid-cols-2 gap-8">
          <div className="bg-card p-8 rounded-xl border-t-4 border-gold shadow-sm">
            <Target className="text-navy mb-4" size={32} />
            <h3 className="font-display text-2xl text-navy">Our Mission</h3>
            <p className="mt-3 text-muted-foreground">
              To provide quality education that develops each learner intellectually, socially,
              morally and physically.
            </p>
          </div>
          <div className="bg-card p-8 rounded-xl border-t-4 border-gold shadow-sm">
            <Award className="text-navy mb-4" size={32} />
            <h3 className="font-display text-2xl text-navy">Our Vision</h3>
            <p className="mt-3 text-muted-foreground">
              To be the leading public school in the Harry Gwala District, producing well-rounded
              graduates prepared for higher education and productive citizenship.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 gradient-navy text-white">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="font-display text-3xl md:text-4xl text-center">Our Values</h2>
          <div className="w-16 h-1 bg-gold mx-auto my-6" />
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mt-10">
            {[
              { i: Award, t: "Excellence" },
              { i: Shield, t: "Integrity" },
              { i: Heart, t: "Respect" },
              { i: Users, t: "Community" },
              { i: Target, t: "Accountability" },
            ].map((v) => (
              <div key={v.t} className="text-center">
                <div className="w-16 h-16 rounded-full bg-white/10 grid place-items-center mx-auto text-gold">
                  <v.i size={28} />
                </div>
                <p className="mt-3 font-display text-lg">{v.t}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center mb-10">
            <p className="text-gold uppercase tracking-[0.3em] text-xs">Leadership</p>
            <h2 className="font-display text-3xl md:text-4xl text-navy mt-3">Our Staff</h2>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: "Mr. Brophy", role: "Principal" },
              { name: "Deputy Principal", role: "Academics" },
              { name: "Deputy Principal", role: "Sport & Culture" },
              { name: "HOD", role: "FET Phase" },
            ].map((s) => (
              <div key={s.role} className="bg-card border rounded-xl overflow-hidden text-center">
                <div className="aspect-square gradient-navy grid place-items-center text-white/40 text-xs">
                  staff-photo.jpg
                </div>
                <div className="p-4">
                  <p className="font-display text-lg text-navy">{s.name}</p>
                  <p className="text-sm text-muted-foreground">{s.role}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-muted-foreground mt-8">
            Full staff directory and SGB profiles to be added.
          </p>
        </div>
      </section>
    </div>
  );
}
