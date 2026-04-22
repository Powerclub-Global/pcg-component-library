"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/cn";

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center whitespace-nowrap rounded-sm",
    "font-semibold uppercase tracking-wider",
    "transition-all duration-300 ease-out",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0d0d0d]",
    "disabled:pointer-events-none disabled:opacity-50",
  ].join(" "),
  {
    variants: {
      variant: {
        default: [
          "bg-white text-black",
          "hover:bg-white/90",
          "active:bg-white/80",
        ].join(" "),
        outline: [
          "border border-white/30 bg-transparent text-white",
          "hover:border-white hover:bg-white/5",
        ].join(" "),
        ghost: [
          "bg-transparent text-white",
          "hover:bg-white/5",
          "active:bg-white/10",
        ].join(" "),
        link: [
          "bg-transparent text-white",
          "underline-offset-4 hover:underline",
          "p-0 h-auto normal-case tracking-normal font-medium",
        ].join(" "),
        destructive: [
          "bg-white text-black",
          "hover:bg-white/90",
          "active:bg-white/80",
        ].join(" "),
      },
      size: {
        xs: "h-8 px-3 text-[10px]",
        sm: "h-9 px-4 text-xs",
        default: "h-11 px-6 text-sm",
        lg: "h-14 px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
