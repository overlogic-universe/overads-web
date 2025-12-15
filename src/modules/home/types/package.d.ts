export interface PackageResponse {
  data: PackageItem[];
}

export interface PackageItem {
  id: number;
  name: string;
  price: number;
  original_price: number;
  benefits: string[];
  created_at: string;
  updated_at: string;
}
