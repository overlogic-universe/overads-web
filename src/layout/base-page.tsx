import React from "react";

interface BasePageProps {
  children: React.ReactNode;
}

/**
 * BasePage
 * - Menggunakan 4 blob SVG/PNG sebagai background blur.
 * - Children berada di atas (z-10).
 */
const BasePage: React.FC<BasePageProps> = ({ children }) => {
  const blob1 = "url('/svgs/blur (1).svg')";
  const blob2 = "url('/svgs/blur (2).svg')";
  const blob3 = "url('/svgs/blur (3).svg')";
  const blob4 = "url('/svgs/blur (4).svg')";
  const blob5 = "url('/svgs/blur (4).svg')";

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-white">
      {/* Blob 1 */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 -left-40 h-80 w-80"
        style={{
          backgroundImage: blob1,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Blob 2 */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 -bottom-40 h-80 w-80"
        style={{
          backgroundImage: blob2,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
        }}
      />

      <div
        aria-hidden
        className="pointer-events-none absolute left-60 top-80 h-80 w-80"
        style={{
          backgroundImage: blob2,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
        }}
      />

      <div
        aria-hidden
        className="pointer-events-none absolute right-40 top-40 h-80 w-80"
        style={{
          backgroundImage: blob2,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Blob 3 */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 -left-20 h-80 w-80"
        style={{
          backgroundImage: blob3,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Blob 4 */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 -right-40 h-96 w-96 rotate-180"
        style={{
          backgroundImage: blob4,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
        }}
      />
      {/* Blob 5 */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 -left-50 h-96 w-96 rotate-180"
        style={{
          backgroundImage: blob5,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </section>
  );
};

export default BasePage;
