import type { ReactNode } from "react";

type BreakpointMap<T> = { sm?: T; md?: T; lg?: T };

interface GridSystemProps {
  children: ReactNode;
  unstable_useContainer?: boolean;
  className?: string;
}

interface GridProps {
  children: ReactNode;
  columns: BreakpointMap<number>;
  rows: BreakpointMap<number>;
  className?: string;
}

interface GridCellProps {
  children: ReactNode;
  column?: BreakpointMap<string>;
  row?: BreakpointMap<string>;
  solid?: boolean;
  className?: string;
}

function gridValue(v: string, bp: string): string {
  if (v === "1" || v === "1/-1") return `${bp}:col-span-full`;
  if (v.includes("/")) return `${bp}:col-[${v}]`;
  return `${bp}:col-span-${v}`;
}

function rowValue(v: string, bp: string): string {
  if (v === "1" || v === "1/-1") return `${bp}:row-span-full`;
  if (v.includes("/")) return `${bp}:row-[${v}]`;
  return `${bp}:row-span-${v}`;
}

export function GridSystem({ children, unstable_useContainer, className = "" }: GridSystemProps) {
  return (
    <div
      className={`${unstable_useContainer ? "mx-auto max-w-6xl px-4 sm:px-6" : ""} ${className}`}
    >
      {children}
    </div>
  );
}

export function Grid({ children, columns, rows, className = "" }: GridProps) {
  const colClass = [
    `grid-cols-${columns.sm ?? 1}`,
    columns.md ? `md:grid-cols-${columns.md}` : "",
    columns.lg ? `lg:grid-cols-${columns.lg}` : "",
  ].filter(Boolean).join(" ");

  const rowClass = [
    `grid-rows-${rows.sm ?? 1}`,
    rows.md ? `md:grid-rows-${rows.md}` : "",
    rows.lg ? `lg:grid-rows-${rows.lg}` : "",
  ].filter(Boolean).join(" ");

  return (
    <div className={`grid gap-4 ${colClass} ${rowClass} ${className}`}>
      {children}
    </div>
  );
}

export function GridCell({ children, column, row, solid = false, className = "" }: GridCellProps) {
  const colClasses = [
    column?.sm ? gridValue(column.sm, "") : "",
    column?.md ? gridValue(column.md, "md") : "",
    column?.lg ? gridValue(column.lg, "lg") : "",
  ].filter(Boolean).join(" ");

  const rowClasses = [
    row?.sm ? rowValue(row.sm, "") : "",
    row?.md ? rowValue(row.md, "md") : "",
    row?.lg ? rowValue(row.lg, "lg") : "",
  ].filter(Boolean).join(" ");

  return (
    <div
      className={[
        "rounded-xl border border-white/10 overflow-hidden p-6",
        solid ? "bg-[#0a0a0a]" : "bg-black",
        colClasses,
        rowClasses,
        className,
      ].filter(Boolean).join(" ")}
    >
      {children}
    </div>
  );
}
