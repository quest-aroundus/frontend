const BackgroundShade = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean | undefined;
  onClose: () => void;
}) => {
  const dynamicClass = isOpen
    ? 'bg-black/75 backdrop-blur-sm'
    : 'bg-black/0 backdrop-blur-none pointer-events-none';

  return (
    <div
      className={`
            fixed inset-0 z-40 transition-all duration-500 ease-out
            ${dynamicClass}
          `}
      onClick={onClose}
    />
  );
};

export default BackgroundShade;
