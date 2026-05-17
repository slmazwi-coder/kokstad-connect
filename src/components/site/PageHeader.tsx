export function PageHeader({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <section className="gradient-navy text-white pt-32 pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {eyebrow && <p className="text-gold uppercase tracking-[0.3em] text-xs mb-3">{eyebrow}</p>}
        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold">{title}</h1>
        {subtitle && <p className="mt-4 text-white/80 max-w-2xl text-lg">{subtitle}</p>}
      </div>
    </section>
  );
}
