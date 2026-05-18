import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { GraduationCap, Eye, EyeOff, ArrowLeft } from "lucide-react";
import { adminLogin, isAdminAuthenticated } from "@/lib/admin-store";

export const Route = createFileRoute("/admin/")({
  component: AdminLogin,
  head: () => ({
    meta: [{ title: "Admin Login — Kokstad College" }],
  }),
});

function AdminLogin() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");

  if (typeof window !== "undefined" && isAdminAuthenticated()) {
    router.navigate({ to: "/admin/dashboard" });
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (adminLogin(password)) {
      router.navigate({ to: "/admin/dashboard" });
    } else {
      setError("Invalid password");
    }
  };

  return (
    <div className="min-h-screen gradient-navy flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-20 h-20 rounded-2xl bg-gold grid place-items-center mx-auto shadow-xl">
            <GraduationCap className="text-navy" size={40} />
          </div>
          <h1 className="font-display text-3xl text-white mt-6 font-bold">Admin Portal</h1>
          <p className="text-white/60 text-sm mt-2">Kokstad College — Consiste Fide</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-2xl p-8 space-y-5">
          <div>
            <label className="block text-sm font-medium text-navy mb-1.5">Password</label>
            <div className="relative">
              <input
                type={showPw ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full rounded-lg border border-input bg-background px-4 py-3 pr-11 text-sm focus:outline-none focus:ring-2 focus:ring-navy"
                placeholder="Enter password"
                autoFocus
              />
              <button
                type="button"
                onClick={() => setShowPw(!showPw)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-navy"
              >
                {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {error && <p className="text-sm text-red-600 bg-red-50 rounded-lg px-4 py-2">{error}</p>}

          <button
            type="submit"
            className="w-full bg-navy text-white py-3 rounded-lg font-semibold hover:bg-navy-light transition"
          >
            Sign In
          </button>

          <p className="text-xs text-center text-muted-foreground">
            Contact the school office if you need access credentials.
          </p>
        </form>

        <div className="text-center mt-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-gold transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Website
          </Link>
        </div>
      </div>
    </div>
  );
}
