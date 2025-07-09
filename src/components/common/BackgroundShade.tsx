const BackgroundShade = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean | undefined;
  onClose: () => void;
}) => {
  return (
    <div
      className={`
            fixed inset-0 z-40 transition-all duration-500 ease-out
            ${
              isOpen
                ? "bg-black/75 backdrop-blur-sm"
                : "bg-black/0 backdrop-blur-none pointer-events-none"
            }
          `}
      onClick={onClose}
    />
  );
};

export default BackgroundShade;
