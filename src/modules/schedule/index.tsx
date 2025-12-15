"use client";

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
  Eye,
} from "lucide-react";
import CircularLoading from "@/core/components/ui/circular-loading";
import { formatDate, formatTime } from "@/core/utils/date";
import { useAdSchedules } from "./providers/ad-schedules-provider";
import { ScheduleAdModal } from "./components/create-schedule-modal";
import { useScheduleAdModal } from "./hooks/use-schedule-ad-modal";
import { useAds } from "./providers/ads-provider";
import { useState } from "react";
import { AdSchedule } from "@/core/types/ad";
import { AdResultModal } from "./components/ad-result-modal";

export default function SchedulePage() {
  const { schedules, loading, error } = useAdSchedules();
  const { ads } = useAds();

  const adOptions = ads.map((ad) => ({
    id: ad.id,
    title: ad.name,
    description: ad.description,
  }));

  const {
    isOpen,
    open,
    close,
    selectedAdId,
    setSelectedAdId,
    scheduleAt,
    setScheduleAt,
  } = useScheduleAdModal();

  const [previewSchedule, setPreviewSchedule] = useState<AdSchedule | null>(
    null,
  );
  const [previewOpen, setPreviewOpen] = useState(false);

  const openPreview = (schedule: AdSchedule) => {
    setPreviewSchedule(schedule);
    setPreviewOpen(true);
  };

  return (
    <div
      className="min-h-screen w-full p-6"
      style={{
        backgroundImage: `linear-gradient(90deg, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.98) 40%), url(/mnt/data/Screenshot 2025-11-24 154002.png)`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "left top",
      }}
    >
      {/* Modal create schedule */}
      <ScheduleAdModal
        isOpen={isOpen}
        onClose={close}
        ads={adOptions}
        selectedAdId={selectedAdId}
        onChangeAd={setSelectedAdId}
        scheduleAt={scheduleAt}
        onChangeSchedule={setScheduleAt}
      />

      {/* Modal preview */}
      <AdResultModal
        isOpen={previewOpen}
        onClose={() => setPreviewOpen(false)}
        selectedSchedule={previewSchedule}
      />

      <div className="flex gap-6">
        <div className="flex-1">
          <div className="mb-4 flex items-center justify-between">
            <h1 className="text-2xl font-semibold">Daftar Jadwal</h1>
            <button
              onClick={open}
              className="flex cursor-pointer items-center gap-2 rounded-xl bg-[#6C64FF] px-4 py-2 text-white shadow-md hover:bg-[#5b52ff]"
            >
              <Plus size={16} /> Buat Jadwal
            </button>
          </div>

          {loading && <CircularLoading />}
          {error && (
            <div className="py-6 text-center text-sm text-red-500">{error}</div>
          )}

          {schedules.map((item) => (
            <div
              key={item.id}
              className="my-1 grid grid-cols-12 items-center gap-4 rounded-lg border border-gray-300 bg-white px-3 py-3 transition-shadow"
            >
              <div className="col-span-2 flex items-center gap-2 text-sm text-gray-700">
                <CalendarDays size={16} />
                <span className="font-medium">
                  {formatDate(item.scheduled_at)}
                </span>
              </div>
              <div className="col-span-2 flex items-center gap-2 text-sm text-gray-700">
                <Clock size={16} />
                <span>{formatTime(item.scheduled_at)} WIB</span>
              </div>
              <div className="col-span-3">
                <PlatformBadge platform={item.platform as any} />
              </div>
              <div className="col-span-3">
                <p className="line-clamp-1 text-sm font-medium text-gray-800">
                  {item.ad?.name ?? "-"}
                </p>
                <p className="line-clamp-1 text-xs text-gray-500">
                  {item.ad?.description ?? "-"}
                </p>
              </div>

              <div className="col-span-2 flex items-center justify-end gap-3">
                <button
                  title="Preview"
                  onClick={() => openPreview(item)}
                  className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-yellow-50 transition hover:scale-105"
                >
                  <Eye size={16} className="text-yellow-600" />
                </button>

                <button
                  title="Hapus"
                  className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-red-50 transition hover:scale-105"
                >
                  <Trash2 size={16} className="text-red-600" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PlatformBadge({ platform }: { platform: string }) {
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
      <span className={`${common} bg-blue-50 text-blue-600`}>
        <Facebook size={14} /> Facebook
      </span>
    );
  return (
    <span className={`${common} bg-purple-50 text-purple-700`}>
      <Globe size={14} /> All Platform
    </span>
  );
}
