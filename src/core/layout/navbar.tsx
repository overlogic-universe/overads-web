"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { DockIcon, Dock } from "@/core/components/ui/dock";
import Image from "next/image";
import MenuBox from "./menu-box";
import { LoginButton } from "@/modules/home/components/login-button";
import { Card } from "@/core/components/ui/card";

const allowedPages = ["/", "/my-donations", "/about-us"];

const Navbar = () => {
  const pathname = usePathname();

  if (!allowedPages.includes(pathname)) {
    return null; // jangan tampilkan navbar
  }

  return (
    <nav className="fixed top-0 z-50 mx-auto flex w-full items-center justify-between gap-x-5 py-6 transition-all duration-300 md:left-1/2 md:w-auto md:-translate-x-1/2 md:justify-center md:px-0">
      <Card className="flex h-12 items-center justify-center px-7">
        <Image
          className="h-fit md:min-w-28"
          src={"/images/overads-logo.svg"}
          alt="overads-logo"
          height={100}
          width={100}
        />
      </Card>

      <Dock className="text-foreground hidden flex-row items-center space-x-16 rounded-2xl border border-gray-300 bg-white px-12 text-sm font-semibold whitespace-nowrap md:flex">
        <DockIcon className="hover:text-primary">
          <Link href="/">Home</Link>
        </DockIcon>
        <DockIcon className="hover:text-primary">
          <Link href="/">Pricing</Link>
        </DockIcon>
        <DockIcon className="hover:text-primary">
          <Link href="/">Company</Link>
        </DockIcon>
      </Dock>

      <LoginButton />
      <MenuBox />
    </nav>
  );
};

export default Navbar;
