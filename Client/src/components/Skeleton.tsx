import React from "react";

interface SkeletonProps {
  className?: string;
  width?: string;
  height?: string;
}

const Skeleton: React.FC<SkeletonProps> = ({ className, width, height }) => {
  return (
    <div
      className={`bg-[var(--secondary)] animate-pulse rounded-md ${className}`}
      style={{
        width: width,
        height: height,
        backgroundImage: "linear-gradient(90deg, var(--secondary) 0%, var(--border) 50%, var(--secondary) 100%)",
        backgroundSize: "200% 100%",
        animation: "shimmer 1.5s infinite"
      }}
    />
  );
};

export default Skeleton;
