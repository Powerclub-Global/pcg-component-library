"use client";

import { useState } from "react";

export interface ContactFormField {
  name: string;
  label: string;
  type: "text" | "email" | "tel" | "textarea" | "select" | "date" | "number";
  placeholder?: string;
  required?: boolean;
  options?: string[];
  halfWidth?: boolean;
}

export interface ContactFormSection {
  title?: string;
  fields: ContactFormField[];
}

export interface ContactFormProps {
  sections: ContactFormSection[];
  onSubmit: (data: Record<string, string>) => Promise<void>;
  submitLabel?: string;
  loadingLabel?: string;
  successTitle?: string;
  successMessage?: string;
  errorMessage?: string;
  resetLabel?: string;
  className?: string;
}

export function ContactForm({
  sections,
  onSubmit,
  submitLabel = "Send Message",
  loadingLabel = "Sending...",
  successTitle = "Message Received!",
  successMessage = "Thank you for reaching out. We will be in touch soon.",
  errorMessage = "Something went wrong. Please try again.",
  resetLabel = "Send another message",
  className = "",
}: ContactFormProps) {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  function updateField(name: string, value: string) {
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");

    try {
      await onSubmit(formData);
      setStatus("success");
      setFormData({});
    } catch {
      setStatus("error");
    }
  }

  function renderField(field: ContactFormField) {
    const baseClass =
      "w-full px-4 py-3 rounded-lg border border-[var(--color-border,#e5e5e5)] bg-[var(--color-surface,#ffffff)] text-[var(--color-text,#1a1a1a)] placeholder-[var(--color-text-muted,#999)] focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent outline-none transition-all";

    const label = (
      <label className="block text-sm font-semibold text-[var(--color-text,#1a1a1a)] mb-2">
        {field.label}
        {field.required && " *"}
      </label>
    );

    if (field.type === "textarea") {
      return (
        <div key={field.name}>
          {label}
          <textarea
            rows={5}
            required={field.required}
            value={formData[field.name] || ""}
            onChange={(e) => updateField(field.name, e.target.value)}
            className={baseClass}
            placeholder={field.placeholder}
          />
        </div>
      );
    }

    if (field.type === "select" && field.options) {
      return (
        <div key={field.name}>
          {label}
          <select
            required={field.required}
            value={formData[field.name] || ""}
            onChange={(e) => updateField(field.name, e.target.value)}
            className={baseClass}
          >
            <option value="">{field.placeholder || "Select an option"}</option>
            {field.options.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
      );
    }

    return (
      <div key={field.name}>
        {label}
        <input
          type={field.type}
          required={field.required}
          value={formData[field.name] || ""}
          onChange={(e) => updateField(field.name, e.target.value)}
          className={baseClass}
          placeholder={field.placeholder}
        />
      </div>
    );
  }

  return (
    <div
      className={`rounded-2xl border border-[var(--color-border,#e5e5e5)] bg-[var(--color-surface,#ffffff)] p-8 md:p-12 ${className}`}
    >
      {status === "success" ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-[var(--color-accent)] rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-[var(--color-text,#1a1a1a)] mb-4">
            {successTitle}
          </h2>
          <p className="text-[var(--color-text-muted,#666)] text-lg mb-8">
            {successMessage}
          </p>
          <button
            onClick={() => setStatus("idle")}
            className="text-[var(--color-accent)] font-medium hover:underline transition-colors"
          >
            {resetLabel}
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-8">
          {sections.map((section, si) => (
            <div key={si}>
              {section.title && (
                <h3 className="text-lg font-bold text-[var(--color-text,#1a1a1a)] mb-4">
                  {section.title}
                </h3>
              )}
              <div className="grid md:grid-cols-2 gap-6">
                {section.fields.map((field) => {
                  const isFullWidth = field.type === "textarea" || field.halfWidth === false;
                  return (
                    <div key={field.name} className={isFullWidth ? "md:col-span-2" : ""}>
                      {renderField(field)}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

          {status === "error" && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-800 text-sm">
              {errorMessage}
            </div>
          )}

          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover,var(--color-accent))] text-white font-bold py-4 rounded-xl transition-all duration-300 hover:shadow-lg disabled:opacity-50"
          >
            {status === "loading" ? loadingLabel : submitLabel}
          </button>
        </form>
      )}
    </div>
  );
}

export default ContactForm;
