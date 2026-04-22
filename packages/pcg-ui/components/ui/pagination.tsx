"use client";

import { cn } from "../../lib/cn";

export interface PaginationProps {
  page: number;
  pages: number;
  onPageChange: (page: number) => void;
  maxVisible?: number;
  className?: string;
}

export function Pagination({
  page,
  pages,
  onPageChange,
  maxVisible = 5,
  className,
}: PaginationProps) {
  if (pages <= 1) return null;

  const items: React.ReactNode[] = [];
  let startPage = Math.max(1, page - Math.floor(maxVisible / 2));
  const endPage = Math.min(pages, startPage + maxVisible - 1);
  if (endPage - startPage < maxVisible - 1) {
    startPage = Math.max(1, endPage - maxVisible + 1);
  }

  if (startPage > 1) {
    items.push(<PageButton key={1} page={1} active={page === 1} onClick={onPageChange} />);
    if (startPage > 2) items.push(<Ellipsis key="es" />);
  }

  for (let i = startPage; i <= endPage; i++) {
    items.push(<PageButton key={i} page={i} active={page === i} onClick={onPageChange} />);
  }

  if (endPage < pages) {
    if (endPage < pages - 1) items.push(<Ellipsis key="ee" />);
    items.push(
      <PageButton key={pages} page={pages} active={page === pages} onClick={onPageChange} />
    );
  }

  return (
    <nav
      aria-label="Pagination"
      className={cn("flex items-center justify-center gap-1.5 py-4", className)}
    >
      <NavButton
        direction="prev"
        disabled={page <= 1}
        onClick={() => onPageChange(Math.max(1, page - 1))}
      />
      {items}
      <NavButton
        direction="next"
        disabled={page >= pages}
        onClick={() => onPageChange(Math.min(pages, page + 1))}
      />
    </nav>
  );
}

function Ellipsis() {
  return (
    <span
      className="flex h-10 w-8 items-center justify-center text-sm"
      style={{ color: "rgba(255,255,255,0.4)" }}
    >
      …
    </span>
  );
}

function PageButton({
  page,
  active,
  onClick,
}: {
  page: number;
  active: boolean;
  onClick: (page: number) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onClick(page)}
      className="h-10 min-w-[2.5rem] rounded-sm px-3 text-sm font-semibold transition-all hover:brightness-110"
      style={
        active
          ? { backgroundColor: "#ffffff", color: "#000000" }
          : {
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "rgba(255,255,255,0.88)",
            }
      }
    >
      {page}
    </button>
  );
}

function NavButton({
  direction,
  disabled,
  onClick,
}: {
  direction: "prev" | "next";
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      aria-label={direction === "prev" ? "Previous page" : "Next page"}
      className="flex h-10 items-center gap-1.5 rounded-sm px-4 text-sm font-medium transition-all hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-30"
      style={{
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.1)",
        color: "rgba(255,255,255,0.88)",
      }}
    >
      {direction === "prev" ? (
        <>
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="hidden sm:inline">Prev</span>
        </>
      ) : (
        <>
          <span className="hidden sm:inline">Next</span>
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </>
      )}
    </button>
  );
}
