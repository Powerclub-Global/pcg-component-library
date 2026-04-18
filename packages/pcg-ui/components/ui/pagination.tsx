"use client";

import { cn } from "../../lib/cn";

export interface PaginationProps {
  /** Current active page (1-indexed) */
  page: number;
  /** Total number of pages */
  pages: number;
  /** Callback when page changes */
  onPageChange: (page: number) => void;
  /** Maximum number of visible page buttons */
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

  const renderPageNumbers = () => {
    const items: React.ReactNode[] = [];
    let startPage = Math.max(1, page - Math.floor(maxVisible / 2));
    const endPage = Math.min(pages, startPage + maxVisible - 1);

    if (endPage - startPage < maxVisible - 1) {
      startPage = Math.max(1, endPage - maxVisible + 1);
    }

    if (startPage > 1) {
      items.push(
        <PageButton key={1} page={1} active={page === 1} onClick={onPageChange} />
      );
      if (startPage > 2) {
        items.push(
          <span key="ellipsis-start" className="px-2 text-[var(--color-muted-foreground)]">
            ...
          </span>
        );
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      items.push(
        <PageButton key={i} page={i} active={page === i} onClick={onPageChange} />
      );
    }

    if (endPage < pages) {
      if (endPage < pages - 1) {
        items.push(
          <span key="ellipsis-end" className="px-2 text-[var(--color-muted-foreground)]">
            ...
          </span>
        );
      }
      items.push(
        <PageButton
          key={pages}
          page={pages}
          active={page === pages}
          onClick={onPageChange}
        />
      );
    }

    return items;
  };

  return (
    <nav
      aria-label="Pagination"
      className={cn("flex items-center justify-center gap-2 py-4", className)}
    >
      <NavButton
        label="Previous"
        disabled={page <= 1}
        onClick={() => onPageChange(Math.max(1, page - 1))}
      />
      {renderPageNumbers()}
      <NavButton
        label="Next"
        disabled={page >= pages}
        onClick={() => onPageChange(Math.min(pages, page + 1))}
      />
    </nav>
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
      className={cn(
        "h-9 min-w-[2.25rem] rounded-md px-3 text-sm font-medium transition-colors",
        active
          ? "bg-[var(--color-accent)] text-white"
          : "border border-[var(--color-border)] text-[var(--color-foreground)] hover:bg-[var(--color-accent)]/10"
      )}
    >
      {page}
    </button>
  );
}

function NavButton({
  label,
  disabled,
  onClick,
}: {
  label: string;
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "h-9 rounded-md border border-[var(--color-border)] px-4 text-sm font-medium transition-colors",
        disabled
          ? "cursor-not-allowed opacity-50"
          : "text-[var(--color-foreground)] hover:bg-[var(--color-accent)]/10"
      )}
    >
      {label}
    </button>
  );
}
