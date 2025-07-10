// 상수 정의
const SIZES = {
  sm: {
    width: "w-[1.875rem]",
    height: "h-[1.875rem]",
    size: "1.875rem",
  },
  md: {
    width: "w-[2.25rem]",
    height: "h-[2.25rem]",
    size: "2.25rem",
  },
} as const;

interface IconWrapperProps {
  children: React.ReactNode;
  size?: keyof typeof SIZES;
}

const IconWrapper = ({ children, size = "sm" }: IconWrapperProps) => {
  const { width, height } = SIZES[size];

  return (
    <div className={`${width} ${height} flex justify-center items-center`}>
      {children}
    </div>
  );
};

export default IconWrapper;
