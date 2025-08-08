const CurrentMarker = () => (
  <div className='relative w-3 h-3 rounded-full bg-red-500 shadow-lg'>
    {/* 퍼지는 동그라미 */}
    <span className='absolute inset-0 bg-red-400 opacity-30 rounded-full animate-pulse' />
    <style>
      {`
        @keyframes pulse {
          0% {
            transform: scale(1);
            opacity: 0.8;
          }
          70% {
            transform: scale(1.8);
            opacity: 0;
          }
          100% {
            transform: scale(1);
            opacity: 0;
          }
        }
        .animate-pulse {
          animation: pulse 1.5s infinite;
        }
      `}
    </style>
  </div>
);

export default CurrentMarker;
