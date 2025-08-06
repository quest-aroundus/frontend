const ChevronIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      className={`w-4 h-4 ${className}`}
      fill='none'
      stroke='currentColor'
      viewBox='0 0 24 24'
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={2}
        d='M9 5l7 7-7 7'
      />
    </svg>
  );
};

export default ChevronIcon;
