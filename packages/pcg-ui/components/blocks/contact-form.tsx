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

const inputStyle: React.CSSProperties = {
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.1)",
  color: "#ffffff",
};

export function ContactForm({
  sections,
  onSubmit,
  submitLabel = "Send Message",
  loadingLabel = "Sending...",
  successTitle = "Message Sent",
  successMessage = "We'll get back to you within 24 hours.",
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
    const label = (
      <label className="mb-1.5 block text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
        {field.label}
        {field.required && <span className="ml-1" style={{ color: "#ffffff" }}>*</span>}
      </label>
    );

    const className =
      "w-full rounded-sm px-4 py-3 text-sm outline-none transition-colors focus:border-white";

    if (field.type === "textarea") {
      return (
        <div key={field.name}>
          {label}
          <textarea
            rows={5}
            required={field.required}
            value={formData[field.name] || ""}
            onChange={(e) => updateField(field.name, e.target.value)}
            className={`${className} resize-none`}
            style={inputStyle}
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
            className={`${className} cursor-pointer appearance-none`}
            style={inputStyle}
          >
            <option value="" style={{ background: "#1a1a1a" }}>
              {field.placeholder || "Select an option"}
            </option>
            {field.options.map((opt) => (
              <option key={opt} value={opt} style={{ background: "#1a1a1a" }}>
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
          className={className}
          style={inputStyle}
          placeholder={field.placeholder}
        />
      </div>
    );
  }

  return (
    <div
      className={`rounded-xl p-6 backdrop-blur-xl sm:p-8 ${className}`}
      style={{
        background: "rgba(255,255,255,0.06)",
        border: "1px solid rgba(255,255,255,0.1)",
        color: "rgba(255,255,255,0.88)",
      }}
    >
      {status === "success" ? (
        <div className="py-12 text-center">
          <div
            className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full"
            style={{ background: "rgba(255,255,255,0.2)" }}
          >
            <svg className="h-8 w-8" style={{ color: "#ffffff" }} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="mb-2 font-semibold uppercase tracking-wide text-white" style={{ fontSize: "1.5rem" }}>
            {successTitle}
          </h3>
          <p className="mb-6" style={{ color: "rgba(255,255,255,0.6)" }}>
            {successMessage}
          </p>
          <button
            onClick={() => setStatus("idle")}
            className="text-sm underline-offset-4 hover:underline"
            style={{ color: "#ffffff" }}
          >
            {resetLabel}
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          {sections.map((section, si) => (
            <div key={si} className="space-y-5">
              {section.title && (
                <h3 className="text-lg font-semibold uppercase tracking-wide text-white">
                  {section.title}
                </h3>
              )}
              <div className="grid gap-5 sm:grid-cols-2">
                {section.fields.map((field) => {
                  const isFullWidth = field.type === "textarea" || field.halfWidth === false;
                  return (
                    <div key={field.name} className={isFullWidth ? "sm:col-span-2" : ""}>
                      {renderField(field)}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

          {status === "error" && (
            <p className="text-sm" style={{ color: "#ffffff" }}>{errorMessage}</p>
          )}

          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full rounded-sm py-3 font-semibold uppercase tracking-wider transition-all hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
            style={{ backgroundColor: "#ffffff", color: "#000000" }}
          >
            {status === "loading" ? loadingLabel : submitLabel}
          </button>
        </form>
      )}
    </div>
  );
}

export default ContactForm;
