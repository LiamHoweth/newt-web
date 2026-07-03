"use client";

import { useState, FormEvent } from "react";
import { Loader2, Lock } from "lucide-react";
import { getAdminUrlDisplay } from "@/lib/utils";

interface AdminLoginProps {
  onSuccess: () => void;
}

export default function AdminLogin({ onSuccess }: AdminLoginProps) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const adminUrl = getAdminUrlDisplay();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error ?? "Login failed");
        return;
      }

      onSuccess();
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-sm">
      <div className="rounded-lg border border-gray-200 bg-white p-8 shadow-sm">
        <div className="flex items-center gap-2 text-charcoal">
          <Lock className="h-5 w-5" aria-hidden />
          <h1 className="text-lg font-bold">Owner Login</h1>
        </div>
        <p className="mt-2 text-sm text-charcoal-muted">
          Enter your admin password to access the dashboard.
        </p>
        <p className="mt-3 rounded-md bg-gray-50 px-3 py-2 text-sm text-charcoal">
          Owner login:{" "}
          <span className="font-semibold">{adminUrl}</span>
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {error && (
            <div className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700" role="alert">
              {error}
            </div>
          )}
          <div>
            <label htmlFor="admin-password" className="label-text">
              Password
            </label>
            <input
              id="admin-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field"
              required
              autoComplete="current-password"
            />
          </div>
          <button type="submit" disabled={loading} className="btn-primary w-full">
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                Signing in…
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
