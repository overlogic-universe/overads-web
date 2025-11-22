// src/components/DashboardLayout.tsx
"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = { children: React.ReactNode };

export default function DashboardLayout({ children }: Props) {
  const pathname = usePathname() || "/";

  const nav = [
    { title: "Dashboard", href: "/", img: "/images/dashboard.png" },
    { title: "Create", href: "/create", img: "/images/create-highlight.png" },
    { title: "Schedule", href: "/schedule", img: "/images/schedule.png" },
    { title: "Settings", href: "/settings", img: "/images/setting.png" },
  ];

  // uploaded background file (local session path)
  const uploadedBg = "/public/images/background.png";

  return (
    <div className="min-h-screen flex bg-gradient-to-b from-white to-white">
      {/* Sidebar */}
      <aside className="w-72 relative px-6 py-8 flex-shrink-0">
        {/* big soft gradient / blur behind sidebar */}
        <div
          aria-hidden
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            boxShadow: "inset 0 0 120px rgba(255,255,255,0.85)",
            background:
              "radial-gradient(1200px 400px at 0% 10%, rgba(255,122,162,0.08), transparent 10%), radial-gradient(800px 300px at 30% 80%, rgba(106,75,244,0.06), transparent 12%)",
            filter: "blur(28px)",
          }}
        />

        <div className="relative z-10 flex flex-col h-full justify-between">
          <div>
            {/* Logo (rounded white rounded square behind) */}
            <Link href="/" className="flex items-center gap-3">
              <div
                className="rounded-2xl px-3 py-2"
                style={{ backgroundColor: "rgba(255,255,255,0.9)" }}
              >
                <Image
                  src="/images/overads-logo.png"
                  alt="OverAds"
                  width={120}
                  height={36}
                  priority
                />
              </div>
            </Link>

            <nav className="mt-8 space-y-2 text-sm">
              {nav.map((item) => {
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 p-2 rounded-lg transition-all ${
                      active
                        ? "bg-white/80 shadow-md text-blue-600"
                        : "hover:bg-white/30 text-gray-600"
                    }`}
                    aria-current={active ? "page" : undefined}
                  >
                    <div
                      className={`w-10 h-10 rounded-md flex items-center justify-center`}
                      style={{
                        background: active ? "linear-gradient(135deg,#EAF0FF,#FFF)" : "rgba(255,255,255,0.6)",
                      }}
                    >
                      <Image src={item.img} alt={item.title} width={28} height={28} />
                    </div>
                    <span className="font-medium">{item.title}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* bottom area with lamp image and profile card */}
          <div className="relative z-10">
            <div
              className="rounded-2xl p-4 mb-6 mx-auto text-center shadow-sm"
              style={{ backgroundColor: "rgba(255,255,255,0.15)" }}
            >
              <div className="w-28 h-28 mx-auto rounded-xl bg-white/80 flex items-center justify-center shadow-inner">
                <Image src="/images/lamp.png" alt="lamp" width={92} height={92} />
              </div>
              <button className="mt-3 w-full text-sm rounded-md px-3 py-2 bg-blue-600 text-white">
                More Credits
              </button>
            </div>

            <div className="flex items-center gap-3 px-2">
              <div className="w-12 h-12 relative rounded-full overflow-hidden bg-white/80">
                <Image src="/images/avatar.png" alt="avatar" width={48} height={48} />
              </div>
              <div>
                <div className="text-sm font-semibold">Timothy Maulana</div>
                <div className="text-xs text-gray-300">13 Credits</div>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 relative overflow-auto">
        {/* full-area background image (uses uploaded file path) */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-cover bg-center"
          style={{
            backgroundImage: `url('${uploadedBg}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.22,
          }}
        />

        {/* decorative blobs - soft background images (using dashboard art) */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-28 -left-28 w-96 h-96 rounded-full blur-3xl opacity-80"
          style={{
            backgroundImage: "url('/images/dashboard.png')",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            mixBlendMode: "screen",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-28 -right-28 w-96 h-96 rounded-full blur-3xl opacity-80"
          style={{
            backgroundImage: "url('/images/dashboard.png')",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            mixBlendMode: "screen",
            transform: "scaleX(-1)",
          }}
        />

        {/* CONTENT WRAPPER: removed solid white rounded card so background is visible */}
        <div className="relative z-10 min-h-screen py-10 px-12">
          {/* children rendered directly on top of background */}
          {children}
        </div>
      </main>
    </div>
  );
}
