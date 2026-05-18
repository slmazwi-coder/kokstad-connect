import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { GraduationCap, Eye, EyeOff } from "lucide-react";
import { adminLogin, isAdminAuthenticated } from "@/lib/admin-store";

export const Route = createFileRoute("/admin/")({
  component: AdminLogin,
  head: () => ({
    meta: [{ title: "Admin Login — Kokstad College" }],
  }),
});

function AdminLogin() {
  const router = useRouter();
  const [username, setUsername] = useState("");
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
    if (adminLogin(username, password)) {
      router.navigate({ to: "/admin/dashboard" });
    } else {
      setError("Invalid username or password");
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
            <label className="block text-sm font-medium text-navy mb-1.5">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoFocus
              className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-navy"
              placeholder="Enter username"
            />
          </div>
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
      </div>
    </div>
  );
}
