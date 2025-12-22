import { Modal } from "@/core/components/modal/modal";
import { Title } from "@/core/components/text/title";
import CircularLoading from "@/core/components/ui/circular-loading";
import { cn } from "@/core/lib/utils";
import { AdSchedule } from "@/core/types/ad";
import { useInstagramAccount } from "@/modules/account/providers/instagram-account-provider";
import { Bookmark, Heart, MessageCircle, Send } from "lucide-react";
import Image from "next/image";
import Caption from "./caption";

interface AdResultModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedSchedule: AdSchedule | null;
}

export const AdResultModal = ({
  isOpen,
  onClose,
  selectedSchedule,
}: AdResultModalProps) => {
  if (!selectedSchedule) return null;
  const { account, loading, error } = useInstagramAccount();

  const { ad } = selectedSchedule;
  const status = selectedSchedule.generation?.status;
  const caption = selectedSchedule.generation?.caption;
  const isFailed = status === "failed";
  const isPending = status === "pending" || status === "processing";

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className={cn(
        isPending || isFailed ? "w-fit!" : "min-h-[90%] min-w-[80%]!",
      )}
    >
      {isPending ? (
        <Title
          className="text-center"
          text="Sedang diproses, mohon ditunggu sebentar.."
        />
      ) : isFailed ? (
        <Title
          className="text-center text-red-500"
          text="Anda gagal mengunggah iklan Anda. Mohon coba lagi!"
        />
      ) : (
        <div className="flex justify-between space-x-10">
          <div className="flex flex-1 flex-col justify-between">
            <Title text="Preview" />
            <div className="w-full" style={{ aspectRatio: "16 / 9" }}>
              <Image
                width={640} // lebar tetap, bisa disesuaikan
                height={360}
                alt={`${ad.name}-generated-image`}
                src={
                  selectedSchedule.generation?.result_media ??
                  "/images/example-preview.png"
                }
                className="h-full w-full object-contain"
              />
            </div>
            <div></div>
          </div>
          <div className="flex flex-1 flex-col justify-between space-y-5">
            <div className="space-y-3">
              {loading && <CircularLoading />}
              {!loading && !error && account && (
                <div className="flex items-center space-x-2">
                  <Image
                    height={60}
                    width={60}
                    alt={`${account.name}-generated-image`}
                    src={
                      account.profile_picture_url ??
                      "/images/example-preview.png"
                    }
                    className="h-14 w-14 rounded-full object-cover"
                  />
                  <Title text={account.name ?? "-"} />
                </div>
              )}
              <Caption caption={caption ?? ""} />
            </div>
            <div className="flex w-full items-center justify-between">
              <div className="flex space-x-2">
                <Heart />
                <MessageCircle />
                <Send />
              </div>
              <Bookmark />
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
};
