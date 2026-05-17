import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";
import { Mail, MapPin, Phone, Clock, Facebook } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  component: Contact,
  head: () => ({ meta: [{ title: "Contact — Kokstad College" }, { name: "description", content: "Get in touch with Kokstad College. Address, phone, email and contact form." }] }),
});

function Contact() {
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent. We'll respond shortly.");
    (e.target as HTMLFormElement).reset();
  };
  return (
    <div>
      <PageHeader eyebrow="Get in Touch" title="Contact Us" subtitle="We'd love to hear from you. Reach out by phone, email, or the form below." />

      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4 grid lg:grid-cols-2 gap-10">
          <div>
            <h2 className="font-display text-2xl text-navy">Visit, Call or Write</h2>
            <ul className="mt-6 space-y-5">
              <li className="flex gap-4"><MapPin className="text-gold mt-1" /><div><p className="font-semibold text-navy">Address</p><p className="text-muted-foreground text-sm">The Avenue Street, Kokstad, KwaZulu-Natal, 4700</p><p className="text-muted-foreground text-sm">P.O. Box 78, Kokstad, 4700</p></div></li>
              <li className="flex gap-4"><Phone className="text-gold mt-1" /><div><p className="font-semibold text-navy">Phone</p><a href="tel:0397272187" className="text-muted-foreground text-sm hover:text-navy">039 727 2187</a></div></li>
              <li className="flex gap-4"><Mail className="text-gold mt-1" /><div><p className="font-semibold text-navy">Email</p><a href="mailto:principal@kokstadcollege.co.za" className="text-muted-foreground text-sm hover:text-navy break-all">principal@kokstadcollege.co.za</a></div></li>
              <li className="flex gap-4"><Clock className="text-gold mt-1" /><div><p className="font-semibold text-navy">Office Hours</p><p className="text-muted-foreground text-sm">Monday – Friday, 07:30 – 16:00</p></div></li>
            </ul>
            <a href="#" className="mt-6 inline-flex items-center gap-2 text-navy hover:text-gold"><Facebook size={18} /> Facebook</a>
            <div className="mt-8 rounded-xl overflow-hidden border aspect-[16/10]">
              <iframe
                title="Kokstad College location"
                src="https://www.google.com/maps?q=Kokstad+College,+The+Avenue,+Kokstad&output=embed"
                className="w-full h-full"
                loading="lazy"
              />
            </div>
          </div>

          <form onSubmit={onSubmit} className="bg-card border rounded-xl p-6 md:p-8 space-y-4 h-fit">
            <h3 className="font-display text-2xl text-navy">Send us a message</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <label className="block"><span className="text-sm font-medium text-navy">Name</span><input required className="mt-1.5 w-full rounded-md border border-input px-3 py-2.5 text-sm bg-background" /></label>
              <label className="block"><span className="text-sm font-medium text-navy">Email</span><input type="email" required className="mt-1.5 w-full rounded-md border border-input px-3 py-2.5 text-sm bg-background" /></label>
              <label className="block"><span className="text-sm font-medium text-navy">Phone</span><input type="tel" className="mt-1.5 w-full rounded-md border border-input px-3 py-2.5 text-sm bg-background" /></label>
              <label className="block"><span className="text-sm font-medium text-navy">Subject</span>
                <select required defaultValue="" className="mt-1.5 w-full rounded-md border border-input px-3 py-2.5 text-sm bg-background">
                  <option value="" disabled>Select…</option>
                  <option>General Enquiry</option><option>Admissions</option><option>Fees</option><option>Careers</option>
                </select>
              </label>
            </div>
            <label className="block"><span className="text-sm font-medium text-navy">Message</span><textarea rows={5} required className="mt-1.5 w-full rounded-md border border-input px-3 py-2 text-sm bg-background" /></label>
            <button className="w-full bg-navy text-white py-3 rounded-md font-semibold hover:bg-navy-light transition">Send Message</button>
          </form>
        </div>
      </section>
    </div>
  );
}
