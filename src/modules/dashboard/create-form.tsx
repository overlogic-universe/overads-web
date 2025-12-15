"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import api from "@/core/lib/axios/axios-instance";

type User = {
  id?: string;
  full_name?: string;
  business_name?: string;
  avatar_url?: string;
  credits?: number;
};

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "";

export default function CreateForm() {
  // form state
  const [platform, setPlatform] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [theme, setTheme] = useState("");
  const [useAutoText, setUseAutoText] = useState(false);


  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);


  const [user, setUser] = useState<User | null>(null);
  const [loadingUser, setLoadingUser] = useState<boolean>(true);
  const [userError, setUserError] = useState<string | null>(null);


  const onFilesAdded = useCallback((incoming: FileList | File[]) => {
    const arr = Array.from(incoming);
    const images = arr.filter((f) => f.type.startsWith("image/"));
    const merged = [...files, ...images].filter(
      (v, i, a) => a.findIndex((x) => x.name === v.name && x.size === v.size) === i
    );
    setFiles(merged);
  }, [files]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    onFilesAdded(e.target.files);
    e.currentTarget.value = ""; 
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer?.files && e.dataTransfer.files.length) {
      onFilesAdded(e.dataTransfer.files);
    }
  };
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };
  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };


  const previews = useMemo(() => files.map((f) => URL.createObjectURL(f)), [files]);
  useEffect(() => {
    return () => {
      previews.forEach((u) => URL.revokeObjectURL(u));
    };
  }, [previews]);

  const onClickUploadArea = () => {
    inputRef.current?.click();
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();


    alert(
      `Iklan dibuat bang!
Nama Produk: ${title || "-"}
Platform: ${platform || "-"}
Deskripsi len: ${description.length}
Tema len: ${theme.length}
Gambar: ${files.length} file(s)
Gunakan teks otomatis: ${useAutoText ? "Ya" : "Tidak"}`
    );

  };


  const credits = user?.credits ?? 13; 

  return (
    <form className="grid grid-cols-12 gap-6 items-start" onSubmit={handleSubmit}>
     
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
            <div className="text-sm font-medium mb-2">Tema / Style</div>
            <textarea
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              placeholder="Masukan"
              rows={8}
              className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm resize-none"
            />
          </label>
        </div>

   
        <div>
          <div className="text-sm font-medium mb-2">Referensi Iklan (gambar)</div>

          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragEnter={handleDragOver}
            onDragLeave={handleDragLeave}
            role="button"
            tabIndex={0}
            onClick={onClickUploadArea}
            className={`w-full rounded-lg border-2 transition-colors px-4 py-8 text-center cursor-pointer focus:outline-none ${
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

            <div className="flex flex-col items-center justify-center gap-2">
              <svg
                width="56"
                height="56"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M3 7h2l1-2h8l1 2h2a1 1 0 011 1v9a1 1 0 01-1 1H3a1 1 0 01-1-1V8a1 1 0 011-1z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="12" cy="13" r="3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>

              <div className="text-sm text-gray-600">
                Tarik & lepas gambar di sini, atau klik untuk memilih dari file manager
              </div>
              <div className="text-xs text-gray-400">Mendukung banyak gambar — ukuran maksimum tergantung server</div>
            </div>
          </div>

        
          {files.length > 0 && (
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {files.map((f, i) => {
                const url = previews[i];
                return (
                  <div key={`${f.name}-${f.size}-${i}`} className="relative rounded-lg overflow-hidden border border-gray-200 bg-white">
                    <img src={url} alt={f.name} className="w-full h-28 object-cover" />
                    <div className="p-2 text-xs text-gray-600 truncate">{f.name}</div>
                    <button
                      type="button"
                      onClick={() => removeFile(i)}
                      className="absolute top-2 right-2 rounded-full bg-white/90 p-1 shadow"
                      aria-label={`Hapus ${f.name}`}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

   
      <div className="col-span-12 lg:col-span-4 flex flex-col gap-4">
        <div className="rounded-xl p-6 bg-white/90 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium">Kredit Anda:</div>
              <div className="text-lg font-bold">{credits}</div>
            </div>
            <button
              type="button"
              onClick={async () => {
                
              }}
              className="px-3 py-2 rounded-md bg-blue-50 text-blue-600 text-sm"
            >
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

  
              <div className="flex items-center">
                <label htmlFor="autoTextToggle" className="relative inline-flex items-center cursor-pointer">
                  <input
                    id="autoTextToggle"
                    type="checkbox"
                    className="sr-only peer"
                    checked={useAutoText}
                    onChange={() => setUseAutoText((s) => !s)}
                  />
                  <div className="w-11 h-6 rounded-full peer bg-gray-200 peer-checked:bg-blue-600 transition-colors" />
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
