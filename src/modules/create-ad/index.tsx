"use client";

import { useCreateAdForm } from "./hooks/use-create-ad-form";
import { useImageUpload } from "./hooks/use-image-upload";
import { useCreateAds } from "./hooks/use-create-ads";
import { ModalLoading } from "@/core/components/modal/modal-loading";
import { ModalInfo } from "@/core/components/modal/modal-info";
import { useState } from "react";
import { AppButton } from "@/core/components/ui/app-button";

export default function CreateForm() {
  const {
    platform,
    setPlatform,
    title,
    setTitle,
    description,
    setDescription,
    theme,
    setTheme,
    useAutoText,
    setUseAutoText,
  } = useCreateAdForm();

  const {
    files,
    previews,
    isDragging,
    inputRef,
    handleInputChange,
    handleDrop,
    handleDragOver,
    handleDragLeave,
    removeFile,
    openFilePicker,
  } = useImageUpload();

  const { submit, loading, error } = useCreateAds();

  const [modalOpen, setModalOpen] = useState(false);
  const [modalSuccess, setModalSuccess] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("")

    if (!title || !platform) {
      setModalSuccess(false);
      setModalMessage("Nama produk dan platform wajib diisi.");
      setModalOpen(true);
      return;
    }

    try {
      await submit({
        name: title,
        type: "images",
        description,
        theme,
        platforms: [platform],
        reference_media: null,
      });

      setModalSuccess(true);
      setModalMessage("Iklan berhasil dibuat 🎉<br/>Silakan cek di dashboard.");
      setModalOpen(true);
    } catch (err: any) {
      setModalSuccess(false);
      setModalMessage(
        err?.response?.data?.message ?? "Terjadi kesalahan saat membuat iklan.",
      );
      setModalOpen(true);
    }
  };

  return (
    <>
      <ModalLoading isOpen={loading} />
      <ModalInfo
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        isSuccess={modalSuccess}
        message={modalMessage}
      />

      <form onSubmit={handleSubmit} className="overflow-hidden">
        {/* LEFT */}
        <div className="col-span-12 space-y-4 lg:col-span-8">
          {/* ROW 1 */}
          <div className="grid grid-cols-12 gap-4">
            <label className="col-span-12 md:col-span-6">
              <div className="mb-2 text-sm font-medium">Nama Produk</div>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Miniatur Timothy"
                className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm"
              />
            </label>

            <label className="col-span-12 md:col-span-6">
              <div className="mb-2 text-sm font-medium">Platform</div>
              <select
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
                className="w-full appearance-none rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm"
              >
                <option value="">Pilih platform yang tersedia</option>
                <option value="facebook">Facebook</option>
                <option value="instagram">Instagram</option>
                <option value="tiktok">TikTok</option>
              </select>
            </label>
          </div>

          {/* ROW 2 */}
          <div className="grid grid-cols-12 gap-4">
            <label className="col-span-12 md:col-span-8">
              <div className="mb-2 text-sm font-medium">Deskripsi</div>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Masukan deskripsi di sini"
                rows={8}
                className="w-full resize-none rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm"
              />
            </label>

            <label className="col-span-12 md:col-span-4">
              <div className="mb-2 text-sm font-medium">Tema / Style</div>
              <textarea
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                placeholder="Masukan"
                rows={8}
                className="w-full resize-none rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm"
              />
            </label>
          </div>

          {/* IMAGE UPLOAD */}
          <div>
            <div className="mb-2 text-sm font-medium">
              Referensi Iklan (gambar)
            </div>

            <div
              role="button"
              tabIndex={0}
              onClick={openFilePicker}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragEnter={handleDragOver}
              onDragLeave={handleDragLeave}
              className={`w-full cursor-pointer rounded-lg border-2 px-4 py-8 text-center transition-colors focus:outline-none ${
                isDragging
                  ? "border-dashed border-blue-500 bg-blue-50"
                  : "border-dashed border-gray-200 bg-gray-50 hover:border-gray-300"
              }`}
              style={{ minHeight: 140 }}
            >
              <input
                ref={inputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handleInputChange}
                className="hidden"
              />

              <div className="flex flex-col items-center gap-2">
                <svg width="56" height="56" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M3 7h2l1-2h8l1 2h2a1 1 0 011 1v9a1 1 0 01-1 1H3a1 1 0 01-1-1V8a1 1 0 011-1z"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle
                    cx="12"
                    cy="13"
                    r="3"
                    stroke="currentColor"
                    strokeWidth="1.2"
                  />
                </svg>

                <div className="text-sm text-gray-600">
                  Tarik & lepas gambar di sini, atau klik untuk memilih
                </div>
                <div className="text-xs text-gray-400">
                  Mendukung banyak gambar
                </div>
              </div>
            </div>

            {/* PREVIEW */}
            {files.length > 0 && (
              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                {files.map((file, i) => (
                  <div
                    key={`${file.name}-${file.size}-${i}`}
                    className="relative overflow-hidden rounded-lg border border-gray-200 bg-white"
                  >
                    <img
                      src={previews[i]}
                      alt={file.name}
                      className="h-28 w-full object-cover"
                    />

                    <div className="truncate p-2 text-xs text-gray-600">
                      {file.name}
                    </div>

                    <button
                      type="button"
                      onClick={() => removeFile(i)}
                      aria-label={`Hapus ${file.name}`}
                      className="absolute top-2 right-2 rounded-full bg-white/90 p-1 shadow"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <AppButton type="submit" text="Buat Iklan" className="mt-5 w-full!"/>
      </form>
    </>
  );
}
