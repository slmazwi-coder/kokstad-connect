import { createFileRoute, useRouter } from "@tanstack/react-router";
import { AdminLayout } from "@/components/admin/AdminLayout";
import {
  Users,
  CreditCard,
  FileCheck,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  TrendingUp,
} from "lucide-react";
import {
  getApplications,
  getPayments,
  getDocuments,
  isAdminAuthenticated,
} from "@/lib/admin-store";

export const Route = createFileRoute("/admin/dashboard")({
  component: AdminDashboard,
  head: () => ({
    meta: [{ title: "Dashboard — Admin Portal" }],
  }),
});

function StatCard({
  label,
  value,
  icon: Icon,
  accent,
}: {
  label: string;
  value: string | number;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  accent: string;
}) {
  return (
    <div className="bg-white rounded-xl border p-5 flex items-start gap-4">
      <div className={`w-12 h-12 rounded-lg grid place-items-center shrink-0 ${accent}`}>
        <Icon size={22} />
      </div>
      <div>
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="text-2xl font-display font-bold text-navy mt-0.5">{value}</p>
      </div>
    </div>
  );
}

function AdminDashboard() {
  const router = useRouter();
  if (typeof window !== "undefined" && !isAdminAuthenticated()) {
    router.navigate({ to: "/admin" });
    return null;
  }

  const apps = getApplications();
  const payments = getPayments();
  const docs = getDocuments();

  const totalFees = payments
    .filter((p) => p.status === "Verified")
    .reduce((sum, p) => sum + p.amount, 0);

  const pendingApps = apps.filter((a) => a.status === "Pending" || a.status === "Under Review");
  const acceptedApps = apps.filter((a) => a.status === "Accepted");
  const rejectedApps = apps.filter((a) => a.status === "Rejected");

  const recentApps = [...apps]
    .sort((a, b) => b.submittedAt.localeCompare(a.submittedAt))
    .slice(0, 5);
  const recentPayments = [...payments]
    .sort((a, b) => b.submittedAt.localeCompare(a.submittedAt))
    .slice(0, 5);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h2 className="font-display text-2xl text-navy font-bold">Dashboard</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Overview of applications, payments, and documents
          </p>
        </div>

        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
          <StatCard
            label="Total Applications"
            value={apps.length}
            icon={Users}
            accent="bg-blue-50 text-blue-600"
          />
          <StatCard
            label="Pending Review"
            value={pendingApps.length}
            icon={Clock}
            accent="bg-amber-50 text-amber-600"
          />
          <StatCard
            label="Fees Collected"
            value={`R ${totalFees.toLocaleString()}`}
            icon={CreditCard}
            accent="bg-green-50 text-green-600"
          />
          <StatCard
            label="Documents"
            value={docs.length}
            icon={FileCheck}
            accent="bg-purple-50 text-purple-600"
          />
        </div>

        <div className="grid lg:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl border p-5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-green-50 grid place-items-center">
              <CheckCircle2 size={22} className="text-green-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Accepted</p>
              <p className="text-xl font-display font-bold text-navy">{acceptedApps.length}</p>
            </div>
          </div>
          <div className="bg-white rounded-xl border p-5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-red-50 grid place-items-center">
              <XCircle size={22} className="text-red-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Rejected</p>
              <p className="text-xl font-display font-bold text-navy">{rejectedApps.length}</p>
            </div>
          </div>
          <div className="bg-white rounded-xl border p-5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-amber-50 grid place-items-center">
              <AlertCircle size={22} className="text-amber-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Waitlisted</p>
              <p className="text-xl font-display font-bold text-navy">
                {apps.filter((a) => a.status === "Waitlisted").length}
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl border">
            <div className="px-5 py-4 border-b flex items-center justify-between">
              <h3 className="font-display text-lg text-navy font-semibold">Recent Applications</h3>
              <TrendingUp size={18} className="text-muted-foreground" />
            </div>
            <div className="divide-y">
              {recentApps.map((app) => (
                <div key={app.id} className="px-5 py-3 flex items-center justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-navy truncate">
                      {app.learnerName} {app.surname}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {app.ref} &middot; {app.gradeApplying}
                    </p>
                  </div>
                  <span
                    className={`text-xs font-semibold px-2.5 py-1 rounded-full shrink-0 ${
                      app.status === "Accepted"
                        ? "bg-green-50 text-green-700"
                        : app.status === "Rejected"
                          ? "bg-red-50 text-red-700"
                          : app.status === "Waitlisted"
                            ? "bg-amber-50 text-amber-700"
                            : "bg-blue-50 text-blue-700"
                    }`}
                  >
                    {app.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl border">
            <div className="px-5 py-4 border-b flex items-center justify-between">
              <h3 className="font-display text-lg text-navy font-semibold">Recent Payments</h3>
              <CreditCard size={18} className="text-muted-foreground" />
            </div>
            <div className="divide-y">
              {recentPayments.map((p) => (
                <div key={p.id} className="px-5 py-3 flex items-center justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-navy truncate">{p.learnerName}</p>
                    <p className="text-xs text-muted-foreground">
                      {p.grade} &middot; {p.dateOfPayment}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-sm font-semibold text-navy">R {p.amount.toLocaleString()}</p>
                    <span
                      className={`text-xs font-semibold ${
                        p.status === "Verified"
                          ? "text-green-600"
                          : p.status === "Rejected"
                            ? "text-red-600"
                            : "text-amber-600"
                      }`}
                    >
                      {p.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
