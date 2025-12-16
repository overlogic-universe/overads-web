
export const formatDate = (iso: string) => {
  const date = new Date(new Date(iso).getTime() );

  return date.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export const formatTime = (iso: string) => {
  const date = new Date(new Date(iso).getTime() );

  return date.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
};


export const toWIBISOString = (datetimeLocal: string) => {
  // datetimeLocal: "2025-12-17T00:13"
  const date = new Date(datetimeLocal);
  return date.toISOString();
};
