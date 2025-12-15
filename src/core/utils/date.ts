const WIB_OFFSET = 7 * 60 * 60 * 1000;

export const formatDate = (iso: string) => {
  const date = new Date(new Date(iso).getTime() + WIB_OFFSET);

  return date.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export const formatTime = (iso: string) => {
  const date = new Date(new Date(iso).getTime() + WIB_OFFSET);

  return date.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
};
