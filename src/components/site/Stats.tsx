import { useEffect, useRef, useState } from "react";

function useCount(target: number, run: boolean) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!run) return;
    const dur = 1600;
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min((t - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(eased * target));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, target]);
  return n;
}

function Stat({ value, suffix = "", label }: { value: number; suffix?: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => e.isIntersecting && setVis(true), { threshold: 0.4 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  const n = useCount(value, vis);
  return (
    <div ref={ref} className="text-center">
      <div className="font-display text-4xl md:text-5xl font-bold text-gold">{n.toLocaleString()}{suffix}</div>
      <div className="mt-2 text-white/80 text-sm uppercase tracking-widest">{label}</div>
    </div>
  );
}

export function Stats() {
  return (
    <section className="bg-navy py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
        <Stat value={521} label="Learners" />
        <Stat value={29} label="Educators" />
        <Stat value={95} suffix="%+" label="Matric Pass Rate" />
        <Stat value={1900} label="Established" />
      </div>
    </section>
  );
}
