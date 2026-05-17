import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "@/assets/logo.jpg";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/academics", label: "Academics" },
  { to: "/admissions", label: "Admissions" },
  { to: "/fees", label: "Fees & Payments" },
  { to: "/news", label: "News & Events" },
  { to: "/gallery", label: "Gallery" },
  { to: "/contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-navy/95 backdrop-blur shadow-lg" : "bg-navy/80 backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="Kokstad College crest" className="h-12 w-12 object-contain rounded bg-white p-0.5" />
            <div className="hidden sm:block">
              <div className="text-white font-display font-bold text-lg leading-tight">Kokstad College</div>
              <div className="text-gold text-[10px] uppercase tracking-widest">Consiste Fide · Est. 1900</div>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="text-white/85 hover:text-gold px-3 py-2 text-sm font-medium transition-colors"
                activeProps={{ className: "text-gold px-3 py-2 text-sm font-medium" }}
              >
                {l.label}
              </Link>
            ))}
            <Link
              to="/admissions"
              className="ml-3 bg-gold text-navy px-5 py-2.5 rounded-md font-semibold text-sm hover:brightness-110 transition"
            >
              Apply Now
            </Link>
          </nav>

          <button
            className="lg:hidden text-white p-2"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {open && (
          <div className="lg:hidden pb-4 border-t border-white/10 pt-4">
            <nav className="flex flex-col gap-1">
              {links.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="text-white/90 hover:text-gold hover:bg-white/5 px-3 py-2 rounded text-sm"
                >
                  {l.label}
                </Link>
              ))}
              <Link
                to="/admissions"
                onClick={() => setOpen(false)}
                className="mt-2 bg-gold text-navy px-4 py-2.5 rounded font-semibold text-sm text-center"
              >
                Apply Now
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
