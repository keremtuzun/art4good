"use client";

import { FormEvent, useState } from "react";

export default function AdminLogin({ configured }: { configured: boolean }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError("");
    const response = await fetch("/api/culturecanvas/admin/session", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ password }) });
    if (response.ok) window.location.reload();
    else { const data = (await response.json()) as { error?: string }; setError(data.error ?? "Giriş yapılamadı."); setBusy(false); }
  }

  return <div className="min-h-screen bg-[#173969] px-5 pb-20 pt-32 text-white"><div className="mx-auto max-w-md rounded-[40px] bg-[#fff8e8] p-8 text-[#173969] shadow-lift"><span className="text-6xl">🔐</span><p className="mt-6 text-xs font-extrabold uppercase tracking-[.2em] text-[#d94c42]">Art4Good iç alanı</p><h1 className="mt-3 text-4xl font-semibold">CultureCanvas Veri Stüdyosu</h1>{configured ? <form onSubmit={submit} className="mt-8"><label htmlFor="admin-password" className="text-sm font-extrabold">Yönetici parolası</label><input id="admin-password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} className="mt-2 w-full rounded-2xl border-2 border-[#173969]/15 bg-white px-5 py-4" autoComplete="current-password" />{error ? <p className="mt-3 text-sm font-bold text-[#c63f38]">{error}</p> : null}<button disabled={busy} className="mt-5 w-full rounded-full bg-[#173969] px-5 py-4 font-extrabold text-white disabled:opacity-60">{busy ? "Kontrol ediliyor…" : "Stüdyoya gir"}</button></form> : <div className="mt-7 rounded-2xl bg-[#f2bd3c]/30 p-5 text-sm leading-relaxed"><strong>Erişim henüz yapılandırılmadı.</strong><p className="mt-2">Vercel projesine <code className="font-bold">CULTURECANVAS_ADMIN_SECRET</code> adlı gizli ortam değişkeni eklendiğinde bu alan açılır.</p></div>}</div></div>;
}
