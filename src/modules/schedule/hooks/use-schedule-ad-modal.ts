"use client";

import { useState } from "react";

export interface AdOption {
  id: number;
  title: string;
}

export const useScheduleAdModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedAdId, setSelectedAdId] = useState<number | "">("");
  const [scheduleAt, setScheduleAt] = useState<string>("");

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  return {
    isOpen,
    open,
    close,

    selectedAdId,
    setSelectedAdId,

    scheduleAt,
    setScheduleAt,
  };
};
