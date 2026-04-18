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
  description?: string;
  items: FAQItem[];
  showCategories?: boolean;
  allowMultiple?: boolean;
  className?: string;
}

export function FAQSection({
  heading,
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
    ? Array.from(new Set(items.map((item) => item.category).filter(Boolean))) as string[]
    : [];

  const filteredItems = activeCategory
    ? items.filter((item) => item.category === activeCategory)
    : items;

  function toggleItem(index: number) {
    setOpenIndices((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        if (!allowMultiple) next.clear();
        next.add(index);
      }
      return next;
    });
  }

  return (
    <section className={`py-16 lg:py-24 ${className}`}>
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {heading && (
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--color-text,#1a1a1a)] mb-4 text-center">
            {heading}
          </h2>
        )}
        {description && (
          <p className="text-lg text-[var(--color-text-muted,#666)] mb-12 text-center max-w-2xl mx-auto">
            {description}
          </p>
        )}

        {/* Category Filters */}
        {showCategories && categories.length > 1 && (
          <div className="flex flex-wrap gap-2 justify-center mb-10">
            <button
              onClick={() => setActiveCategory(null)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === null
                  ? "bg-[var(--color-accent)] text-white"
                  : "bg-[var(--color-surface,#f5f5f5)] text-[var(--color-text-muted,#666)] hover:bg-[var(--color-surface-dark,#e5e5e5)]"
              }`}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === cat
                    ? "bg-[var(--color-accent)] text-white"
                    : "bg-[var(--color-surface,#f5f5f5)] text-[var(--color-text-muted,#666)] hover:bg-[var(--color-surface-dark,#e5e5e5)]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* Accordion */}
        <div className="space-y-4">
          {filteredItems.map((item, index) => {
            const isOpen = openIndices.has(index);
            return (
              <div
                key={item.id || index}
                className="overflow-hidden rounded-xl border border-[var(--color-border,#e5e5e5)] transition-all duration-300"
              >
                <button
                  type="button"
                  onClick={() => toggleItem(index)}
                  className="flex w-full items-center justify-between px-6 py-5 text-left transition-all duration-300 hover:bg-[var(--color-surface,#f9f9f9)]"
                  aria-expanded={isOpen}
                >
                  <span className="text-base sm:text-lg font-medium text-[var(--color-text,#1a1a1a)] pr-4">
                    {item.question}
                  </span>
                  <svg
                    className={`w-5 h-5 flex-shrink-0 text-[var(--color-accent)] transition-transform duration-300 ${
                      isOpen ? "rotate-45" : "rotate-0"
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </button>
                {isOpen && (
                  <div className="px-6 pb-5 text-[var(--color-text-muted,#666)] leading-relaxed">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default FAQSection;
