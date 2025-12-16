export interface Ad {
  id: number;
  user_id: number;
  name: string;
  type: "images" | "video";
  description: string;
  theme: string;
  platforms: string[];
  reference_media: string | null;
  created_at: string;
  updated_at: string;
}

export interface Generation {
  id: number;
  ads_id: number;
  type: string;
  prompt: string;
  status: "pending" | "processing" | "generated" | "failed" | "uploaded";
  // status : string;
  result_media: string | null;
  payload: any;
  created_at: string;
  updated_at: string;
}

export interface AdSchedule {
  id: number;
  ads_id: number;
  platform: string;
  scheduled_at: string;
//   status: "pending" | "posted" | "failed";
  status : string;
  platform_response: any;
  created_at: string;
  updated_at: string;
  generation_ads_id: number | null;

  ad: Ad;
  generation: Generation | null;
}

export interface PaginationLink {
  url: string | null;
  label: string;
  page: number | null;
  active: boolean;
}

export interface GetAdSchedulesResponse {
  current_page: number;
  data: AdSchedule[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: PaginationLink[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

export interface GetAdsResponse {
  current_page: number;
  data: Ad[];

  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;

  next_page_url: string | null;
  prev_page_url: string | null;

  path: string;
  per_page: number;
  to: number;
  total: number;
}
