import { InstagramAccount } from "../types/instagram-account";

export const getInstagramAccount = async (
  accessToken: string,
): Promise<InstagramAccount> => {
  const params = new URLSearchParams({
    fields: "id,name,profile_picture_url",
    access_token: accessToken,
  });

  const res = await fetch(
    `https://graph.instagram.com/me?${params.toString()}`,
  );

  if (!res.ok) {
    const err = await res.text();
    throw new Error(err || "Gagal mengambil akun Instagram");
  }

  return res.json();
};
