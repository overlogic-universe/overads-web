import Cookies from "js-cookie";

export const logout = () => {
  if (typeof window === "undefined") return;

  // hapus token di localStorage (kalau masih dipakai)
  localStorage.removeItem("access_token");

  // hapus cookie access_token
  Cookies.remove("access_token", {
    sameSite: "strict",
    secure: true,
  });

  // redirect ke login
  window.location.href = "/login";
};
