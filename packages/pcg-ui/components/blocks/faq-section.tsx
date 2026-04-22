"use client";

import { useState } from "react";

export interface FAQItem {
  id?: string;
  question: string;
  answer: string;
  category?: string;
}

export interface FAQSectionProps {
  heading?: string;
  highlight?: string;
  description?: string;
  items: FAQItem[];
  showCategories?: boolean;
  allowMultiple?: boolean;
  className?: string;
}

export function FAQSection({
  heading,
  highlight,
  description,
  items,
  showCategories = false,
  allowMultiple = false,
  className = "",
}: FAQSectionProps) {
  const [openIndices, setOpenIndices] = useState<Set<number>>(new Set());
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  if (!items || items.length === 0) return null;

  const categories = showCategories
    ? (Array.from(new Set(items.map((i) => i.category).filter(Boolean))) as string[])
    : [];

  const filteredItems = activeCategory
    ? items.filter((item) => item.category === activeCategory)
    : items;

  function toggleItem(index: number) {
    setOpenIndices((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else {
        if (!allowMultiple) next.clear();
        next.add(index);
      }
      return next;
    });
  }

  return (
    <section
      className={`px-6 py-20 ${className}`}
      style={{ backgroundColor: "#0d0d0d", color: "rgba(255,255,255,0.88)" }}
    >
      <div className="mx-auto max-w-3xl">
        {heading && (
          <h2
            className="mb-10 text-center font-semibold uppercase tracking-wide text-white"
            style={{ fontSize: "clamp(2rem, 5vw, 3rem)", lineHeight: 0.95 }}
          >
            {heading}
            {highlight && (
              <>
                {" "}
                <span style={{ color: "#ffffff" }}>{highlight}</span>
              </>
            )}
          </h2>
        )}

        {description && (
          <p
            className="mx-auto mb-10 max-w-2xl text-center text-base"
            style={{ color: "rgba(255,255,255,0.6)" }}
          >
            {description}
          </p>
        )}

        {showCategories && categories.length > 1 && (
          <div className="mb-10 flex flex-wrap justify-center gap-2">
            <button
              onClick={() => setActiveCategory(null)}
              className="rounded-sm px-5 py-2 text-xs font-semibold uppercase tracking-wider transition-all"
              style={
                activeCategory === null
                  ? { backgroundColor: "#ffffff", color: "#000000" }
                  : {
                      border: "1px solid rgba(255,255,255,0.1)",
                      color: "rgba(255,255,255,0.6)",
                      backgroundColor: "transparent",
                    }
              }
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="rounded-sm px-5 py-2 text-xs font-semibold uppercase tracking-wider transition-all"
                style={
                  activeCategory === cat
                    ? { backgroundColor: "#ffffff", color: "#000000" }
                    : {
                        border: "1px solid rgba(255,255,255,0.1)",
                        color: "rgba(255,255,255,0.6)",
                        backgroundColor: "transparent",
                      }
                }
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        <div className="space-y-3">
          {filteredItems.map((item, index) => {
            const isOpen = openIndices.has(index);
            return (
              <div
                key={item.id || index}
                className="overflow-hidden rounded-lg backdrop-blur-xl"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                <button
                  type="button"
                  onClick={() => toggleItem(index)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm font-medium text-white sm:text-base">
                    {item.question}
                  </span>
                  <svg
                    className="h-5 w-5 shrink-0 transition-transform duration-300"
                    style={{
                      color: "#ffffff",
                      transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                    }}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div
                  className="grid transition-all duration-300 ease-in-out"
                  style={{
                    gridTemplateRows: isOpen ? "1fr" : "0fr",
                    opacity: isOpen ? 1 : 0,
                  }}
                >
                  <div className="overflow-hidden">
                    <p
                      className="px-5 pb-4 text-sm leading-relaxed"
                      style={{ color: "rgba(255,255,255,0.6)" }}
                    >
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default FAQSection;
