"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ModalLoading } from "@/core/components/modal/modal-loading";
import { useApiKeyContext } from "./providers/api-key-provider";

export default function SettingsPage() {
  const { apiKey, igId, loading, updateApiKey, updating } = useApiKeyContext();

  const [instagramId, setInstagramId] = useState("");
  const [token, setToken] = useState("");

  // isi default value saat data dari API sudah ada
  useEffect(() => {
    if (igId) setInstagramId(igId);
    if (apiKey) setToken(apiKey);
  }, [igId, apiKey]);

  const handleSubmit = async () => {
    await updateApiKey({
      igId: instagramId,
      apiKey: token,
    });
  };

  return (
    <div className="flex min-h-screen bg-white font-sans">
      <ModalLoading isOpen={loading || updating} />
      <main className="flex-1 p-12">
        <div className="max-w-3xl">
          <h2 className="mb-6 text-3xl font-bold text-gray-800">
            Hubungkan Akun Meta Anda
          </h2>

          <section className="rounded-xl bg-white p-6 shadow-sm">
            <h3 className="mb-3 text-sm font-semibold text-gray-700">
              META API KEY
            </h3>

            <p className="mb-5 text-sm text-gray-500">
              Untuk mendapatkan Instagram Account ID dan Access Token, Anda
              perlu melakukan setup Meta Ads terlebih dahulu. Silakan ikuti
              dokumentasi resmi berikut:{" "}
              <Link
                href="https://developers.facebook.com/docs/marketing-api/get-started"
                target="_blank"
                className="text-blue-600 underline"
              >
                Dokumentasi Meta Ads
              </Link>
            </p>

            <p className="mb-5 text-sm text-gray-500">
              Setelah setup selesai, Anda akan mendapatkan data seperti pada
              gambar berikut.
            </p>

            <Image
              src="/images/tutorial.png"
              alt="tutorial image"
              height={900}
              width={1600}
              className="mb-6 rounded-lg"
            />

            <div className="mt-4">
              <div className="flex flex-col gap-3">
                <div className="flex flex-col">
                  <label className="mb-2 text-xs text-gray-500">
                    Instagram ID account
                  </label>
                  <input
                    type="text"
                    value={instagramId}
                    onChange={(e) => setInstagramId(e.target.value)}
                    placeholder="Masukkan ID akun instagram Anda..."
                    className="rounded-lg border border-gray-200 bg-gray-100 px-4 py-3 text-sm"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="mb-2 text-xs text-gray-500">Token</label>
                  <input
                    type="text"
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
                    placeholder="Masukkan Token Anda..."
                    className="rounded-lg border border-gray-200 bg-gray-100 px-4 py-3 text-sm"
                  />
                </div>

                <button
                  disabled={updating || loading}
                  onClick={handleSubmit}
                  className="cursor-pointer rounded-lg bg-blue-500 px-5 py-3 text-white transition-colors duration-300 hover:bg-blue-600"
                >
                  Hubungkan
                </button>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
