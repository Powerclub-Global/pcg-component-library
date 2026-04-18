"use client";

import { useState } from "react";

export interface NewsletterSignupProps {
  variant?: "inline" | "card" | "footer";
  title?: string;
  description?: string;
  placeholder?: string;
  buttonLabel?: string;
  onSubmit: (email: string) => Promise<{ message?: string; error?: string }>;
  className?: string;
}

export function NewsletterSignup({
  variant = "inline",
  title = "Subscribe to Our Newsletter",
  description = "Get the latest updates delivered directly to your inbox.",
  placeholder = "Enter your email",
  buttonLabel = "Subscribe",
  onSubmit,
  className = "",
}: NewsletterSignupProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    setMessage("");

    try {
      const result = await onSubmit(email);
      if (result.error) {
        setStatus("error");
        setMessage(result.error);
      } else {
        setStatus("success");
        setMessage(result.message || "Successfully subscribed!");
        setEmail("");
      }
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  }

  if (variant === "card") {
    return (
      <div className={`p-8 rounded-xl border border-[var(--color-border,#e5e5e5)] bg-[var(--color-surface,#ffffff)] text-center ${className}`}>
        <h3 className="text-xl font-bold text-[var(--color-text,#1a1a1a)] mb-2">{title}</h3>
        <p className="text-[var(--color-text-muted,#666)] mb-6">{description}</p>

        {status === "success" ? (
          <div className="bg-green-50 text-green-700 px-4 py-3 rounded-lg text-sm">{message}</div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={placeholder}
              className="w-full px-4 py-3 rounded-lg border border-[var(--color-border,#e5e5e5)] focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent outline-none"
              disabled={status === "loading"}
              required
            />
            <button
              type="submit"
              className="w-full bg-[var(--color-accent)] text-white py-3 rounded-lg font-semibold transition-all hover:shadow-lg disabled:opacity-50"
              disabled={status === "loading"}
            >
              {status === "loading" ? "Subscribing..." : buttonLabel}
            </button>
            {status === "error" && (
              <p className="text-red-500 text-sm">{message}</p>
            )}
          </form>
        )}
      </div>
    );
  }

  if (variant === "footer") {
    return (
      <div className={className}>
        <h4 className="font-bold mb-4">{title}</h4>
        <p className="text-white/60 text-sm mb-4">{description}</p>

        {status === "success" ? (
          <p className="text-green-400 text-sm">{message}</p>
        ) : (
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={placeholder}
              className="flex-1 px-3 py-2 rounded bg-white/10 border border-white/20 text-white placeholder-white/50 text-sm focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent outline-none"
              disabled={status === "loading"}
              required
            />
            <button
              type="submit"
              className="px-4 py-2 bg-[var(--color-accent)] text-white rounded text-sm font-medium transition-colors disabled:opacity-50"
              disabled={status === "loading"}
            >
              {status === "loading" ? "..." : "Join"}
            </button>
          </form>
        )}
        {status === "error" && (
          <p className="text-red-400 text-sm mt-2">{message}</p>
        )}
      </div>
    );
  }

  // inline (default)
  return (
    <div className={`text-center ${className}`}>
      <h3 className="text-2xl font-bold text-[var(--color-text,#1a1a1a)] mb-2">{title}</h3>
      <p className="text-[var(--color-text-muted,#666)] mb-6 max-w-xl mx-auto">{description}</p>

      {status === "success" ? (
        <div className="bg-green-50 text-green-700 px-6 py-3 rounded-lg inline-block text-sm">
          {message}
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto flex gap-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={placeholder}
            className="flex-1 px-4 py-3 rounded-lg border border-[var(--color-border,#e5e5e5)] focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent outline-none"
            disabled={status === "loading"}
            required
          />
          <button
            type="submit"
            className="bg-[var(--color-accent)] text-white px-6 py-3 rounded-lg font-semibold transition-all hover:shadow-lg disabled:opacity-50"
            disabled={status === "loading"}
          >
            {status === "loading" ? "..." : buttonLabel}
          </button>
        </form>
      )}
      {status === "error" && (
        <p className="text-red-500 text-sm mt-3">{message}</p>
      )}
    </div>
  );
}

export default NewsletterSignup;
