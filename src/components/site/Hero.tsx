import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";
import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";
import hero4 from "@/assets/hero-4.jpg";

const slides = [
  { img: hero1, eyebrow: "Welcome to Kokstad College", title: "Shaping Tomorrow's Leaders", sub: "Kokstad College — Excellence in Education Since 1900", cta: "Apply Now", to: "/admissions" },
  { img: hero2, eyebrow: "Academic Excellence", title: "95%+ Matric Pass Rate", sub: "Consistently among the top schools in the Harry Gwala District", cta: "View Our Results", to: "/academics" },
  { img: hero3, eyebrow: "Our Community", title: "A Community of Achievers", sub: "521 learners. 29 dedicated educators. One proud college.", cta: "Meet Our School", to: "/about" },
  { img: hero4, eyebrow: "Admissions Open", title: "Enrol for 2027", sub: "Applications open 15 April 2026. Secure your child's future today.", cta: "Apply Online", to: "/admissions" },
];

export function Hero() {
  const [i, setI] = useState(0);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    timer.current = setTimeout(() => setI((p) => (p + 1) % slides.length), 5500);
    return () => { if (timer.current) clearTimeout(timer.current); };
  }, [i]);

  const go = (n: number) => setI((n + slides.length) % slides.length);

  return (
    <section className="relative h-[88vh] min-h-[560px] overflow-hidden">
      {slides.map((s, idx) => (
        <div
          key={idx}
          className={`absolute inset-0 transition-opacity duration-1000 ${idx === i ? "opacity-100" : "opacity-0"}`}
        >
          <img src={s.img} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-br from-navy/85 via-navy/60 to-navy/85" />
          <div className="absolute inset-0 grid place-items-center px-6">
            <div className={`max-w-4xl text-center text-white transition-all duration-700 delay-200 ${idx === i ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
              <p className="text-gold uppercase tracking-[0.4em] text-xs sm:text-sm mb-5">{s.eyebrow}</p>
              <h1 className="font-display font-bold text-4xl sm:text-6xl lg:text-7xl leading-tight">{s.title}</h1>
              <p className="mt-6 text-white/85 text-lg sm:text-xl max-w-2xl mx-auto">{s.sub}</p>
              <Link to={s.to} className="inline-block mt-8 bg-gold text-navy px-8 py-3.5 rounded-md font-semibold hover:brightness-110 transition shadow-xl">
                {s.cta}
              </Link>
            </div>
          </div>
        </div>
      ))}

      <button onClick={() => go(i - 1)} aria-label="Previous" className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 grid place-items-center rounded-full bg-white/10 hover:bg-gold hover:text-navy text-white backdrop-blur transition">
        <ChevronLeft />
      </button>
      <button onClick={() => go(i + 1)} aria-label="Next" className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 grid place-items-center rounded-full bg-white/10 hover:bg-gold hover:text-navy text-white backdrop-blur transition">
        <ChevronRight />
      </button>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => go(idx)}
            aria-label={`Slide ${idx + 1}`}
            className={`h-1.5 rounded-full transition-all ${idx === i ? "bg-gold w-10" : "bg-white/50 w-2.5 hover:bg-white"}`}
          />
        ))}
      </div>
    </section>
  );
}
