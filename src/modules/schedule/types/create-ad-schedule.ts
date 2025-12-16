// core/types/ad.ts
export interface CreateAdSchedulePayload {
  scheduled_at: string; // ISO string
}

export interface CreateAdScheduleResponse {
  message: string;
  scheduled_at: string;
}