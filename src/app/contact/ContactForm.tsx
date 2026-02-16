"use client";

import { useLanguage } from "@/context/LanguageContext";
import { useState, FormEvent } from "react";

export default function ContactForm() {
  const { t } = useLanguage();
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          phone: formData.get("phone"),
          subject: formData.get("subject"),
          message: formData.get("message"),
        }),
      });

      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">
          {t.contact.name}
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition"
          placeholder={t.contact.name}
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
          {t.contact.email}
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition"
          placeholder={t.contact.email}
        />
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-1">
          {t.contact.phone}
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition"
          placeholder={t.contact.phone}
        />
      </div>

      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-slate-700 mb-1">
          {t.contact.subject}
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition"
          placeholder={t.contact.subject}
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-1">
          {t.contact.message}
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={4}
          className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition resize-none"
          placeholder={t.contact.message}
        />
      </div>

      {status === "success" && (
        <div className="p-4 rounded-lg bg-green-50 text-green-700 text-sm">
          {t.contact.success}
        </div>
      )}

      {status === "error" && (
        <div className="p-4 rounded-lg bg-red-50 text-red-700 text-sm">
          {t.contact.error}
        </div>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full py-4 px-6 bg-sky-500 text-white font-semibold rounded-lg hover:bg-sky-600 disabled:opacity-70 disabled:cursor-not-allowed transition-colors"
      >
        {status === "loading" ? "..." : t.contact.send}
      </button>
    </form>
  );
}
