interface SkeletonProps {
  width?: number | string;
  height?: number | string;
  className?: string;
}

export function Skeleton({ width, height = 16, className = "" }: SkeletonProps) {
  return (
    <div
      className={`animate-pulse rounded-md bg-white/[0.06] ${className}`}
      style={{
        width: typeof width === "number" ? `${width}px` : width || "100%",
        height: typeof height === "number" ? `${height}px` : height,
      }}
    />
  );
}
