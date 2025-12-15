"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import api from "../lib/axios/axios-instance";
import { useGetCurrentUser } from "../providers/get-current-user-provider";
import { logout } from "@/modules/auth/services/logout";

type Props = { children: React.ReactNode };

type User = {
  id?: string;
  full_name?: string;
  business_name?: string;
  phone?: string;
  email?: string;
  is_admin?: boolean;
  avatar_url?: string;
  created_at?: string;
  updated_at?: string;
  credits?: number;
};

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "";

export default function DashboardLayout({ children }: Props) {
  const { user, loading: loadingUser } = useGetCurrentUser();
  const pathname = usePathname() || "/";
  const router = useRouter();

  const [credits, setCredits] = useState<number>(13);
  const [loggingOut, setLoggingOut] = useState<boolean>(false);

  const nav = [
    { title: "Dashboard", href: "/dashboard", img: "/images/dashboard.png" },
    { title: "Create", href: "/create", img: "/images/create-highlight.png" },
    { title: "Schedule", href: "/schedule", img: "/images/schedule.png" },
    { title: "Settings", href: "/settings", img: "/images/setting.png" },
  ];

  const uploadedBg = "/images/background.png";
  const displayName = user?.full_name ?? "Timothy Maulana";
  const displayBusiness = user?.business_name ?? "Business Store";
  const avatarSrc = user?.avatar_url ?? "/images/avatar.png";

  return (
    <div className="flex min-h-screen bg-transparent">
      <aside className="relative w-72 flex-shrink-0 px-6 py-8">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-2xl"
          style={{
            boxShadow: "inset 0 0 120px rgba(255,255,255,0.85)",
            background:
              "radial-gradient(1200px 400px at 0% 10%, rgba(255,122,162,0.08), transparent 10%), radial-gradient(800px 300px at 30% 80%, rgba(106,75,244,0.06), transparent 12%)",
            filter: "blur(28px)",
          }}
        />

        <div className="relative z-10 flex h-full flex-col justify-between">
          <div>
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
                    className={`flex items-center gap-3 rounded-lg p-2 transition-all ${
                      active
                        ? "bg-white/80 text-blue-600 shadow-md"
                        : "text-gray-600 hover:bg-white/30"
                    }`}
                    aria-current={active ? "page" : undefined}
                  >
                    <div
                      className="flex h-10 w-10 items-center justify-center rounded-md"
                      style={{
                        background: active
                          ? "linear-gradient(135deg,#EAF0FF,#FFF)"
                          : "rgba(255,255,255,0.6)",
                      }}
                    >
                      <Image
                        src={item.img}
                        alt={item.title}
                        width={28}
                        height={28}
                      />
                    </div>
                    <span className="font-medium">{item.title}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="relative z-10">
            <div className="flex items-center gap-3 px-2">
              <div className="relative h-12 w-12 overflow-hidden rounded-full bg-white/80">
                <Image src={avatarSrc} alt="avatar" width={48} height={48} />
              </div>
              <div className="flex-1">
                <div className="text-sm font-semibold text-black">
                  {loadingUser ? "Loading..." : displayName}
                </div>
                <div className="text-xs font-medium text-black">
                  {loadingUser ? "-" : displayBusiness}
                </div>
                <div className="mt-1 text-xs font-semibold text-black">
                  {credits} Credits
                </div>
              </div>

              <button
                onClick={() => {
                  logout();
                }}
                className="px-2 cursor-pointer py-1 text-sm text-red-600 hover:underline"
              >
                {loggingOut ? "Signing out..." : "Logout"}
              </button>
            </div>
          </div>
        </div>
      </aside>

      <main className="relative flex-1 overflow-hidden">
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

        <div
          aria-hidden
          className="pointer-events-none absolute -top-28 -left-28 h-96 w-96 rounded-full opacity-80 blur-3xl"
          style={{
            backgroundImage: "url('/images/dashboard.png')",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            mixBlendMode: "screen",
          }}
        />

        <div
          aria-hidden
          className="pointer-events-none absolute -right-28 -bottom-28 h-96 w-96 rounded-full opacity-80 blur-3xl"
          style={{
            backgroundImage: "url('/images/dashboard.png')",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            mixBlendMode: "screen",
            transform: "scaleX(-1)",
          }}
        />

        {/* scroll area */}
        <div className="h-screen overflow-y-auto">
          <div className="mx-auto w-full max-w-7xl px-6 py-8 ps-[w-72]">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
