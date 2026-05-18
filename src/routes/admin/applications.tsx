import { createFileRoute, useRouter } from "@tanstack/react-router";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { useState } from "react";
import { Search, Filter, ChevronDown, ChevronUp, Eye, X } from "lucide-react";
import {
  getApplications,
  updateApplication,
  isAdminAuthenticated,
  type Application,
} from "@/lib/admin-store";

export const Route = createFileRoute("/admin/applications")({
  component: AdminApplications,
  head: () => ({
    meta: [{ title: "Applications — Admin Portal" }],
  }),
});

type SortKey =
  | "submittedAt"
  | "surname"
  | "gradeApplying"
  | "status"
  | "viability"
  | "stream"
  | "category";

const statusColors: Record<string, string> = {
  Pending: "bg-blue-50 text-blue-700",
  "Under Review": "bg-indigo-50 text-indigo-700",
  Accepted: "bg-green-50 text-green-700",
  Waitlisted: "bg-amber-50 text-amber-700",
  Rejected: "bg-red-50 text-red-700",
};

const viabilityColors: Record<string, string> = {
  High: "bg-green-50 text-green-700",
  Medium: "bg-amber-50 text-amber-700",
  Low: "bg-red-50 text-red-700",
};

function AdminApplications() {
  const router = useRouter();
  const [apps, setApps] = useState(getApplications);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterStream, setFilterStream] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterViability, setFilterViability] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("submittedAt");
  const [sortAsc, setSortAsc] = useState(false);
  const [selected, setSelected] = useState<Application | null>(null);

  if (typeof window !== "undefined" && !isAdminAuthenticated()) {
    router.navigate({ to: "/admin" });
    return null;
  }

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) setSortAsc(!sortAsc);
    else {
      setSortKey(key);
      setSortAsc(true);
    }
  };

  const SortIcon = ({ col }: { col: SortKey }) =>
    sortKey === col ? (
      sortAsc ? (
        <ChevronUp size={14} />
      ) : (
        <ChevronDown size={14} />
      )
    ) : (
      <ChevronDown size={14} className="opacity-30" />
    );

  const filtered = apps
    .filter((a) => {
      const q = search.toLowerCase();
      const matchSearch =
        !q ||
        a.learnerName.toLowerCase().includes(q) ||
        a.surname.toLowerCase().includes(q) ||
        a.ref.toLowerCase().includes(q) ||
        a.parentName.toLowerCase().includes(q);
      const matchStatus = !filterStatus || a.status === filterStatus;
      const matchStream = !filterStream || a.stream === filterStream;
      const matchCategory = !filterCategory || a.category === filterCategory;
      const matchViability = !filterViability || a.viability === filterViability;
      return matchSearch && matchStatus && matchStream && matchCategory && matchViability;
    })
    .sort((a, b) => {
      const av = a[sortKey];
      const bv = b[sortKey];
      const cmp = typeof av === "string" ? av.localeCompare(bv as string) : 0;
      return sortAsc ? cmp : -cmp;
    });

  const handleStatusChange = (id: string, status: Application["status"]) => {
    const updated = updateApplication(id, { status });
    setApps(updated);
    if (selected && selected.id === id) setSelected({ ...selected, status });
  };

  const handleViabilityChange = (id: string, viability: Application["viability"]) => {
    const updated = updateApplication(id, { viability });
    setApps(updated);
    if (selected && selected.id === id) setSelected({ ...selected, viability });
  };

  const handleNotesChange = (id: string, notes: string) => {
    const updated = updateApplication(id, { notes });
    setApps(updated);
  };

  return (
    <AdminLayout>
      <div className="space-y-5">
        <div>
          <h2 className="font-display text-2xl text-navy font-bold">Application Records</h2>
          <p className="text-sm text-muted-foreground mt-1">
            {filtered.length} of {apps.length} applications shown
          </p>
        </div>

        <div className="bg-white rounded-xl border p-4 space-y-4">
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
                  placeholder="Search by name, ref, or parent..."
                  className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-input text-sm bg-background focus:outline-none focus:ring-2 focus:ring-navy"
                />
              </div>
            </div>
            <div className="flex flex-wrap gap-2 items-center">
              <Filter size={16} className="text-muted-foreground" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="rounded-lg border border-input px-3 py-2 text-sm bg-background"
              >
                <option value="">All Statuses</option>
                <option>Pending</option>
                <option>Under Review</option>
                <option>Accepted</option>
                <option>Waitlisted</option>
                <option>Rejected</option>
              </select>
              <select
                value={filterStream}
                onChange={(e) => setFilterStream(e.target.value)}
                className="rounded-lg border border-input px-3 py-2 text-sm bg-background"
              >
                <option value="">All Streams</option>
                <option>Academic</option>
                <option>Technical</option>
                <option>Commercial</option>
              </select>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="rounded-lg border border-input px-3 py-2 text-sm bg-background"
              >
                <option value="">All Categories</option>
                <option>New Admission</option>
                <option>Transfer</option>
                <option>Returning</option>
              </select>
              <select
                value={filterViability}
                onChange={(e) => setFilterViability(e.target.value)}
                className="rounded-lg border border-input px-3 py-2 text-sm bg-background"
              >
                <option value="">All Viability</option>
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-secondary text-navy">
                  <th className="text-left p-3 font-semibold">
                    <button
                      className="flex items-center gap-1"
                      onClick={() => toggleSort("surname")}
                    >
                      Learner <SortIcon col="surname" />
                    </button>
                  </th>
                  <th className="text-left p-3 font-semibold hidden md:table-cell">Ref</th>
                  <th className="text-left p-3 font-semibold">
                    <button
                      className="flex items-center gap-1"
                      onClick={() => toggleSort("gradeApplying")}
                    >
                      Grade <SortIcon col="gradeApplying" />
                    </button>
                  </th>
                  <th className="text-left p-3 font-semibold">
                    <button
                      className="flex items-center gap-1"
                      onClick={() => toggleSort("stream")}
                    >
                      Stream <SortIcon col="stream" />
                    </button>
                  </th>
                  <th className="text-left p-3 font-semibold hidden lg:table-cell">
                    <button
                      className="flex items-center gap-1"
                      onClick={() => toggleSort("category")}
                    >
                      Category <SortIcon col="category" />
                    </button>
                  </th>
                  <th className="text-left p-3 font-semibold">
                    <button
                      className="flex items-center gap-1"
                      onClick={() => toggleSort("viability")}
                    >
                      Viability <SortIcon col="viability" />
                    </button>
                  </th>
                  <th className="text-left p-3 font-semibold">
                    <button
                      className="flex items-center gap-1"
                      onClick={() => toggleSort("status")}
                    >
                      Status <SortIcon col="status" />
                    </button>
                  </th>
                  <th className="text-left p-3 font-semibold hidden lg:table-cell">
                    <button
                      className="flex items-center gap-1"
                      onClick={() => toggleSort("submittedAt")}
                    >
                      Date <SortIcon col="submittedAt" />
                    </button>
                  </th>
                  <th className="p-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filtered.map((app) => (
                  <tr key={app.id} className="hover:bg-secondary/50 transition-colors">
                    <td className="p-3">
                      <p className="font-medium text-navy">
                        {app.learnerName} {app.surname}
                      </p>
                      <p className="text-xs text-muted-foreground md:hidden">{app.ref}</p>
                    </td>
                    <td className="p-3 text-muted-foreground hidden md:table-cell">{app.ref}</td>
                    <td className="p-3">{app.gradeApplying}</td>
                    <td className="p-3">{app.stream}</td>
                    <td className="p-3 hidden lg:table-cell">{app.category}</td>
                    <td className="p-3">
                      <span
                        className={`text-xs font-semibold px-2.5 py-1 rounded-full ${viabilityColors[app.viability] || ""}`}
                      >
                        {app.viability}
                      </span>
                    </td>
                    <td className="p-3">
                      <span
                        className={`text-xs font-semibold px-2.5 py-1 rounded-full ${statusColors[app.status] || ""}`}
                      >
                        {app.status}
                      </span>
                    </td>
                    <td className="p-3 hidden lg:table-cell text-muted-foreground">
                      {app.submittedAt}
                    </td>
                    <td className="p-3">
                      <button
                        onClick={() => setSelected(app)}
                        className="p-1.5 rounded-lg hover:bg-secondary text-navy"
                        title="View details"
                      >
                        <Eye size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={9} className="p-8 text-center text-muted-foreground">
                      No applications match your filters.
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
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
              <div>
                <h3 className="font-display text-xl text-navy font-bold">
                  {selected.learnerName} {selected.surname}
                </h3>
                <p className="text-sm text-muted-foreground">{selected.ref}</p>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="p-2 rounded-lg hover:bg-secondary"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6 space-y-5">
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Date of Birth</p>
                  <p className="font-medium text-navy">{selected.dateOfBirth}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Gender</p>
                  <p className="font-medium text-navy">{selected.gender}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Current School</p>
                  <p className="font-medium text-navy">{selected.currentSchool}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Current Grade</p>
                  <p className="font-medium text-navy">{selected.currentGrade}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Grade Applying For</p>
                  <p className="font-medium text-navy">{selected.gradeApplying}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Submitted</p>
                  <p className="font-medium text-navy">{selected.submittedAt}</p>
                </div>
              </div>

              <div className="border-t pt-5">
                <p className="text-sm font-semibold text-navy mb-3">Parent / Guardian</p>
                <div className="grid sm:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Name</p>
                    <p className="font-medium text-navy">{selected.parentName}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Email</p>
                    <p className="font-medium text-navy">{selected.parentEmail}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Phone</p>
                    <p className="font-medium text-navy">{selected.parentPhone}</p>
                  </div>
                </div>
              </div>

              <div className="border-t pt-5">
                <p className="text-sm font-semibold text-navy mb-3">Documents Submitted</p>
                <div className="flex flex-wrap gap-2">
                  {selected.documents.map((doc) => (
                    <span
                      key={doc}
                      className="bg-secondary text-navy text-xs px-3 py-1.5 rounded-lg"
                    >
                      {doc}
                    </span>
                  ))}
                </div>
              </div>

              <div className="border-t pt-5 grid sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-semibold text-navy block mb-1.5">Status</label>
                  <select
                    value={selected.status}
                    onChange={(e) =>
                      handleStatusChange(selected.id, e.target.value as Application["status"])
                    }
                    className="w-full rounded-lg border border-input px-3 py-2 text-sm bg-background"
                  >
                    <option>Pending</option>
                    <option>Under Review</option>
                    <option>Accepted</option>
                    <option>Waitlisted</option>
                    <option>Rejected</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-semibold text-navy block mb-1.5">Stream</label>
                  <p className="text-sm font-medium rounded-lg border border-input px-3 py-2 bg-secondary">
                    {selected.stream}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-semibold text-navy block mb-1.5">Viability</label>
                  <select
                    value={selected.viability}
                    onChange={(e) =>
                      handleViabilityChange(selected.id, e.target.value as Application["viability"])
                    }
                    className="w-full rounded-lg border border-input px-3 py-2 text-sm bg-background"
                  >
                    <option>High</option>
                    <option>Medium</option>
                    <option>Low</option>
                  </select>
                </div>
              </div>

              <div className="border-t pt-5">
                <label className="text-sm font-semibold text-navy block mb-1.5">Admin Notes</label>
                <textarea
                  defaultValue={selected.notes}
                  onBlur={(e) => handleNotesChange(selected.id, e.target.value)}
                  rows={3}
                  className="w-full rounded-lg border border-input px-3 py-2 text-sm bg-background"
                  placeholder="Add notes about this application..."
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
