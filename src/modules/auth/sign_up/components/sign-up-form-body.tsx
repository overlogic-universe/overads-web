"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Alert from "@/core/components/ui/alert";
import { AppButton } from "@/core/components/ui/app-button";
import { AppInput } from "@/core/components/ui/app-input";
import Link from "next/link";
import api from "@/core/lib/axios/axios-instance";

interface FormState {
  full_name: string;
  business_name: string;
  phone: string;
  email: string;
  password: string;
}

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "";

function normalizePhone(raw: string) {
  if (!raw) return "";

  const onlyDigits = raw.replace(/\D+/g, "");
  if (!onlyDigits) return "";

  if (/^0/.test(onlyDigits)) {
    return "62" + onlyDigits.replace(/^0+/, "");
  }

  if (/^62/.test(onlyDigits)) {
    return onlyDigits;
  }

  return onlyDigits;
}

function isValidPhone(normalized: string) {
  if (!normalized) return false;
  if (!/^\d+$/.test(normalized)) return false;
  const len = normalized.length;
  return len >= 9 && len <= 15;
}

export default function SignUpFormBody() {
  const router = useRouter();
  const [form, setForm] = useState<FormState>({
    full_name: "",
    business_name: "",
    phone: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState<string>("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowAlert("");
    setFieldErrors({});

    if (
      !form.full_name ||
      !form.business_name ||
      !form.phone ||
      !form.email ||
      !form.password
    ) {
      setShowAlert("Semua field harus diisi.");
      return;
    }
    if (form.password.length < 6) {
      setShowAlert("Password minimal 6 karakter.");
      return;
    }

    const normalizedPhone = normalizePhone(form.phone);
    if (!isValidPhone(normalizedPhone)) {
      const msg = "The phone field format is invalid.";
      setFieldErrors((prev) => ({ ...prev, phone: [msg] }));
      setShowAlert(msg);
      return;
    }

    setLoading(true);
    try {
      console.log("body regist: ", {
        full_name: form.full_name,
        business_name: form.business_name,
        phone: normalizedPhone,
        email: form.email,
        password: form.password,
      });
      const res = await api.post("/register", {
        full_name: form.full_name,
        business_name: form.business_name,
        phone: normalizedPhone,
        email: form.email,
        password: form.password,
      });

      const raw = await res.data;
      let parsed: any;
      try {
        parsed = JSON.parse(raw);
      } catch {
        parsed = raw;
      }

      console.debug("REGISTER RESPONSE:", res.status, parsed);

      if (res.status === 201) {
        router.push("/login");
        return;
      }

      if (res.status === 422) {
        if (typeof parsed === "string") {
          setShowAlert(parsed);

          if (parsed.toLowerCase().includes("phone")) {
            setFieldErrors((prev) => ({ ...prev, phone: [parsed] }));
          }
          return;
        }

        if (parsed && typeof parsed === "object") {
          if (parsed.errors && typeof parsed.errors === "object") {
            const fe: Record<string, string[]> = {};
            Object.keys(parsed.errors).forEach((k) => {
              const v = parsed.errors[k];
              fe[k] = Array.isArray(v) ? v.map(String) : [String(v)];
            });
            setFieldErrors(fe);
            const firstKey = Object.keys(fe)[0];
            if (firstKey) setShowAlert(fe[firstKey][0]);
            return;
          }

          if (parsed.message) {
            setShowAlert(parsed.message);
            return;
          }
        }

        setShowAlert("Validasi gagal. Periksa input.");
        return;
      }

      if (typeof parsed === "string") setShowAlert(parsed);
      else
        setShowAlert(
          parsed?.message ?? `Gagal membuat akun (status ${res.status}).`,
        );
    } catch (err: any) {
      console.error("Register error:", err);
      setShowAlert(`Terjadi kesalahan jaringan: ${err?.message ?? err}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="space-y-3" onSubmit={handleSubmit}>
      <AppInput
        label="Nama"
        hint="Nama anda"
        value={form.full_name}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setForm((prev) => ({ ...prev, full_name: e.target.value }))
        }
        error={
          fieldErrors.full_name ? fieldErrors.full_name.join(" ") : undefined
        }
      />
      {!fieldErrors.full_name ? null : (
        <p className="mt-1 text-sm text-red-600">
          {fieldErrors.full_name.join(" ")}
        </p>
      )}

      <AppInput
        label="Nama Bisnis"
        hint="Nama Bisnis"
        value={form.business_name}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setForm((prev) => ({ ...prev, business_name: e.target.value }))
        }
        error={
          fieldErrors.business_name
            ? fieldErrors.business_name.join(" ")
            : undefined
        }
      />
      {!fieldErrors.business_name ? null : (
        <p className="mt-1 text-sm text-red-600">
          {fieldErrors.business_name.join(" ")}
        </p>
      )}

      <AppInput
        label="No. Telepon"
        hint="Contoh: 08123456789"
        value={form.phone}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setForm((prev) => ({ ...prev, phone: e.target.value }))
        }
        error={fieldErrors.phone ? fieldErrors.phone.join(" ") : undefined}
      />
      {!fieldErrors.phone ? null : (
        <p className="mt-1 text-sm text-red-600">
          {fieldErrors.phone.join(" ")}
        </p>
      )}

      <AppInput
        label="Email"
        hint="contoh@gmail.com"
        value={form.email}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setForm((prev) => ({ ...prev, email: e.target.value }))
        }
        error={fieldErrors.email ? fieldErrors.email.join(" ") : undefined}
      />
      {!fieldErrors.email ? null : (
        <p className="mt-1 text-sm text-red-600">
          {fieldErrors.email.join(" ")}
        </p>
      )}

      <AppInput
        label="Password"
        hint="Minimal 6 karakter"
        isPassword={true}
        value={form.password}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setForm((prev) => ({ ...prev, password: e.target.value }))
        }
        error={
          fieldErrors.password ? fieldErrors.password.join(" ") : undefined
        }
      />
      {!fieldErrors.password ? null : (
        <p className="mt-1 text-sm text-red-600">
          {fieldErrors.password.join(" ")}
        </p>
      )}

      <AppButton
        width="100%"
        className="my-5"
        text="Daftar"
        type="submit"
        isLoading={loading}
      />

      <p className="text-center text-sm">
        Sudah punya akun?{" "}
        <span className="text-primary font-bold">
          <Link href={"/login"}>Login</Link>
        </span>
      </p>

      {showAlert && (
        <div className="my-5">
          <Alert variant="error" title="Gagal Daftar" message={showAlert} />
        </div>
      )}
    </form>
  );
}
