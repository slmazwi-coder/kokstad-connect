import { createFileRoute, useRouter } from "@tanstack/react-router";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { useState } from "react";
import { Save, Edit3, X, FileText } from "lucide-react";
import {
  getContent,
  updateContent,
  isAdminAuthenticated,
  type ContentSection,
} from "@/lib/admin-store";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/content")({
  component: AdminContent,
  head: () => ({
    meta: [{ title: "Content Management — Admin Portal" }],
  }),
});

function AdminContent() {
  const router = useRouter();
  const [sections, setSections] = useState(getContent);
  const [editing, setEditing] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");
  const [filterPage, setFilterPage] = useState("");

  if (typeof window !== "undefined" && !isAdminAuthenticated()) {
    router.navigate({ to: "/admin" });
    return null;
  }

  const pages = [...new Set(sections.map((s) => s.page))];

  const filtered = filterPage ? sections.filter((s) => s.page === filterPage) : sections;

  const grouped = filtered.reduce<Record<string, ContentSection[]>>((acc, s) => {
    if (!acc[s.page]) acc[s.page] = [];
    acc[s.page].push(s);
    return acc;
  }, {});

  const startEdit = (section: ContentSection) => {
    setEditing(section.id);
    setEditValue(section.content);
  };

  const saveEdit = (id: string) => {
    const updated = updateContent(id, editValue);
    setSections(updated);
    setEditing(null);
    toast.success("Content updated");
  };

  const cancelEdit = () => {
    setEditing(null);
    setEditValue("");
  };

  return (
    <AdminLayout>
      <div className="space-y-5">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-2xl text-navy font-bold">Content Management</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Edit website text content across all pages
            </p>
          </div>
          <select
            value={filterPage}
            onChange={(e) => setFilterPage(e.target.value)}
            className="rounded-lg border border-input px-3 py-2.5 text-sm bg-white"
          >
            <option value="">All Pages</option>
            {pages.map((p) => (
              <option key={p}>{p}</option>
            ))}
          </select>
        </div>

        {Object.entries(grouped).map(([page, items]) => (
          <div key={page} className="bg-white rounded-xl border overflow-hidden">
            <div className="px-5 py-4 border-b bg-secondary/50 flex items-center gap-3">
              <FileText size={18} className="text-navy" />
              <h3 className="font-display text-lg text-navy font-semibold">{page} Page</h3>
              <span className="text-xs text-muted-foreground ml-auto">
                {items.length} section{items.length !== 1 ? "s" : ""}
              </span>
            </div>
            <div className="divide-y">
              {items.map((section) => (
                <div key={section.id} className="px-5 py-4">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div>
                      <p className="text-sm font-semibold text-navy">{section.section}</p>
                      <p className="text-xs text-muted-foreground">
                        Last updated: {section.lastUpdated}
                      </p>
                    </div>
                    {editing !== section.id && (
                      <button
                        onClick={() => startEdit(section)}
                        className="flex items-center gap-1.5 text-xs font-semibold text-navy hover:text-gold transition px-3 py-1.5 rounded-lg hover:bg-secondary shrink-0"
                      >
                        <Edit3 size={14} />
                        Edit
                      </button>
                    )}
                  </div>

                  {editing === section.id ? (
                    <div className="space-y-3">
                      <textarea
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        rows={Math.max(3, editValue.split("\n").length + 1)}
                        className="w-full rounded-lg border border-navy/30 px-4 py-3 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-navy"
                        autoFocus
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={() => saveEdit(section.id)}
                          className="flex items-center gap-1.5 bg-navy text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-navy-light transition"
                        >
                          <Save size={14} />
                          Save
                        </button>
                        <button
                          onClick={cancelEdit}
                          className="flex items-center gap-1.5 border border-input px-4 py-2 rounded-lg text-sm font-semibold hover:bg-secondary transition"
                        >
                          <X size={14} />
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {section.content}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
}
