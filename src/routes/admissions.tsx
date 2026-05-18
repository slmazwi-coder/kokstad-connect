import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";
import { useState } from "react";
import { Check, ChevronLeft, ChevronRight, Upload } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admissions")({
  component: Admissions,
  head: () => ({
    meta: [
      { title: "Admissions — Kokstad College" },
      {
        name: "description",
        content: "Apply online for 2027. Applications open 15 April 2026 — 31 August 2026.",
      },
    ],
  }),
});

const steps = ["Learner", "Parent / Guardian", "Documents", "Medical", "Declaration"];

function Field({
  label,
  ...props
}: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-navy">{label}</span>
      <input
        {...props}
        className="mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-navy"
      />
    </label>
  );
}

function Select({
  label,
  children,
  ...props
}: { label: string; children: React.ReactNode } & React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-navy">{label}</span>
      <select
        {...props}
        className="mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-navy"
      >
        {children}
      </select>
    </label>
  );
}

function FileField({ label }: { label: string }) {
  const [name, setName] = useState("");
  return (
    <label className="flex items-center gap-3 p-4 border-2 border-dashed border-border rounded-md hover:border-navy cursor-pointer transition">
      <Upload className="text-navy" size={20} />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-navy">{label}</p>
        <p className="text-xs text-muted-foreground truncate">{name || "PDF, JPG, or PNG"}</p>
      </div>
      <input
        type="file"
        accept=".pdf,image/*"
        className="sr-only"
        onChange={(e) => setName(e.target.files?.[0]?.name ?? "")}
      />
    </label>
  );
}

