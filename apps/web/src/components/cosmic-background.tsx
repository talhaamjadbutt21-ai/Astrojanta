export function CosmicBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgb(167_139_250/0.22),transparent_60%),radial-gradient(ellipse_60%_50%_at_100%_100%,rgb(242_181_68/0.10),transparent_60%),radial-gradient(ellipse_50%_40%_at_0%_70%,rgb(255_138_61/0.07),transparent_60%)]" />
      <div className="starfield absolute inset-0 animate-twinkle opacity-70" />
      <div className="starfield absolute inset-0 rotate-180 scale-150 animate-twinkle opacity-40 [animation-delay:-3s]" />
    </div>
  );
}
