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
  variant?: "quote-first" | "avatar-first";
  columns?: 2 | 3 | 4;
  className?: string;
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5 mb-4">
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          className="h-4 w-4"
          style={{ color: i < rating ? "#ffffff" : "rgba(255,255,255,0.2)" }}
          fill="currentColor"
          viewBox="0 0 20 20"
          aria-hidden="true"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function AvatarCircle({ testimonial }: { testimonial: Testimonial }) {
  if (testimonial.avatar) {
    return (
      <img
        src={testimonial.avatar}
        alt={testimonial.author}
        className="h-12 w-12 shrink-0 rounded-full object-cover"
        style={{ border: "1px solid rgba(255,255,255,0.1)" }}
        loading="lazy"
      />
    );
  }
  return (
    <div
      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full font-bold text-white"
      style={{
        background: "rgba(255,255,255,0.06)",
        border: "1px solid rgba(255,255,255,0.1)",
      }}
    >
      {testimonial.author.charAt(0).toUpperCase()}
    </div>
  );
}

function TestimonialCard({
  testimonial,
  variant = "quote-first",
}: {
  testimonial: Testimonial;
  variant?: "quote-first" | "avatar-first";
}) {
  if (variant === "avatar-first") {
    return (
      <div
        className="flex h-full flex-col rounded-lg p-6 backdrop-blur-xl"
        style={{
          background: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <div className="flex items-center gap-4">
          <AvatarCircle testimonial={testimonial} />
          <div className="min-w-0">
            <p className="text-base font-semibold text-white">{testimonial.author}</p>
            {(testimonial.role || testimonial.company) && (
              <p className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
                {[testimonial.role, testimonial.company].filter(Boolean).join(", ")}
              </p>
            )}
          </div>
        </div>
        {testimonial.rating && (
          <div className="mt-5">
            <StarRating rating={testimonial.rating} />
          </div>
        )}
        <p
          className="mt-2 text-sm leading-relaxed"
          style={{ color: "rgba(255,255,255,0.88)" }}
        >
          &ldquo;{testimonial.quote}&rdquo;
        </p>
      </div>
    );
  }

  return (
    <div
      className="flex h-full flex-col justify-between rounded-lg p-6 backdrop-blur-xl transition-colors"
      style={{
        background: "rgba(255,255,255,0.06)",
        border: "1px solid rgba(255,255,255,0.1)",
      }}
    >
      <div>
        {testimonial.rating && <StarRating rating={testimonial.rating} />}
        <p
          className="mt-4 text-sm italic leading-relaxed"
          style={{ color: "rgba(255,255,255,0.88)" }}
        >
          &ldquo;{testimonial.quote}&rdquo;
        </p>
      </div>
      <div
        className="mt-6 pt-4"
        style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}
      >
        <p className="text-sm font-semibold text-white">{testimonial.author}</p>
        {(testimonial.role || testimonial.company) && (
          <p
            className="mt-0.5 text-xs"
            style={{ color: "rgba(255,255,255,0.4)" }}
          >
            {[testimonial.role, testimonial.company].filter(Boolean).join(", ")}
          </p>
        )}
      </div>
    </div>
  );
}

export function Testimonials({
  heading,
  description,
  testimonials,
  layout = "grid",
  variant = "quote-first",
  columns = 4,
  className = "",
}: TestimonialsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!testimonials || testimonials.length === 0) return null;

  const colsClass =
    columns === 2
      ? "md:grid-cols-2"
      : columns === 3
      ? "md:grid-cols-2 lg:grid-cols-3"
      : "md:grid-cols-2 lg:grid-cols-4";

  return (
    <section
      className={`py-20 ${className}`}
      style={{ background: "#0d0d0d", color: "rgba(255,255,255,0.88)" }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {(heading || description) && (
          <div className="mb-14 text-center">
            {heading && (
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                {heading}
              </h2>
            )}
            {description && (
              <p
                className="mx-auto mt-4 max-w-2xl text-base"
                style={{ color: "rgba(255,255,255,0.6)" }}
              >
                {description}
              </p>
            )}
          </div>
        )}

        {layout === "grid" ? (
          <div className={`grid grid-cols-1 gap-5 ${colsClass}`}>
            {testimonials.map((t, i) => (
              <TestimonialCard key={i} testimonial={t} variant={variant} />
            ))}
          </div>
        ) : (
          <div className="relative">
            <div className="mx-auto max-w-2xl">
              <TestimonialCard testimonial={testimonials[currentIndex]} />
            </div>

            {testimonials.length > 1 && (
              <div className="mt-8 flex items-center justify-center gap-6">
                <button
                  type="button"
                  onClick={() =>
                    setCurrentIndex((prev) =>
                      prev === 0 ? testimonials.length - 1 : prev - 1
                    )
                  }
                  className="rounded-full p-2 transition-colors"
                  style={{
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "rgba(255,255,255,0.6)",
                  }}
                  aria-label="Previous testimonial"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                <div className="flex gap-1.5">
                  {testimonials.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setCurrentIndex(i)}
                      className="h-1.5 rounded-full transition-all"
                      style={{
                        width: i === currentIndex ? "1.5rem" : "0.375rem",
                        background: i === currentIndex ? "#ffffff" : "rgba(255,255,255,0.2)",
                      }}
                      aria-label={`Go to testimonial ${i + 1}`}
                    />
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setCurrentIndex((prev) =>
                      prev === testimonials.length - 1 ? 0 : prev + 1
                    )
                  }
                  className="rounded-full p-2 transition-colors"
                  style={{
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "rgba(255,255,255,0.6)",
                  }}
                  aria-label="Next testimonial"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
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