function Admissions() {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState<string | null>(null);
  const [tracker, setTracker] = useState<{ ref: string; email: string } | null>(null);
  const [trackerResult, setTrackerResult] = useState<string | null>(null);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const year = new Date().getFullYear();
    const ref = `KC-${year}-${Math.floor(1000 + Math.random() * 9000)}`;
    setDone(ref);
    toast.success("Application submitted successfully");
  };

  if (done) {
    return (
      <div>
        <PageHeader eyebrow="Success" title="Application Received" />
        <section className="py-20">
          <div className="mx-auto max-w-2xl px-4 text-center">
            <div className="w-20 h-20 rounded-full bg-gold grid place-items-center mx-auto">
              <Check className="text-navy" size={40} />
            </div>
            <h2 className="font-display text-3xl text-navy mt-6">Thank you for applying</h2>
            <p className="mt-3 text-muted-foreground">
              A confirmation email has been sent to the parent/guardian address. Please retain your
              reference number.
            </p>
            <div className="mt-8 bg-secondary rounded-xl p-6">
              <p className="text-xs uppercase tracking-widest text-muted-foreground">
                Reference number
              </p>
              <p className="font-display text-3xl text-navy mt-2">{done}</p>
            </div>
            <button
              onClick={() => {
                setDone(null);
                setStep(0);
              }}
              className="mt-8 text-navy hover:text-gold underline"
            >
              Submit another application
            </button>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        eyebrow="Admissions"
        title="Apply Online for 2027"
        subtitle="Applications open 15 April 2026 and close 31 August 2026. Complete all five steps below."
      />

      {/* Tracker */}
      <section className="py-10 bg-secondary border-b">
        <div className="mx-auto max-w-3xl px-4">
          <h3 className="font-display text-xl text-navy">Check Application Status</h3>
          <form
            className="mt-4 grid sm:grid-cols-[1fr_1fr_auto] gap-3"
            onSubmit={(e) => {
              e.preventDefault();
              if (tracker?.ref && tracker?.email) {
                setTrackerResult("Under Review");
              }
            }}
          >
            <input
              placeholder="Reference (e.g. KC-2026-1234)"
              required
              onChange={(e) =>
                setTracker({ ...(tracker ?? { ref: "", email: "" }), ref: e.target.value })
              }
              className="rounded-md border border-input px-3 py-2.5 text-sm bg-background"
            />
            <input
              type="email"
              placeholder="Parent email"
              required
              onChange={(e) =>
                setTracker({ ...(tracker ?? { ref: "", email: "" }), email: e.target.value })
              }
              className="rounded-md border border-input px-3 py-2.5 text-sm bg-background"
            />
            <button className="bg-navy text-white px-5 py-2.5 rounded-md font-semibold text-sm hover:bg-navy-light">
              Check
            </button>
          </form>
          {trackerResult && (
            <p className="mt-3 text-sm">
              Status: <span className="font-semibold text-navy">{trackerResult}</span>
            </p>
          )}
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-4xl px-4">
          {/* Stepper */}
          <ol className="flex flex-wrap items-center gap-2 mb-10">
            {steps.map((s, i) => (
              <li key={s} className="flex items-center gap-2 text-sm">
                <span
                  className={`w-8 h-8 grid place-items-center rounded-full font-semibold ${i <= step ? "bg-navy text-white" : "bg-secondary text-muted-foreground"}`}
                >
                  {i < step ? <Check size={16} /> : i + 1}
                </span>
                <span
                  className={`hidden sm:inline ${i === step ? "text-navy font-semibold" : "text-muted-foreground"}`}
                >
                  {s}
                </span>
                {i < steps.length - 1 && (
                  <span className="text-muted-foreground hidden sm:inline">—</span>
                )}
              </li>
            ))}
          </ol>

          <form onSubmit={submit} className="bg-card border rounded-xl p-6 md:p-8 space-y-5">
            {step === 0 && (
              <>
                <h3 className="font-display text-2xl text-navy">Learner Information</h3>
                <div className="grid sm:grid-cols-3 gap-4">
                  <Field label="First name" required />
                  <Field label="Middle name" />
                  <Field label="Last name" required />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="Date of birth" type="date" required />
                  <Select label="Gender" required defaultValue="">
                    <option value="" disabled>
                      Select…
                    </option>
                    <option>Female</option>
                    <option>Male</option>
                    <option>Other</option>
                  </Select>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="Nationality" required />
                  <Field label="Home language" required />
                </div>
                <Field label="ID / Birth certificate number" required />
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="Current school" />
                  <Field label="Current grade" />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Select label="Grade applying for" required defaultValue="">
                    <option value="" disabled>
                      Select…
                    </option>
                    {[8, 9, 10, 11, 12].map((g) => (
                      <option key={g}>Grade {g}</option>
                    ))}
                  </Select>
                  <Field label="Year of entry" type="number" defaultValue={2027} required />
                </div>
              </>
            )}
            {step === 1 && (
              <>
                <h3 className="font-display text-2xl text-navy">Parent / Guardian Information</h3>
                <p className="text-sm font-semibold text-navy mt-4">Parent / Guardian 1</p>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="Full name" required />
                  <Field label="Relationship" required />
                  <Field label="ID number" required />
                  <Field label="Occupation" />
                  <Field label="Cell number" type="tel" required />
                  <Field label="Email" type="email" required />
                  <Field label="Work number" type="tel" />
                </div>
                <p className="text-sm font-semibold text-navy mt-6">
                  Parent / Guardian 2 (optional)
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="Full name" />
                  <Field label="Relationship" />
                  <Field label="Cell number" type="tel" />
                  <Field label="Email" type="email" />
                </div>
                <p className="text-sm font-semibold text-navy mt-6">Address</p>
                <Field label="Physical home address" required />
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" /> Postal address same as physical
                </label>
                <Field label="Postal address" />
              </>
            )}
            {step === 2 && (
              <>
                <h3 className="font-display text-2xl text-navy">Document Uploads</h3>
                <p className="text-sm text-muted-foreground">
                  Please upload certified copies where required. PDF or image files accepted.
                </p>
                <div className="grid sm:grid-cols-2 gap-3">
                  <FileField label="Learner's birth certificate (certified)" />
                  <FileField label="Parent / Guardian ID (certified)" />
                  <FileField label="Latest school report" />
                  <FileField label="Previous year's school report" />
                  <FileField label="Transfer letter (if applicable)" />
                  <FileField label="Proof of residence" />
                  <FileField label="Passport photo of learner" />
                </div>
              </>
            )}
            {step === 3 && (
              <>
                <h3 className="font-display text-2xl text-navy">Medical & Special Needs</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Select label="Medical aid" defaultValue="">
                    <option value="" disabled>
                      Select…
                    </option>
                    <option>Yes</option>
                    <option>No</option>
                  </Select>
                  <Field label="Provider" />
                  <Field label="Medical aid number" />
                </div>
                <label className="block">
                  <span className="text-sm font-medium text-navy">
                    Chronic conditions or allergies
                  </span>
                  <textarea
                    rows={3}
                    className="mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  />
                </label>
                <label className="block">
                  <span className="text-sm font-medium text-navy">Learning support needs</span>
                  <textarea
                    rows={3}
                    className="mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  />
                </label>
                <p className="text-sm font-semibold text-navy mt-4">Emergency Contact</p>
                <div className="grid sm:grid-cols-3 gap-4">
                  <Field label="Name" required />
                  <Field label="Relationship" required />
                  <Field label="Phone" type="tel" required />
                </div>
              </>
            )}
            {step === 4 && (
              <>
                <h3 className="font-display text-2xl text-navy">Declaration & Submit</h3>
                <div className="space-y-3 mt-4">
                  <label className="flex gap-3 text-sm">
                    <input type="checkbox" required className="mt-1" />
                    <span>
                      I confirm that all information provided is accurate and complete to the best
                      of my knowledge.
                    </span>
                  </label>
                  <label className="flex gap-3 text-sm">
                    <input type="checkbox" required className="mt-1" />
                    <span>
                      I have read and agree to Kokstad College's terms and conditions, code of
                      conduct, and admissions policy.
                    </span>
                  </label>
                </div>
                <p className="text-xs text-muted-foreground mt-6">
                  A reference number will be issued on submission. A confirmation email will be sent
                  to the parent/guardian email address provided.
                </p>
              </>
            )}

            <div className="flex justify-between pt-6 border-t mt-6">
              <button
                type="button"
                disabled={step === 0}
                onClick={() => setStep(step - 1)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-md border border-input text-sm font-semibold disabled:opacity-40"
              >
                <ChevronLeft size={16} /> Back
              </button>
              {step < steps.length - 1 ? (
                <button
                  type="button"
                  onClick={() => setStep(step + 1)}
                  className="flex items-center gap-2 bg-navy text-white px-6 py-2.5 rounded-md text-sm font-semibold hover:bg-navy-light"
                >
                  Next <ChevronRight size={16} />
                </button>
              ) : (
                <button
                  type="submit"
                  className="bg-gold text-navy px-6 py-2.5 rounded-md text-sm font-semibold hover:brightness-110"
                >
                  Submit Application
                </button>
              )}
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
