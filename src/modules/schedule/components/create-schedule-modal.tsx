import { Modal } from "@/core/components/modal/modal";
import { AppButton } from "@/core/components/ui/app-button";
import { useCreateAdSchedule } from "../hooks/use-create-ad-schedule";
import { useState } from "react";
import { ModalLoading } from "@/core/components/modal/modal-loading";
import { ModalInfo } from "@/core/components/modal/modal-info";
import Link from "next/link";
import { useApiKeyContext } from "@/modules/settings/providers/api-key-provider";
import { useGetCurrentUser } from "@/core/providers/get-current-user-provider";
import { Title } from "@/core/components/text/title";
import { toWIBISOString } from "@/core/utils/date";

export interface AdOption {
  id: number;
  title: string;
  description: string;
}

interface ScheduleAdModalProps {
  isOpen: boolean;
  onClose: () => void;

  ads: AdOption[];
  selectedAdId: number | "";
  onChangeAd: (id: number | "") => void;

  scheduleAt: string;
  onChangeSchedule: (value: string) => void;
}

export const ScheduleAdModal = ({
  isOpen,
  onClose,
  ads,
  selectedAdId,
  onChangeAd,
  scheduleAt,
  onChangeSchedule,
}: ScheduleAdModalProps) => {
  const { loading: gettingApiKey, apiKey, igId } = useApiKeyContext();
  const { user, loading: userLoading } = useGetCurrentUser();
  const { mutate, loading } = useCreateAdSchedule();
  const [infoOpen, setInfoOpen] = useState(false);
  const [infoMessage, setInfoMessage] = useState("");
  const [infoSuccess, setInfoSuccess] = useState(true);

  const handleSave = async () => {
    if (!selectedAdId || !scheduleAt) return;

    const scheduledAtWIB = toWIBISOString(scheduleAt);

    try {
      await mutate(selectedAdId, {
        scheduled_at: scheduledAtWIB,
      });
      setInfoMessage("Berhasil menambahkan jadwal iklan");
      setInfoSuccess(true);
      setInfoOpen(true);
      onClose();
    } catch (err: any) {
      setInfoMessage(err?.message || "Gagal menjadwalkan iklan");
      setInfoSuccess(false);
      setInfoOpen(true);
    }
  };

  const isLinked = !gettingApiKey && apiKey && igId;
  return (
    <>
      <ModalLoading isOpen={loading} />
      <ModalInfo
        isOpen={infoOpen}
        onClose={() => setInfoOpen(false)}
        isSuccess={infoSuccess}
        message={infoMessage}
      />

      <Modal isOpen={isOpen} onClose={onClose}>
        {!userLoading && user?.credit && user.credit < 0 ? (
          <Title
            className="text-center text-red-500"
            text="*Anda harus memiliki minimal 1 kredit untuk mengunggah iklan Anda"
          />
        ) : (
          <div className="mx-auto w-full max-w-md space-y-6 rounded-2xl bg-white p-6">
            {/* Header */}
            <div className="text-center">
              <h2 className="text-xl font-semibold text-gray-800">
                Jadwalkan Iklan
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Pilih iklan dan waktu penayangannya
              </p>
            </div>

            {/* Form */}
            <div className="space-y-4">
              {/* Dropdown Ads */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Pilih Iklan
                </label>
                <select
                  value={selectedAdId}
                  onChange={(e) =>
                    onChangeAd(e.target.value ? Number(e.target.value) : "")
                  }
                  className="focus:border-primary focus:ring-primary/20 w-full cursor-pointer rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm transition outline-none focus:ring-2"
                >
                  <option value="">Pilih iklan</option>
                  {ads.map((ad) => (
                    <option key={ad.id} value={ad.id}>
                      {ad.title} (
                      {ad.description
                        ? ad.description.length > 20
                          ? `${ad.description.slice(0, 20)}...`
                          : ad.description
                        : "-"}
                      )
                    </option>
                  ))}
                </select>
              </div>

              {/* Datetime */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Jadwal Tayang
                </label>
                <input
                  type="datetime-local"
                  value={scheduleAt}
                  onChange={(e) => onChangeSchedule(e.target.value)}
                  className="focus:border-primary focus:ring-primary/20 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm transition outline-none focus:ring-2"
                />
              </div>
            </div>
            {!isLinked && (
              <p className="text-xs text-red-500">
                * Silakan hubungkan akun Anda dengan Meta Ads terlebih dahulu.{" "}
                <Link
                  href="/settings"
                  className="cursor-pointer text-blue-500 underline"
                >
                  Hubungkan sekarang
                </Link>
              </p>
            )}
            {/* Action */}
            <div className="flex justify-center pt-2">
              <AppButton
                text="Ungguh Iklan"
                bgColor="bg-primary"
                width="100%"
                height="48px"
                borderRadius="16px"
                onClick={handleSave}
                disabled={!selectedAdId || !scheduleAt || !isLinked}
              />
            </div>
          </div>
        )}
      </Modal>
    </>
  );
};
