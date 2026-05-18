import { createFileRoute, useRouter } from "@tanstack/react-router";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { useState } from "react";
import { Search, Plus, Trash2, FileText, Archive, X } from "lucide-react";
import {
  getDocuments,
  addDocument,
  deleteDocument,
  isAdminAuthenticated,
  type Document,
} from "@/lib/admin-store";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/documents")({
  component: AdminDocuments,
  head: () => ({
    meta: [{ title: "Documents — Admin Portal" }],
  }),
});

const typeColors: Record<string, string> = {
  "Application Form": "bg-blue-50 text-blue-700",
  "Report Card": "bg-green-50 text-green-700",
  "Transfer Letter": "bg-purple-50 text-purple-700",
  "Medical Form": "bg-red-50 text-red-700",
  "Consent Form": "bg-amber-50 text-amber-700",
  "Policy Document": "bg-indigo-50 text-indigo-700",
  Other: "bg-gray-100 text-gray-700",
};

const documentTypes: Document["type"][] = [
  "Application Form",
  "Report Card",
  "Transfer Letter",
  "Medical Form",
  "Consent Form",
  "Policy Document",
  "Other",
];

function AdminDocuments() {
  const router = useRouter();
  const [docs, setDocs] = useState(getDocuments);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [newDoc, setNewDoc] = useState({
    name: "",
    type: "Other" as Document["type"],
    uploadedBy: "Admin",
    linkedTo: "",
  });

  if (typeof window !== "undefined" && !isAdminAuthenticated()) {
    router.navigate({ to: "/admin" });
    return null;
  }

  const filtered = docs.filter((d) => {
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      d.name.toLowerCase().includes(q) ||
      d.linkedTo.toLowerCase().includes(q) ||
      d.uploadedBy.toLowerCase().includes(q);
    const matchType = !filterType || d.type === filterType;
    const matchStatus = !filterStatus || d.status === filterStatus;
    return matchSearch && matchType && matchStatus;
  });

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDoc.name) return;
    const updated = addDocument({
      ...newDoc,
      date: new Date().toISOString().split("T")[0],
      status: "Active",
    });
    setDocs(updated);
    setNewDoc({ name: "", type: "Other", uploadedBy: "Admin", linkedTo: "" });
    setShowAdd(false);
    toast.success("Document added");
  };

  const handleDelete = (id: string) => {
    const updated = deleteDocument(id);
    setDocs(updated);
    toast.success("Document removed");
  };

  const handleArchiveToggle = (doc: Document) => {
    const newStatus: Document["status"] = doc.status === "Active" ? "Archived" : "Active";
    const updated = docs.map((d) => (d.id === doc.id ? { ...d, status: newStatus } : d));
    setDocs(updated);
    if (typeof window !== "undefined") {
      localStorage.setItem("kc_admin_documents", JSON.stringify(updated));
    }
    toast.success(newStatus === "Archived" ? "Document archived" : "Document restored");
  };

  return (
    <AdminLayout>
      <div className="space-y-5">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-2xl text-navy font-bold">Documents</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Manage application forms, reports, consent forms, and policy documents
            </p>
          </div>
          <button
            onClick={() => setShowAdd(true)}
            className="flex items-center gap-2 bg-navy text-white px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-navy-light transition"
          >
            <Plus size={16} />
            Add Document
          </button>
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
                  placeholder="Search documents..."
                  className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-input text-sm bg-background focus:outline-none focus:ring-2 focus:ring-navy"
                />
              </div>
            </div>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="rounded-lg border border-input px-3 py-2.5 text-sm bg-background"
            >
              <option value="">All Types</option>
              {documentTypes.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="rounded-lg border border-input px-3 py-2.5 text-sm bg-background"
            >
              <option value="">All Statuses</option>
              <option>Active</option>
              <option>Archived</option>
            </select>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((doc) => (
            <div
              key={doc.id}
              className={`bg-white rounded-xl border p-5 flex flex-col ${doc.status === "Archived" ? "opacity-60" : ""}`}
            >
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-secondary grid place-items-center shrink-0">
                  <FileText size={18} className="text-navy" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-navy truncate">{doc.name}</p>
                  <p className="text-xs text-muted-foreground">{doc.date}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mb-3">
                <span
                  className={`text-xs font-semibold px-2.5 py-1 rounded-full ${typeColors[doc.type] || typeColors.Other}`}
                >
                  {doc.type}
                </span>
                {doc.status === "Archived" && (
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-gray-100 text-gray-600">
                    Archived
                  </span>
                )}
              </div>
              <div className="text-xs text-muted-foreground space-y-1 mb-4 flex-1">
                <p>
                  <span className="font-medium">Uploaded by:</span> {doc.uploadedBy}
                </p>
                <p>
                  <span className="font-medium">Linked to:</span> {doc.linkedTo}
                </p>
              </div>
              <div className="flex gap-2 border-t pt-3">
                <button
                  onClick={() => handleArchiveToggle(doc)}
                  className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg hover:bg-secondary transition text-muted-foreground"
                >
                  <Archive size={13} />
                  {doc.status === "Archived" ? "Restore" : "Archive"}
                </button>
                <button
                  onClick={() => handleDelete(doc.id)}
                  className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg hover:bg-red-50 transition text-red-600 ml-auto"
                >
                  <Trash2 size={13} />
                  Delete
                </button>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="col-span-full text-center py-12 text-muted-foreground">
              No documents match your filters.
            </div>
          )}
        </div>
      </div>

      {showAdd && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
            <div className="border-b px-6 py-4 flex items-center justify-between">
              <h3 className="font-display text-xl text-navy font-bold">Add Document</h3>
              <button
                onClick={() => setShowAdd(false)}
                className="p-2 rounded-lg hover:bg-secondary"
              >
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleAdd} className="p-6 space-y-4">
              <label className="block">
                <span className="text-sm font-medium text-navy">Document Name</span>
                <input
                  value={newDoc.name}
                  onChange={(e) => setNewDoc({ ...newDoc, name: e.target.value })}
                  required
                  className="mt-1.5 w-full rounded-lg border border-input px-3 py-2.5 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-navy"
                  placeholder="e.g. Grade 9 Report Card — Amahle Dlamini"
                />
              </label>
              <label className="block">
                <span className="text-sm font-medium text-navy">Type</span>
                <select
                  value={newDoc.type}
                  onChange={(e) =>
                    setNewDoc({ ...newDoc, type: e.target.value as Document["type"] })
                  }
                  className="mt-1.5 w-full rounded-lg border border-input px-3 py-2.5 text-sm bg-background"
                >
                  {documentTypes.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </label>
              <label className="block">
                <span className="text-sm font-medium text-navy">Uploaded By</span>
                <input
                  value={newDoc.uploadedBy}
                  onChange={(e) => setNewDoc({ ...newDoc, uploadedBy: e.target.value })}
                  className="mt-1.5 w-full rounded-lg border border-input px-3 py-2.5 text-sm bg-background"
                />
              </label>
              <label className="block">
                <span className="text-sm font-medium text-navy">Linked To</span>
                <input
                  value={newDoc.linkedTo}
                  onChange={(e) => setNewDoc({ ...newDoc, linkedTo: e.target.value })}
                  className="mt-1.5 w-full rounded-lg border border-input px-3 py-2.5 text-sm bg-background"
                  placeholder="e.g. KC-2027-1001 or All learners"
                />
              </label>
              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  className="flex-1 bg-navy text-white py-2.5 rounded-lg font-semibold text-sm hover:bg-navy-light transition"
                >
                  Add Document
                </button>
                <button
                  type="button"
                  onClick={() => setShowAdd(false)}
                  className="flex-1 border border-input py-2.5 rounded-lg font-semibold text-sm hover:bg-secondary transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
