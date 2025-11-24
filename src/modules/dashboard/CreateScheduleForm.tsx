"use client";

import React, { useMemo, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import {
  CalendarDays,
  Clock,
  Plus,
  Edit,
  Trash2,
  Globe,
  Instagram,
  Facebook,
} from "lucide-react";
import { useRouter } from "next/navigation";

/**
 * NOTE:
 * - Saya menggunakan file gambar yang kamu upload sebagai header/bg.
 *   Path lokal (yang akan kamu transform ke URL di environment) :
 *   /mnt/data/Screenshot 2025-11-24 154002.png
 */

const headerBg = "/mnt/data/Screenshot 2025-11-24 154002.png";

type ScheduleItem = {
  id: string;
  date: string; // ISO date string
  time: string; // display time
  platform: "instagram" | "facebook" | "all";
};

export default function SchedulePage() {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedRows, setSelectedRows] = useState<Record<string, boolean>>(
    {}
  );

  // Dummy data (you can replace this with API fetch)
  const schedules = useMemo<ScheduleItem[]>(
    () => [
      { id: "1", date: "2021-12-12", time: "10.15AM", platform: "instagram" },
      { id: "2", date: "2021-12-10", time: "11.20AM", platform: "facebook" },
      { id: "3", date: "2021-12-09", time: "11.45AM", platform: "instagram" },
      { id: "4", date: "2021-12-09", time: "11.45AM", platform: "all" },
      { id: "5", date: "2021-12-09", time: "11.45AM", platform: "all" },
      { id: "6", date: "2021-12-09", time: "11.45AM", platform: "all" },
      { id: "7", date: "2021-12-09", time: "11.45AM", platform: "all" },
      { id: "8", date: "2021-12-09", time: "11.45AM", platform: "all" },
    ],
    []
  );

  const toggleRow = (id: string) =>
    setSelectedRows((prev) => ({ ...prev, [id]: !prev[id] }));

  const goToCreate = () => {
    router.push("/create"); // pindah ke halaman Create
  };

  const formatDateDisplay = (iso: string) =>
    new Date(iso).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  return (
    <div
      className="w-full min-h-screen p-6"
      // headerBg dipakai sebagai subtle background di area atas untuk nuansa seperti screenshot
      style={{
        backgroundImage: `linear-gradient(90deg, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.98) 40%), url(${headerBg})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "left top",
      }}
    >
      <div className="flex gap-6">
        {/* LEFT - Calendar + Button */}
        <div className="w-72 flex flex-col gap-6">
          {/* Buat Jadwal Button */}
          <div>
            <button
              onClick={goToCreate}
              className="w-full flex items-center justify-center gap-3 bg-[#6C64FF] hover:bg-[#574fff] text-white px-4 py-3 rounded-xl shadow-md transition"
            >
              <Plus size={16} /> Buat Jadwal
            </button>
          </div>

          {/* Calendar Card */}
          <div className="bg-white rounded-xl shadow p-4">
            <div className="text-sm font-medium mb-3">
              {selectedDate.toLocaleDateString("en-GB", {
                month: "long",
                year: "numeric",
              })}
            </div>

            <div className="select-none">
              <Calendar
                onChange={(v) => setSelectedDate(v as Date)}
                value={selectedDate}
                locale="en-GB"
                calendarType="gregory"
                className="react-calendar-custom"
              />
            </div>

            <div className="mt-3 text-xs text-gray-600">
              Tanggal dipilih:{" "}
              <span className="font-medium">
                {selectedDate.toLocaleDateString("en-GB")}
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT - Main content */}
        <div className="flex-1">
          {/* Header Title + Add button (right) */}
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-semibold">Daftar Jadwal</h1>

            {/* Another Add button (like top-right in screenshot) */}
            <button
              onClick={goToCreate}
              className="flex items-center gap-2 bg-[#6C64FF] text-white px-4 py-2 rounded-xl shadow-md"
            >
              <Plus size={16} /> Tambah Iklan
            </button>
          </div>

          {/* Table Card */}
          <div className="rounded-2xl shadow-lg bg-white p-4">
            {/* table header */}
            <div className="grid grid-cols-12 gap-4 items-center text-sm font-medium text-gray-600 border-b pb-3 mb-3">
              <div className="col-span-1 flex items-center justify-center">
                {/* checkbox column header (empty) */}
              </div>
              <div className="col-span-3">Date</div>
              <div className="col-span-2">Time</div>
              <div className="col-span-4">Platform</div>
              <div className="col-span-2 text-right">Aksi</div>
            </div>

            {/* rows */}
            <div className="space-y-3">
              {schedules.map((s) => {
                const active = selectedRows[s.id];
                return (
                  <div
                    key={s.id}
                    className={`grid grid-cols-12 gap-4 items-center py-3 px-3 rounded-lg transition-shadow ${
                      active ? "shadow-md bg-gradient-to-r from-white to-blue-50" : ""
                    }`}
                  >
                    {/* checkbox */}
                    <div className="col-span-1 flex items-center justify-center">
                      <input
                        type="checkbox"
                        className="w-4 h-4"
                        checked={!!active}
                        onChange={() => toggleRow(s.id)}
                      />
                    </div>

                    {/* date */}
                    <div className="col-span-3 flex items-center gap-3 text-sm">
                      <div className="flex items-center gap-2 text-gray-700">
                        <CalendarDays size={16} />
                        <span className="font-medium">
                          {formatDateDisplay(s.date)}
                        </span>
                      </div>
                    </div>

                    {/* time */}
                    <div className="col-span-2 text-sm text-gray-700 flex items-center gap-2">
                      <Clock size={16} />
                      <span>{s.time}</span>
                    </div>

                    {/* platform badge */}
                    <div className="col-span-4 flex items-center gap-3">
                      <PlatformBadge platform={s.platform} />
                    </div>

                    {/* actions */}
                    <div className="col-span-2 flex items-center justify-end gap-3">
                      <button
                        title="Edit"
                        className="w-9 h-9 rounded-full bg-yellow-50 flex items-center justify-center hover:scale-105 transition"
                        onClick={() => {
                          /* empty for now */
                        }}
                      >
                        <Edit size={16} className="text-yellow-600" />
                      </button>

                      <button
                        title="Hapus"
                        className="w-9 h-9 rounded-full bg-red-50 flex items-center justify-center hover:scale-105 transition"
                        onClick={() => {
                          /* empty for now */
                        }}
                      >
                        <Trash2 size={16} className="text-red-600" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Small helper to render badge with icon */
function PlatformBadge({ platform }: { platform: ScheduleItem["platform"] }) {
  const common =
    "inline-flex items-center gap-2 px-4 py-1 rounded-full text-xs font-medium";
  if (platform === "instagram")
    return (
      <span className={`${common} bg-indigo-50 text-indigo-700`}>
        <Instagram size={14} /> Instagram
      </span>
    );
  if (platform === "facebook")
    return (
      <span className={`${common} bg-blue-50 text-blue-700`}>
        <Facebook size={14} /> Facebook
      </span>
    );
  return (
    <span className={`${common} bg-purple-50 text-purple-700`}>
      <Globe size={14} /> All Platform
    </span>
  );
}
