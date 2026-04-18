"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "../../lib/cn";

export interface DateRangePickerProps {
  startDate: Date | null;
  endDate: Date | null;
  onDateChange: (start: Date | null, end: Date | null) => void;
  /** Placeholder text when no dates are selected */
  placeholder?: string;
  className?: string;
}

export function DateRangePicker({
  startDate,
  endDate,
  onDateChange,
  placeholder = "Select dates",
  className,
}: DateRangePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [hoverDate, setHoverDate] = useState<Date | null>(null);
  const [selecting, setSelecting] = useState<"start" | "end">("start");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const formatDate = (date: Date | null) => {
    if (!date) return "";
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const days: (Date | null)[] = [];

    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    return days;
  };

  const isDateInRange = (date: Date) => {
    if (!startDate || !endDate) return false;
    return date >= startDate && date <= endDate;
  };

  const isDateInHoverRange = (date: Date) => {
    if (!hoverDate || !startDate || endDate) return false;
    return (
      (date >= startDate && date <= hoverDate) ||
      (date <= startDate && date >= hoverDate)
    );
  };

  const handleDateClick = (date: Date) => {
    if (selecting === "start" || (startDate && date < startDate)) {
      onDateChange(date, null);
      setSelecting("end");
    } else {
      onDateChange(startDate, date);
      setSelecting("start");
      setIsOpen(false);
    }
  };

  const handlePrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1)
    );
  };

  const days = getDaysInMonth(currentDate);
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className={cn("relative", className)} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        type="button"
        className="flex items-center justify-between w-full md:w-64 px-4 py-3 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-foreground)] hover:border-[var(--color-accent)]/40 transition-all duration-200"
      >
        <span className="text-sm">
          {startDate || endDate
            ? `${formatDate(startDate)} - ${formatDate(endDate)}`
            : placeholder}
        </span>
      </button>

      {isOpen && (
        <div className="absolute z-50 mt-2 p-4 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={handlePrevMonth}
              type="button"
              className="p-1 rounded hover:bg-[var(--color-foreground)]/10"
            >
              <ChevronLeftIcon />
            </button>
            <div className="text-sm font-medium text-[var(--color-foreground)]">
              {currentDate.toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
              })}
            </div>
            <button
              onClick={handleNextMonth}
              type="button"
              className="p-1 rounded hover:bg-[var(--color-foreground)]/10"
            >
              <ChevronRightIcon />
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1 mb-2">
            {weekDays.map((day) => (
              <div
                key={day}
                className="text-center text-xs text-[var(--color-muted-foreground)] py-1"
              >
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {days.map((date, index) => {
              if (!date) {
                return <div key={`empty-${index}`} className="h-8" />;
              }

              const isSelected =
                (startDate &&
                  date.getTime() === startDate.getTime()) ||
                (endDate && date.getTime() === endDate.getTime());
              const isInRange =
                isDateInRange(date) || isDateInHoverRange(date);

              return (
                <button
                  key={date.getTime()}
                  type="button"
                  onClick={() => handleDateClick(date)}
                  onMouseEnter={() => setHoverDate(date)}
                  onMouseLeave={() => setHoverDate(null)}
                  className={cn(
                    "h-8 w-8 rounded-full flex items-center justify-center text-sm transition-colors duration-200",
                    isSelected && "bg-[var(--color-accent)] text-white",
                    isInRange &&
                      !isSelected &&
                      "bg-[var(--color-accent)]/20 text-[var(--color-foreground)]",
                    !isSelected &&
                      !isInRange &&
                      "text-[var(--color-foreground)] hover:bg-[var(--color-foreground)]/10"
                  )}
                >
                  {date.getDate()}
                </button>
              );
            })}
          </div>

          <div className="mt-4 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => {
                onDateChange(null, null);
                setSelecting("start");
              }}
              className="px-3 py-1 rounded text-sm text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)]"
            >
              Clear
            </button>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="px-3 py-1 rounded bg-[var(--color-accent)] text-white text-sm hover:brightness-110"
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function ChevronLeftIcon() {
  return (
    <svg
      className="w-5 h-5 text-[var(--color-foreground)]"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 19l-7-7 7-7"
      />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg
      className="w-5 h-5 text-[var(--color-foreground)]"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 5l7 7-7 7"
      />
    </svg>
  );
}
