export default function TestOverlay() {
  return (
    <section className="relative w-full min-h-screen overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://picsum.photos/1600/900"
          alt="House"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Angled red overlay */}
      <div
        className="absolute top-0 left-0 h-full w-3/4 z-20"
        style={{
          backgroundColor: "rgba(220, 38, 38, 0.8)", // Tailwind red-700 with opacity
          clipPath: "polygon(0 0, 70% 0, 55% 100%, 0% 100%)",
          WebkitClipPath: "polygon(0 0, 70% 0, 55% 100%, 0% 100%)",
        }}
      ></div>
    </section>
  );
}
