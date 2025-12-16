export interface CreateAdsPayload {
  name: string;
  type: "images" | "video";
  description: string;
  theme: string;
  platforms: string[];
  reference_media?: string | null;
}

export interface CreateAdsResponse {
  id: number;
  name: string;
  status: string;
  created_at: string;
}
