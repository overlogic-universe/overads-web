"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function CreateForm() {
  const [platform, setPlatform] = useState("");
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [theme, setTheme] = useState("");
  const [useAutoText, setUseAutoText] = useState(false);

  return (
    <form className="grid grid-cols-12 gap-6 items-start">
      {/* left column (full form area) */}
      <div className="col-span-12 lg:col-span-8 space-y-4">
        <div className="grid grid-cols-12 gap-4">
          <label className="col-span-12 md:col-span-6">
            <div className="text-sm font-medium mb-2">Nama Produk</div>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Miniatur Timothy"
              className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm"
            />
          </label>

          <label className="col-span-12 md:col-span-6">
            <div className="text-sm font-medium mb-2">Tipe</div>
            <input
              value={type}
              onChange={(e) => setType(e.target.value)}
              placeholder="Gambar"
              className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm"
            />
          </label>
        </div>

        <div className="grid grid-cols-12 gap-4">
          <label className="col-span-12 md:col-span-8">
            <div className="text-sm font-medium mb-2">Deskripsi</div>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Masukan deskripsi di sini"
              rows={8}
              className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm resize-none"
            />
          </label>

          <label className="col-span-12 md:col-span-4">
            <div className="text-sm font-medium mb-2">Tema/Style</div>
            <textarea
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              placeholder="Masukan"
              rows={8}
              className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm resize-none"
            />
          </label>
        </div>

        <div className="grid grid-cols-12 gap-4">
          <label className="col-span-12 md:col-span-6">
            <div className="text-sm font-medium mb-2">Platform</div>
            <select
              value={platform}
              onChange={(e) => setPlatform(e.target.value)}
              className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm appearance-none"
            >
              <option value="">Pilih platform yang tersedia</option>
              <option value="facebook">Facebook</option>
              <option value="instagram">Instagram</option>
              <option value="tiktok">TikTok</option>
            </select>
          </label>

          <div className="col-span-12 md:col-span-6 flex flex-col">
            <div className="text-sm font-medium mb-2">Referensi Iklan</div>
            <label className="flex-1 rounded-lg border border-gray-200 bg-gray-50 p-6 flex items-center justify-center">
              <div className="text-center">
                <div className="mb-3">
                  <Image
                    src="/images/camera.png"
                    alt="camera"
                    width={60}
                    height={60}
                  />
                </div>
                <div className="text-sm text-gray-500">Unggah / Tarik gambar referensi</div>
              </div>
            </label>
          </div>
        </div>
      </div>

      {/* right column - submit area */}
      <div className="col-span-12 lg:col-span-4 flex flex-col gap-4">
        <div className="rounded-xl p-6 bg-white/90 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium">Kredit Anda:</div>
              <div className="text-lg font-bold">10</div>
            </div>
            <button type="button" className="px-3 py-2 rounded-md bg-blue-50 text-blue-600 text-sm">
              Tambah Kredit
            </button>
          </div>
        </div>

        <div className="rounded-xl p-6 bg-white/90 border border-gray-200 shadow-sm flex-1 flex flex-col justify-between">
          <div>
            <div className="text-sm font-medium mb-2">Preview & Options</div>
            <div className="text-xs text-gray-500 mb-4">Atur preferensi tambahan sebelum membuat iklan</div>

            <div className="flex items-center justify-between gap-3 mb-3">
              <div className="text-sm">Gunakan teks otomatis</div>

              {/* Simple accessible toggle */}
              <div className="flex items-center">
                <label htmlFor="autoTextToggle" className="relative inline-flex items-center cursor-pointer">
                  <input
                    id="autoTextToggle"
                    type="checkbox"
                    className="sr-only peer"
                    checked={useAutoText}
                    onChange={() => setUseAutoText((s) => !s)}
                  />
                  {/* track */}
                  <div className="w-11 h-6 rounded-full peer bg-gray-200 peer-checked:bg-blue-600 transition-colors" />
                  {/* thumb */}
                  <div
                    aria-hidden
                    className={`absolute left-0.5 top-0.5 w-5 h-5 rounded-full bg-white shadow transform transition-transform ${
                      useAutoText ? "translate-x-5" : "translate-x-0"
                    }`}
                    style={{ pointerEvents: "none" }}
                  />
                </label>
              </div>
            </div>

            <div className="text-sm text-gray-500">Estimasi biaya: <strong>1 Credit</strong></div>
          </div>

          <div className="mt-6">
            <button
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                alert(`Iklan dibuat! (demo)\nGunakan teks otomatis: ${useAutoText ? "Ya" : "Tidak"}`);
              }}
              className="w-full rounded-lg px-6 py-3 bg-blue-600 text-white font-medium shadow-md"
            >
              Buat (1 Credit)
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
