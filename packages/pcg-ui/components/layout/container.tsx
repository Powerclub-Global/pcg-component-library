export interface ContainerProps {
  children: React.ReactNode;
  as?: "div" | "section" | "main" | "article";
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "7xl" | "full";
  padding?: boolean;
  className?: string;
}

const maxWidthMap: Record<NonNullable<ContainerProps["maxWidth"]>, string> = {
  sm: "max-w-screen-sm",
  md: "max-w-screen-md",
  lg: "max-w-screen-lg",
  xl: "max-w-screen-xl",
  "2xl": "max-w-screen-2xl",
  "7xl": "max-w-7xl",
  full: "max-w-full",
};

export function Container({
  children,
  as: Component = "div",
  maxWidth = "7xl",
  padding = true,
  className = "",
}: ContainerProps) {
  return (
    <Component
      className={`${maxWidthMap[maxWidth]} mx-auto ${padding ? "px-4 sm:px-6 lg:px-8" : ""} ${className}`}
    >
      {children}
    </Component>
  );
}

export default Container;
