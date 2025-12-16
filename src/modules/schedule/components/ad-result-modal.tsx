import { Modal } from "@/core/components/modal/modal";
import { Title } from "@/core/components/text/title";
import { cn } from "@/core/lib/utils";
import { AdSchedule } from "@/core/types/ad";
import { Bookmark, Heart, MessageCircle, Send } from "lucide-react";
import Image from "next/image";

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

  const { ad } = selectedSchedule;
  const isPending = selectedSchedule.generation?.status === "pending";

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className={cn(isPending ? "w-fit!" : "min-h-[90%] min-w-[80%]!")}
    >
      {isPending ? (
        <Title
          className="text-center"
          text="Sedang diproses, mohon ditunggu sebentar.."
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
                src="/images/example-preview.png"
                className="h-full w-full object-contain"
              />
            </div>
            <div></div>
          </div>
          <div className="flex flex-1 flex-col justify-between space-y-5">
            <div className="flex items-center space-x-2">
              <Image
                height={60}
                width={60}
                alt={`${ad.name}-generated-image`}
                src={
                  // selectedSchedule.generation?.result_media ??
                  "/images/example-preview.png"
                }
                className="h-14 w-14 rounded-full object-cover"
              />
              <Title text="Timoty Maulana" />
            </div>
            <p>
              🐼✨ EXCLUSIVE OFFER – ACTION FIGURE PANDA! ✨🐼 💥 Hadir dalam
              battle mode paling epik! Si Panda siap menggetarkan rak koleksi
              Anda — dengan detail armor, ekspresi berani, dan pose pertarungan
              yang membuatnya tampak hidup. Bukan sekadar figur, tapi simbol
              kekuatan dan ketenangan dalam satu tubuh. 💸 Harga turun dari
              $4.99 ➜ kini hanya $1.49 per meal! ⚡ Save big, act now! Promo ini
              eksklusif & terbatas waktu, jadi jangan tunggu sampai panda-nya
              menghilang dari arena! ⭐ Didesain untuk kolektor sejati dan
              pecinta gaya dinamis. ⭐ Cocok untuk hadiah, pajangan, atau
              inspirasi di meja kerja Anda. ⭐ Tambahan efek kilau dan kemasan
              premium membuatnya tampil memukau di setiap sudut foto! 📦 Klik
              link di bio sebelum stoknya jadi legenda. Karena legenda... tak
              pernah datang dua kali. 🥋🐼 #ActionFigure #ExclusiveOffer
              #PandaWarrior #SaveBigActNow #CollectorsItem #LimitedEdition
              #ToyPhotography #BattleMode #PandaPower #EpicDeal
            </p>
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
