// src/types/payment.ts

export interface CreateInvoicePayload {
  package_id: number;
  success_redirect_url: string;
  failure_redirect_url: string;
}

export interface CreateInvoiceResponse {
  invoice_url: string;
}
