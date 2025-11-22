import React from "react";
import PricingCard from "./components/pricing-card";
import { MarginTopNavbar } from "@/components/ui/margin-top-navbar";

const blobA = "url('/mnt/data/26222379-5cd0-4796-9cf2-ec024e31b51e.png')";
const blobB = "url('/mnt/data/41a79742-d4ae-4bdc-b0b3-860da358471b.png')";

export const Home = () => {
  return (
    <section className="relative min-h-screen bg-white overflow-hidden">
      {/* decorative blobs */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 -left-40 w-96 h-96 rounded-full blur-[80px] opacity-70"
        style={{
          backgroundImage: blobA,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 -right-40 w-96 h-96 rounded-full blur-[80px] opacity-70"
        style={{
          backgroundImage: blobB,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      />

      <div className="relative z-10">
        <MarginTopNavbar />

        <div className="container mx-auto px-6 pt-16 pb-20">
          {/* Hero */}
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="mt-8 text-4xl md:text-6xl font-extrabold text-[#0f1724] leading-tight">
              Your Ads, Our Threads.
            </h1>

            <p className="mt-4 text-base md:text-lg text-gray-600">
              Sistem otomatisasi untuk membantu Anda membuat dan mengelola konten
              iklan secara efisien
            </p>
          </div>

          {/* Pricing cards */}
          <div className="mt-12 grid gap-8 grid-cols-1 md:grid-cols-3 items-start">
            <PricingCard
              title="Starter"
              priceSmall="Rp 100.000"
              priceBig="Rp 50.000"
              points={[
                "5 kredit, Generate konten hingga 5 kali",
                "1 platform (Facebook atau Instagram)",
                "Template dasar (teks & gambar)",
                "+1 kredit gratis untuk pengguna baru",
              ]}
              cta="Pesan Sekarang"
            />

            <PricingCard
              title="Business"
              highlight
              priceSmall="Rp 350.000"
              priceBig="Rp 180.000"
              points={[
                "20 kredit, pembuatan konten otomatis hingga 20 kali",
                "Integrasi penuh dengan Facebook & Instagram",
                "Template kustom dan variasi konten AI yang lebih personal",
                "Fitur penjadwalan otomatis & analitik performa dasar",
                "Dukungan pelanggan premium via chat",
                "+3 kredit gratis untuk pengguna baru",
              ]}
              cta="Pesan Sekarang"
            />

            <PricingCard
              title="Pro"
              priceSmall="Rp 200.000"
              priceBig="Rp 100.000"
              points={[
                "10 kredit, Generate konten hingga 10 kali",
                "2 platform (Facebook & Instagram)",
                "Template premium yang bisa disesuaikan oleh AI",
                "Penjadwalan otomatis unggahan konten",
                "Dukungan pelanggan prioritas via chat",
                "+2 kredit gratis untuk pengguna baru",
              ]}
              cta="Pesan Sekarang"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
