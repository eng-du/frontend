function Splash() {
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
      <div
        className="absolute animate-ripple rounded-full bg-[#FADA3A]"
        style={{ animationDelay: '0s' }}
      />
      <div
        className="absolute animate-ripple rounded-full bg-[#FADA3A]"
        style={{ animationDelay: '0.8s' }}
      />
      <div
        className="absolute animate-ripple rounded-full bg-[#FADA3A]"
        style={{ animationDelay: '1.6s' }}
      />
      <img src="/logo.svg" alt="Engdu Logo" className="relative z-10 w-33 animate-chick-bounce" />
    </div>
  );
}

export default Splash;
