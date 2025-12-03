import React from "react";
import PricingCard from "./components/pricing-card";
import { MarginTopNavbar } from "@/core/components/ui/margin-top-navbar";

const blobA = "url('/mnt/data/26222379-5cd0-4796-9cf2-ec024e31b51e.png')";
const blobB = "url('/mnt/data/41a79742-d4ae-4bdc-b0b3-860da358471b.png')";

export const Home = () => {
  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* decorative blobs */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 -left-40 h-96 w-96 rounded-full opacity-70 blur-[80px]"
        style={{
          backgroundImage: blobA,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 -bottom-40 h-96 w-96 rounded-full opacity-70 blur-[80px]"
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
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mt-8 text-4xl leading-tight font-extrabold text-[#0f1724] md:text-6xl">
              Your Ads, Our Threads.
            </h1>

            <p className="mt-4 text-base text-gray-600 md:text-lg">
              Sistem otomatisasi untuk membantu Anda membuat dan mengelola
              konten iklan secara efisien
            </p>
          </div>

          {/* Pricing cards */}
          <div className="mt-12 grid grid-cols-1 items-start gap-8 md:grid-cols-3">
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
