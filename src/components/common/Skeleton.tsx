interface SkeletonProps {
  className: string;
}
const Skeleton = ({ className }: SkeletonProps) => {
  return (
    <div
      className={`animate-pulse bg-bg rounded-[0.313rem] ${className}`}
    >
    </div>
  )
}

export default Skeleton;