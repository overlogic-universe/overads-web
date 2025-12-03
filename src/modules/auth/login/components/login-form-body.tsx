"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Alert from "@/core/components/ui/alert";
import { AppButton } from "@/core/components/ui/app-button";
import { AppInput } from "@/core/components/ui/app-input";
import Link from "next/link";
import api from "@/core/lib/axios/axios-instance";

interface FormState {
  email: string;
  password: string;
}

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "";

export default function LoginFormBody() {
  const router = useRouter();
  const [form, setForm] = useState<FormState>({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowAlert("");

    if (!form.email || !form.password) {
      setShowAlert("Email dan password harus diisi.");
      return;
    }

    setLoading(true);
    try {
      const res = await api.post("/login", {
        email: form.email,
        password: form.password,
      });

      console.log("API URL: ", api.getUri)

      const raw = await res.data;
      console.log("RESpON LOGIN: ", res);
      let parsed: any;
      try {
        parsed = JSON.parse(raw);
      } catch {
        parsed = raw;
      }

      if (res.status === 200) {
        if (parsed && typeof parsed === "object") {
          const token =
            parsed.token ?? parsed.access_token ?? parsed.data?.token;
          if (token) localStorage.setItem("access_token", token);
        }

        // router.push("/create");
        return;
      }

      if (res.status === 401) {
        setShowAlert(
          typeof parsed === "string"
            ? parsed
            : (parsed?.message ?? "Kredensial tidak valid."),
        );
        return;
      }

      setShowAlert(
        typeof parsed === "string"
          ? parsed
          : (parsed?.message ?? `Login gagal (status ${res.status})`),
      );
    } catch (err: any) {
      console.error("Login error:", err);
      setShowAlert(`Terjadi kesalahan jaringan: ${err?.message ?? err}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="space-y-3" onSubmit={handleSubmit}>
      <AppInput
        label="Email"
        hint="contoh@gmail.com"
        value={form.email}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setForm((prev) => ({ ...prev, email: e.target.value }))
        }
      />

      <AppInput
        label="Password"
        hint="Minimal 6 karakter"
        isPassword={true}
        value={form.password}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setForm((prev) => ({ ...prev, password: e.target.value }))
        }
      />

      <AppButton
        width="100%"
        className="my-5"
        text="Login"
        type="submit"
        isLoading={loading}
      />
      <p className="text-center text-sm">
        Belum punya akun?{" "}
        <span className="text-primary font-bold">
          <Link href={"/sign-up"}>Daftar</Link>
        </span>
      </p>

      {showAlert && (
        <div className="my-5">
          <Alert variant="error" title="Gagal Masuk" message={showAlert} />
        </div>
      )}
    </form>
  );
}
