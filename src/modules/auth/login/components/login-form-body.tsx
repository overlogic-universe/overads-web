"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Alert from "@/core/components/ui/alert";
import { AppButton } from "@/core/components/ui/app-button";
import { AppInput } from "@/core/components/ui/app-input";
import Link from "next/link";
import { login } from "../services/login";
import Cookies from "js-cookie";

export default function LoginFormBody() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Email dan password wajib diisi");
      return;
    }

    try {
      setLoading(true);

      const data = await login({ email, password });

      // simpan token untuk axios
      localStorage.setItem("access_token", data.token);

      // simpan token untuk middleware / proxy
      Cookies.set("access_token", data.token, {
        expires: 7,
        sameSite: "strict",
        secure: true,
      });

      // (opsional)
      localStorage.setItem("user", JSON.stringify(data.user));

      // simpan token
      localStorage.setItem("access_token", data.token);

      // (opsional) simpan user
      localStorage.setItem("user", JSON.stringify(data.user));
      window.location.href = "/login";

    } catch (err: any) {
      setError(err?.response?.data?.message ?? "Email atau password salah");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <AppInput
        hint="contoh@gmail.com"
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <AppInput
        hint="Password minimal 6 karakter"
        label="Password"
        isPassword
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <AppButton type="submit" text="Login" isLoading={loading} width="100%" />

      {error && <Alert variant="error" title="Gagal Login" message={error} />}

      <p className="text-center text-sm">
        Belum punya akun?{" "}
        <Link href="/sign-up" className="text-primary font-bold">
          Daftar
        </Link>
      </p>
    </form>
  );
}
