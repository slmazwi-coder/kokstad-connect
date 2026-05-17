import { Link } from "@tanstack/react-router";
import { Facebook, Mail, MapPin, Phone } from "lucide-react";
import logo from "@/assets/logo.jpg";

export function Footer() {
  return (
    <footer className="bg-navy text-white/85 mt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 grid gap-10 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <img src={logo} alt="Kokstad College" className="h-14 w-14 rounded bg-white p-0.5" />
            <div>
              <div className="font-display text-xl text-white">Kokstad College</div>
              <div className="text-gold text-xs tracking-widest uppercase">Consiste Fide</div>
            </div>
          </div>
          <p className="text-sm leading-relaxed text-white/70">
            Shaping tomorrow's leaders since 1900. A proud public secondary school serving the
            Kokstad and East Griqualand community.
          </p>
        </div>

        <div>
          <h4 className="text-white font-display text-lg mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            {[
              ["/", "Home"],
              ["/about", "About"],
              ["/admissions", "Admissions"],
              ["/fees", "Fees & Payments"],
              ["/news", "News"],
              ["/gallery", "Gallery"],
              ["/contact", "Contact"],
            ].map(([to, label]) => (
              <li key={to}>
                <Link to={to} className="hover:text-gold transition-colors">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-white font-display text-lg mb-4">Get in Touch</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex gap-3">
              <MapPin size={18} className="text-gold shrink-0 mt-0.5" />
              <span>The Avenue Street, Kokstad, KwaZulu-Natal, 4700</span>
            </li>
            <li className="flex gap-3">
              <Phone size={18} className="text-gold shrink-0 mt-0.5" />
              <a href="tel:0397272187" className="hover:text-gold">
                039 727 2187
              </a>
            </li>
            <li className="flex gap-3">
              <Mail size={18} className="text-gold shrink-0 mt-0.5" />
              <a href="mailto:principal@kokstadcollege.co.za" className="hover:text-gold break-all">
                principal@kokstadcollege.co.za
              </a>
            </li>
          </ul>
          <div className="flex gap-3 mt-5">
            <a
              href="#"
              aria-label="Facebook"
              className="bg-white/10 hover:bg-gold hover:text-navy w-10 h-10 grid place-items-center rounded-full transition"
            >
              <Facebook size={18} />
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row justify-between gap-2 text-xs text-white/60">
          <p>© {new Date().getFullYear()} Kokstad College. All rights reserved.</p>
          <p>EMIS: 500176897 · Harry Gwala Education District</p>
        </div>
      </div>
    </footer>
  );
}
