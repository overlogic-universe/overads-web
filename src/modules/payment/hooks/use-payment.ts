// src/hooks/usePayment.ts
import { useState } from "react";
import { paymentService } from "../services/payment";
import { CreateInvoicePayload } from "../types/payment";

export const usePayment = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [invoiceUrl, setInvoiceUrl] = useState<string | null>(null);

  const createInvoice = async (payload: CreateInvoicePayload) => {
    try {
      setLoading(true);
      setError(null);

      const res = await paymentService.createInvoice(payload);
      setInvoiceUrl(res.invoice_url);

      return res;
    } catch (err: any) {
      setError(err?.message || "Gagal membuat invoice");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    createInvoice,
    invoiceUrl,
    loading,
    error,
  };
};
