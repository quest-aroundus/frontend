const LocationIcon = ({ className }: { className?: string }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <g clipPath="url(#clip0_589_632)">
      <path
        d="M15.0397 9.665C14.4997 11.955 13.3597 14.125 11.6597 15.925C10.7797 16.865 9.2797 16.865 8.3997 15.925C6.6997 14.125 5.3097 11.485 4.9297 9.465C4.3397 6.345 6.8497 3.375 10.0297 3.375C13.2097 3.375 15.7697 6.575 15.0397 9.665Z"
        fill="currentColor"
      />
    </g>
    <defs>
      <clipPath id="clip0_589_632">
        <rect
          width="10.32"
          height="13.25"
          fill="white"
          transform="translate(4.83984 3.375)"
        />
      </clipPath>
    </defs>
  </svg>
);

export default LocationIcon;
