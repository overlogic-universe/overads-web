"use client";

import { useState } from "react";
import PricingCard from "./components/pricing-card";
import { MarginTopNavbar } from "@/core/components/ui/margin-top-navbar";
import { usePackages } from "./hooks/use-get-packages";
import { ModalLoading } from "@/core/components/modal/modal-loading";
import { ModalConfirm } from "@/core/components/modal/modal-confirm";
import { formatRupiah } from "@/core/utils/currency";
import { usePayment } from "../payment/hooks/use-payment";

export const Home = () => {
  const { data, loading } = usePackages();
  const { createInvoice, loading: paying } = usePayment();

  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<{
    id: number;
    name: string;
  } | null>(null);

  const openConfirm = (id: number, name: string) => {
    setSelectedPackage({ id, name });
    setIsConfirmOpen(true);
  };

  const handleConfirmBuy = async () => {
    if (!selectedPackage) return;

    const res = await createInvoice({
      package_id: selectedPackage.id,
      success_redirect_url: `${window.location.origin}/create`,
      failure_redirect_url: `${window.location.origin}/`,
    });

    window.location.href = res.invoice_url;
  };

  if (loading || paying) return <ModalLoading isOpen />;

  return (
    <section className="relative min-h-screen overflow-hidden">
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
          <div className="mt-12 grid grid-cols-1 items-start gap-4 rounded-2xl border border-white p-4 md:grid-cols-3">
            {data.map((item) => (
              <PricingCard
                key={item.id}
                highlight={item.name === "Business"}
                title={item.name}
                priceSmall={formatRupiah(item.original_price)}
                priceBig={formatRupiah(item.price)}
                points={item.benefits}
                cta="Pesan Sekarang"
                onBuy={() => openConfirm(item.id, item.name)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Modal Confirm */}
      <ModalConfirm
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleConfirmBuy}
        title="Konfirmasi Pembelian Paket"
        description={`Apakah Anda yakin ingin melanjutkan pembelian paket <b>${selectedPackage?.name}</b>?<br/><br/>
        Setelah pembayaran berhasil, kredit akan langsung ditambahkan ke akun Anda dan dapat segera digunakan.`}
        confirmText="Lanjutkan Pembayaran"
        cancelText="Batalkan"
      />
    </section>
  );
};

export default Home;
