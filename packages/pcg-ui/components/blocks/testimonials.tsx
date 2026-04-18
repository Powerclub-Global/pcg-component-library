"use client";

import { useState } from "react";

export interface Testimonial {
  quote: string;
  author: string;
  role?: string;
  company?: string;
  avatar?: string;
  rating?: 1 | 2 | 3 | 4 | 5;
}

export interface TestimonialsProps {
  heading?: string;
  description?: string;
  testimonials: Testimonial[];
  layout?: "grid" | "carousel";
  columns?: 2 | 3;
  className?: string;
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5 mb-3">
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          className={`w-5 h-5 ${i < rating ? "text-[var(--color-accent)]" : "text-[var(--color-border,#e5e5e5)]"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="flex flex-col p-6 lg:p-8 rounded-xl border border-[var(--color-border,#e5e5e5)] bg-[var(--color-surface,#ffffff)]">
      {testimonial.rating && <StarRating rating={testimonial.rating} />}

      <blockquote className="text-[var(--color-text,#1a1a1a)] leading-relaxed mb-6 flex-1">
        &ldquo;{testimonial.quote}&rdquo;
      </blockquote>

      <div className="flex items-center gap-3">
        {testimonial.avatar ? (
          <img
            src={testimonial.avatar}
            alt={testimonial.author}
            className="w-10 h-10 rounded-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-[var(--color-accent)]/10 text-[var(--color-accent)] flex items-center justify-center font-bold text-sm">
            {testimonial.author.charAt(0).toUpperCase()}
          </div>
        )}
        <div>
          <div className="font-semibold text-sm text-[var(--color-text,#1a1a1a)]">
            {testimonial.author}
          </div>
          {(testimonial.role || testimonial.company) && (
            <div className="text-xs text-[var(--color-text-muted,#666)]">
              {[testimonial.role, testimonial.company].filter(Boolean).join(", ")}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function Testimonials({
  heading,
  description,
  testimonials,
  layout = "grid",
  columns = 3,
  className = "",
}: TestimonialsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!testimonials || testimonials.length === 0) return null;

  const colsClass = columns === 2 ? "md:grid-cols-2" : "md:grid-cols-2 lg:grid-cols-3";

  return (
    <section className={`py-16 lg:py-24 ${className}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {(heading || description) && (
          <div className="text-center mb-12 lg:mb-16">
            {heading && (
              <h2 className="text-3xl sm:text-4xl font-bold text-[var(--color-text,#1a1a1a)] mb-4">
                {heading}
              </h2>
            )}
            {description && (
              <p className="text-lg text-[var(--color-text-muted,#666)] max-w-2xl mx-auto">
                {description}
              </p>
            )}
          </div>
        )}

        {layout === "grid" ? (
          <div className={`grid gap-6 lg:gap-8 ${colsClass}`}>
            {testimonials.map((t, i) => (
              <TestimonialCard key={i} testimonial={t} />
            ))}
          </div>
        ) : (
          /* Carousel */
          <div className="relative">
            <div className="overflow-hidden">
              <div className="max-w-2xl mx-auto">
                <TestimonialCard testimonial={testimonials[currentIndex]} />
              </div>
            </div>

            {/* Navigation */}
            {testimonials.length > 1 && (
              <div className="flex items-center justify-center gap-4 mt-8">
                <button
                  type="button"
                  onClick={() => setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))}
                  className="p-2 rounded-full border border-[var(--color-border,#e5e5e5)] hover:bg-[var(--color-surface,#f5f5f5)] transition-colors"
                  aria-label="Previous testimonial"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                <div className="flex gap-2">
                  {testimonials.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setCurrentIndex(i)}
                      className={`w-2.5 h-2.5 rounded-full transition-colors ${
                        i === currentIndex
                          ? "bg-[var(--color-accent)]"
                          : "bg-[var(--color-border,#e5e5e5)]"
                      }`}
                      aria-label={`Go to testimonial ${i + 1}`}
                    />
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))}
                  className="p-2 rounded-full border border-[var(--color-border,#e5e5e5)] hover:bg-[var(--color-surface,#f5f5f5)] transition-colors"
                  aria-label="Next testimonial"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

export default Testimonials;
