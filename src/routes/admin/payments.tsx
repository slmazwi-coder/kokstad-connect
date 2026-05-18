import { createFileRoute, useRouter } from "@tanstack/react-router";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { useState } from "react";
import { Search, CheckCircle2, XCircle, Clock, Eye, X } from "lucide-react";
import { getPayments, updatePayment, isAdminAuthenticated, type Payment } from "@/lib/admin-store";

export const Route = createFileRoute("/admin/payments")({
  component: AdminPayments,
  head: () => ({
    meta: [{ title: "Payments — Admin Portal" }],
  }),
});

const statusColors: Record<string, string> = {
  Verified: "bg-green-50 text-green-700",
  Pending: "bg-amber-50 text-amber-700",
  Rejected: "bg-red-50 text-red-700",
};

const statusIcons: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Verified: CheckCircle2,
  Pending: Clock,
  Rejected: XCircle,
};

function AdminPayments() {
  const router = useRouter();
  const [payments, setPayments] = useState(getPayments);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterMethod, setFilterMethod] = useState("");
  const [selected, setSelected] = useState<Payment | null>(null);

  if (typeof window !== "undefined" && !isAdminAuthenticated()) {
    router.navigate({ to: "/admin" });
    return null;
  }

  const filtered = payments.filter((p) => {
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      p.learnerName.toLowerCase().includes(q) ||
      p.parentName.toLowerCase().includes(q) ||
      p.reference.toLowerCase().includes(q);
    const matchStatus = !filterStatus || p.status === filterStatus;
    const matchMethod = !filterMethod || p.method === filterMethod;
    return matchSearch && matchStatus && matchMethod;
  });

  const totalVerified = payments
    .filter((p) => p.status === "Verified")
    .reduce((s, p) => s + p.amount, 0);
  const totalPending = payments
    .filter((p) => p.status === "Pending")
    .reduce((s, p) => s + p.amount, 0);

  const handleStatusChange = (id: string, status: Payment["status"]) => {
    const updated = updatePayment(id, { status });
    setPayments(updated);
    if (selected && selected.id === id) setSelected({ ...selected, status });
  };

  return (
    <AdminLayout>
      <div className="space-y-5">
        <div>
          <h2 className="font-display text-2xl text-navy font-bold">Payment Records</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Manage proof-of-payment submissions and verify records
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl border p-5">
            <p className="text-sm text-muted-foreground">Verified Total</p>
            <p className="text-2xl font-display font-bold text-green-600 mt-1">
              R {totalVerified.toLocaleString()}
            </p>
          </div>
          <div className="bg-white rounded-xl border p-5">
            <p className="text-sm text-muted-foreground">Pending Verification</p>
            <p className="text-2xl font-display font-bold text-amber-600 mt-1">
              R {totalPending.toLocaleString()}
            </p>
          </div>
          <div className="bg-white rounded-xl border p-5">
            <p className="text-sm text-muted-foreground">Total Submissions</p>
            <p className="text-2xl font-display font-bold text-navy mt-1">{payments.length}</p>
          </div>
        </div>

        <div className="bg-white rounded-xl border p-4">
          <div className="flex flex-wrap gap-3 items-end">
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Search
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by learner, parent, or reference..."
                  className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-input text-sm bg-background focus:outline-none focus:ring-2 focus:ring-navy"
                />
              </div>
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="rounded-lg border border-input px-3 py-2.5 text-sm bg-background"
            >
              <option value="">All Statuses</option>
              <option>Verified</option>
              <option>Pending</option>
              <option>Rejected</option>
            </select>
            <select
              value={filterMethod}
              onChange={(e) => setFilterMethod(e.target.value)}
              className="rounded-lg border border-input px-3 py-2.5 text-sm bg-background"
            >
              <option value="">All Methods</option>
              <option>EFT</option>
              <option>Cash</option>
              <option>Card</option>
            </select>
          </div>
        </div>

        <div className="bg-white rounded-xl border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-secondary text-navy">
                  <th className="text-left p-3 font-semibold">Learner</th>
                  <th className="text-left p-3 font-semibold hidden md:table-cell">Parent</th>
                  <th className="text-left p-3 font-semibold">Grade</th>
                  <th className="text-right p-3 font-semibold">Amount</th>
                  <th className="text-left p-3 font-semibold hidden lg:table-cell">Method</th>
                  <th className="text-left p-3 font-semibold hidden lg:table-cell">Date</th>
                  <th className="text-left p-3 font-semibold">Status</th>
                  <th className="p-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filtered.map((p) => {
                  const StatusIcon = statusIcons[p.status] || Clock;
                  return (
                    <tr key={p.id} className="hover:bg-secondary/50 transition-colors">
                      <td className="p-3">
                        <p className="font-medium text-navy">{p.learnerName}</p>
                        <p className="text-xs text-muted-foreground md:hidden">{p.parentName}</p>
                      </td>
                      <td className="p-3 text-muted-foreground hidden md:table-cell">
                        {p.parentName}
                      </td>
                      <td className="p-3">{p.grade}</td>
                      <td className="p-3 text-right font-semibold text-navy">
                        R {p.amount.toLocaleString()}
                      </td>
                      <td className="p-3 hidden lg:table-cell">{p.method}</td>
                      <td className="p-3 hidden lg:table-cell text-muted-foreground">
                        {p.dateOfPayment}
                      </td>
                      <td className="p-3">
                        <span
                          className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${statusColors[p.status] || ""}`}
                        >
                          <StatusIcon size={12} />
                          {p.status}
                        </span>
                      </td>
                      <td className="p-3">
                        <button
                          onClick={() => setSelected(p)}
                          className="p-1.5 rounded-lg hover:bg-secondary text-navy"
                          title="View details"
                        >
                          <Eye size={16} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={8} className="p-8 text-center text-muted-foreground">
                      No payment records match your filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {selected && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg">
            <div className="border-b px-6 py-4 flex items-center justify-between">
              <h3 className="font-display text-xl text-navy font-bold">Payment Details</h3>
              <button
                onClick={() => setSelected(null)}
                className="p-2 rounded-lg hover:bg-secondary"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-6 space-y-4 text-sm">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-muted-foreground">Learner</p>
                  <p className="font-medium text-navy">{selected.learnerName}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Grade</p>
                  <p className="font-medium text-navy">{selected.grade}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Parent</p>
                  <p className="font-medium text-navy">{selected.parentName}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Amount</p>
                  <p className="font-bold text-navy text-lg">
                    R {selected.amount.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">Payment Date</p>
                  <p className="font-medium text-navy">{selected.dateOfPayment}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Method</p>
                  <p className="font-medium text-navy">{selected.method}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Reference</p>
                  <p className="font-medium text-navy">{selected.reference}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Proof File</p>
                  <p className="font-medium text-navy">{selected.proofFile}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Submitted</p>
                  <p className="font-medium text-navy">{selected.submittedAt}</p>
                </div>
              </div>

              <div className="border-t pt-4">
                <label className="text-sm font-semibold text-navy block mb-1.5">
                  Verification Status
                </label>
                <div className="flex gap-2">
                  {(["Verified", "Pending", "Rejected"] as const).map((s) => (
                    <button
                      key={s}
                      onClick={() => handleStatusChange(selected.id, s)}
                      className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition ${
                        selected.status === s
                          ? s === "Verified"
                            ? "bg-green-600 text-white"
                            : s === "Rejected"
                              ? "bg-red-600 text-white"
                              : "bg-amber-500 text-white"
                          : "bg-secondary text-muted-foreground hover:bg-secondary/80"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
