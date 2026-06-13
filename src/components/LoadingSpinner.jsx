const LoadingSpinner = ({ size = 'md' }) => {
  const sizes = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-16 h-16',
  };

  return (
    <div className="flex items-center justify-center">
      <div
        className={`${sizes[size]} border-2 border-white/10 border-t-[#6c63ff] rounded-full animate-spin`}
      />
    </div>
  );
};

export default LoadingSpinner;
