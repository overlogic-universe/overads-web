import api from "@/core/lib/axios/axios-instance";
import { CreateInvoicePayload, CreateInvoiceResponse } from "../types/payment";


export const paymentService = {
  createInvoice: async (
    payload: CreateInvoicePayload
  ): Promise<CreateInvoiceResponse> => {
    const { data } = await api.post<CreateInvoiceResponse>(
      "/payment/invoice",
      payload
    );

    return data;
  },
};
