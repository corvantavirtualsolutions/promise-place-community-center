"use client";

import { useState } from "react";
import { Lock, Alert, ArrowRight } from "@/components/Icons";

export default function AdminLogin() {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    if (busy) return;
    setBusy(true);
    setError("");

    const f = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: f.get("email"), password: f.get("password") }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error || "Sign-in failed.");
        setBusy(false);
        return;
      }
      // full reload so the server component re-runs its own auth check
      window.location.href = "/admin";
    } catch {
      setError("Couldn't reach the server.");
      setBusy(false);
    }
  }

  return (
    <div className="adminlogin">
      <div className="adminlogin__card">
        <span className="chip chip--teal"><Lock /></span>
        <h1>Staff sign-in</h1>
        <p>This page is for Promise Place staff. Inquiries from the website are listed here.</p>

        <form onSubmit={onSubmit}>
          {error && (
            <div className="form__error" role="alert">
              <Alert />
              <p>{error}</p>
            </div>
          )}

          <div className="field">
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" autoComplete="username" required />
          </div>

          <div className="field">
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" autoComplete="current-password" required />
          </div>

          <button className="btn btn-primary btn-block" type="submit" disabled={busy}>
            {busy ? "Signing in…" : <>Sign In <ArrowRight /></>}
          </button>
        </form>
      </div>
    </div>
  );
}
