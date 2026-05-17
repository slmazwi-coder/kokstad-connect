import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";
import { useState } from "react";
import { X } from "lucide-react";
import hockey from "@/assets/gallery-hockey.jpg";
import netball from "@/assets/gallery-netball.jpg";
import assembly from "@/assets/gallery-assembly.jpg";
import caps from "@/assets/gallery-caps.jpg";
import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";
import hero4 from "@/assets/hero-4.jpg";

export const Route = createFileRoute("/gallery")({
  component: Gallery,
  head: () => ({ meta: [{ title: "Gallery — Kokstad College" }, { name: "description", content: "Photos from school events, sport, and community life at Kokstad College." }] }),
});

const albums = [
  { title: "Sport 2025", photos: [hockey, netball, hero3] },
  { title: "School Life", photos: [assembly, hero1, hero2] },
  { title: "Awards & Achievements", photos: [caps, hero4, hero3] },
];

function Gallery() {
  const [open, setOpen] = useState<string | null>(null);
  return (
    <div>
      <PageHeader eyebrow="Moments" title="Gallery" subtitle="Glimpses of life and learning at Kokstad College." />

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 space-y-14">
          {albums.map((a) => (
            <div key={a.title}>
              <h2 className="font-display text-2xl text-navy mb-5">{a.title}</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {a.photos.map((p, i) => (
                  <button key={i} onClick={() => setOpen(p)} className="aspect-[4/3] overflow-hidden rounded-xl group">
                    <img src={p} alt="" className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {open && (
        <div className="fixed inset-0 z-50 bg-black/90 grid place-items-center p-4" onClick={() => setOpen(null)}>
          <button className="absolute top-5 right-5 text-white p-2" aria-label="Close"><X /></button>
          <img src={open} alt="" className="max-h-[90vh] max-w-full rounded-lg" />
        </div>
      )}
    </div>
  );
}
