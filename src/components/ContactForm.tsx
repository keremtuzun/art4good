"use client";

import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Dictionary } from "@/lib/i18n";
import { GET_INVOLVED, CONTACT_EMAIL } from "@/content/data";

type Errors = Partial<Record<"name" | "email" | "consent", string>>;

export default function ContactForm({
  dict,
  defaultInterest,
}: {
  dict: Dictionary;
  defaultInterest?: string;
}) {
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const [errors, setErrors] = useState<Errors>({});

  function validate(form: HTMLFormElement): Errors {
    const e: Errors = {};
    const name = (form.elements.namedItem("name") as HTMLInputElement)?.value.trim();
    const email = (form.elements.namedItem("email") as HTMLInputElement)?.value.trim();
    const consent = (form.elements.namedItem("consent") as HTMLInputElement)?.checked;
    if (!name) e.name = dict.forms.errorRequired;
    if (!email) e.email = dict.forms.errorRequired;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = dict.forms.errorEmail;
    if (!consent) e.consent = dict.forms.errorConsent;
    return e;
  }

  async function onSubmit(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const form = ev.currentTarget;
    // Honeypot: if the hidden field is filled, silently drop it (bot).
    const honey = (form.elements.namedItem("company") as HTMLInputElement)?.value;
    const found = validate(form);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setStatus("sending");

    const get = (n: string) => (form.elements.namedItem(n) as HTMLInputElement | HTMLTextAreaElement | null)?.value?.trim() ?? "";
    const name = get("name");
    const email = get("email");
    const org = get("org");
    const interestId = get("interest");
    const interest = interestId
      ? dict.getInvolved.options[interestId as keyof typeof dict.getInvolved.options]?.title ?? interestId
      : "";
    const message = get("message");

    if (!honey) {
      // Direct the enquiry to Art4Good's inbox via the visitor's mail client.
      const subject = `Art4Good enquiry${interest ? ` - ${interest}` : ""} from ${name}`;
      const bodyLines = [
        `Name: ${name}`,
        `Email: ${email}`,
        org ? `Organisation / school: ${org}` : "",
        interest ? `Interest: ${interest}` : "",
        "",
        message,
      ].filter(Boolean);
      const href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
        bodyLines.join("\n")
      )}`;
      window.location.href = href;
    }

    setStatus("done");
    form.reset();
  }

  return (
    <div className="card p-6 sm:p-8">
      <AnimatePresence mode="wait">
        {status === "done" ? (
          <motion.div
            key="done"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="py-8 text-center"
          >
            <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-brand-green/15 text-brand-green">
              <svg viewBox="0 0 24 24" width="30" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M20 6 9 17l-5-5" />
              </svg>
            </span>
            <h3 className="mt-4 text-2xl">{dict.forms.successTitle}</h3>
            <p className="mt-2 text-muted">{dict.forms.successBody}</p>
            <button type="button" onClick={() => setStatus("idle")} className="btn btn-ghost mt-6">
              {dict.forms.another}
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onSubmit={onSubmit}
            noValidate
            className="grid gap-4"
          >
            <Field label={dict.forms.name} name="name" error={errors.name} required autoComplete="name" />
            <Field label={dict.forms.email} name="email" type="email" error={errors.email} required autoComplete="email" />
            <Field label={dict.forms.org} name="org" autoComplete="organization" />

            <label className="grid gap-1.5">
              <span className="text-sm font-semibold text-ink">{dict.forms.interest}</span>
              <select
                name="interest"
                defaultValue={defaultInterest ?? ""}
                className="rounded-xl border border-line bg-cream px-4 py-3 outline-none focus:border-brand-blue"
              >
                <option value="">, </option>
                {GET_INVOLVED.map((o) => (
                  <option key={o.id} value={o.id}>
                    {dict.getInvolved.options[o.id as keyof typeof dict.getInvolved.options].title}
                  </option>
                ))}
              </select>
            </label>

            <label className="grid gap-1.5">
              <span className="text-sm font-semibold text-ink">{dict.forms.message}</span>
              <textarea
                name="message"
                rows={4}
                className="resize-y rounded-xl border border-line bg-cream px-4 py-3 outline-none focus:border-brand-blue"
              />
            </label>

            {/* Honeypot, hidden from users, catches bots */}
            <div className="absolute -left-[9999px]" aria-hidden>
              <label>
                {dict.forms.honeypotLabel}
                <input type="text" name="company" tabIndex={-1} autoComplete="off" />
              </label>
            </div>

            <label className="flex items-start gap-2.5 text-sm text-muted">
              <input type="checkbox" name="consent" className="mt-1 h-4 w-4 flex-none accent-brand-red" />
              <span>
                {dict.forms.consent}
                {errors.consent && <span className="mt-1 block text-brand-red">{errors.consent}</span>}
              </span>
            </label>

            <button type="submit" disabled={status === "sending"} className="btn btn-accent mt-1 justify-self-start disabled:opacity-70">
              {status === "sending" ? dict.forms.sending : dict.forms.submit}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  error,
  required,
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  error?: string;
  required?: boolean;
  autoComplete?: string;
}) {
  return (
    <label className="grid gap-1.5">
      <span className="text-sm font-semibold text-ink">
        {label}
        {required && <span className="text-brand-red"> *</span>}
      </span>
      <input
        type={type}
        name={name}
        required={required}
        autoComplete={autoComplete}
        aria-invalid={!!error}
        className="rounded-xl border border-line bg-cream px-4 py-3 outline-none focus:border-brand-blue"
      />
      {error && <span className="text-sm text-brand-red">{error}</span>}
    </label>
  );
}
