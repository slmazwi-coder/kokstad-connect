import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";
import { useState } from "react";
import { Upload, CreditCard, Banknote } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/fees")({
  component: Fees,
  head: () => ({
    meta: [
      { title: "Fees & Payments — Kokstad College" },
      {
        name: "description",
        content: "School fee structure, banking details, and proof of payment uploads.",
      },
    ],
  }),
});

function Fees() {
  const [file, setFile] = useState<string>("");
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Proof of payment uploaded. Admin has been notified.");
    (e.target as HTMLFormElement).reset();
    setFile("");
  };
  return (
    <div>
      <PageHeader
        eyebrow="Fees"
        title="Fees & Payments"
        subtitle="Fee structure, banking details, and proof-of-payment uploads for parents."
      />

      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4 grid lg:grid-cols-2 gap-10">
          <div>
            <h2 className="font-display text-2xl text-navy">2026 Fee Structure</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Final figures to be confirmed by the school office.
            </p>
            <div className="mt-5 overflow-hidden rounded-xl border">
              <table className="w-full text-sm">
                <thead className="bg-navy text-white">
                  <tr>
                    <th className="text-left p-3">Grade</th>
                    <th className="text-left p-3">Annual</th>
                    <th className="text-left p-3">Monthly × 10</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {[
                    ["Grade 8 – 9", "R 18 000", "R 1 800"],
                    ["Grade 10 – 11", "R 20 000", "R 2 000"],
                    ["Grade 12", "R 22 000", "R 2 200"],
                  ].map((r) => (
                    <tr key={r[0]} className="hover:bg-secondary">
                      {r.map((c, i) => (
                        <td key={i} className="p-3">
                          {c}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-muted-foreground mt-3">
              Placeholder rates — school to confirm.
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl text-navy">Banking Details</h2>
            <div className="mt-5 bg-card border rounded-xl p-6 space-y-3 text-sm">
              {[
                ["Bank", "[Placeholder]"],
                ["Account name", "Kokstad College"],
                ["Account number", "[Placeholder]"],
                ["Branch code", "[Placeholder]"],
                ["Reference", "Learner surname + grade"],
              ].map(([k, v]) => (
                <div
                  key={k}
                  className="flex justify-between gap-4 border-b last:border-0 pb-2 last:pb-0"
                >
                  <span className="text-muted-foreground">{k}</span>
                  <span className="font-semibold text-navy">{v}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
              <div className="bg-secondary rounded-lg p-4 flex items-center gap-3">
                <CreditCard className="text-navy" /> EFT Bank Transfer
              </div>
              <div className="bg-secondary rounded-lg p-4 flex items-center gap-3">
                <Banknote className="text-navy" /> Cash (school office)
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-3">
              Please use your child's surname and grade as your payment reference.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-secondary">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="font-display text-2xl text-navy text-center">Upload Proof of Payment</h2>
          <p className="text-sm text-center text-muted-foreground mt-2">
            No login required. Admin is notified by email on submission.
          </p>
          <form onSubmit={onSubmit} className="mt-8 bg-card border rounded-xl p-6 space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <label className="block">
                <span className="text-sm font-medium text-navy">Learner full name</span>
                <input
                  required
                  className="mt-1.5 w-full rounded-md border border-input px-3 py-2.5 text-sm bg-background"
                />
              </label>
              <label className="block">
                <span className="text-sm font-medium text-navy">Grade</span>
                <input
                  required
                  className="mt-1.5 w-full rounded-md border border-input px-3 py-2.5 text-sm bg-background"
                />
              </label>
              <label className="block">
                <span className="text-sm font-medium text-navy">Parent / guardian name</span>
                <input
                  required
                  className="mt-1.5 w-full rounded-md border border-input px-3 py-2.5 text-sm bg-background"
                />
              </label>
              <label className="block">
                <span className="text-sm font-medium text-navy">Amount paid (R)</span>
                <input
                  type="number"
                  required
                  className="mt-1.5 w-full rounded-md border border-input px-3 py-2.5 text-sm bg-background"
                />
              </label>
              <label className="block sm:col-span-2">
                <span className="text-sm font-medium text-navy">Date of payment</span>
                <input
                  type="date"
                  required
                  className="mt-1.5 w-full rounded-md border border-input px-3 py-2.5 text-sm bg-background"
                />
              </label>
            </div>
            <label className="flex items-center gap-3 p-4 border-2 border-dashed rounded-md cursor-pointer hover:border-navy">
              <Upload className="text-navy" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-navy">Upload proof (PDF or image)</p>
                <p className="text-xs text-muted-foreground truncate">
                  {file || "Click to choose file"}
                </p>
              </div>
              <input
                type="file"
                accept=".pdf,image/*"
                required
                className="sr-only"
                onChange={(e) => setFile(e.target.files?.[0]?.name ?? "")}
              />
            </label>
            <button className="w-full bg-navy text-white py-3 rounded-md font-semibold hover:bg-navy-light transition">
              Submit Proof of Payment
            </button>
          </form>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="font-display text-2xl text-navy">Parent Portal</h2>
          <p className="mt-3 text-muted-foreground">
            Existing parents can log in to view balances, payment history and download invoices.
          </p>
          <button
            onClick={() => toast.info("Parent portal coming soon.")}
            className="mt-5 bg-gold text-navy px-6 py-3 rounded-md font-semibold hover:brightness-110"
          >
            Parent Login
          </button>
        </div>
      </section>
    </div>
  );
}
