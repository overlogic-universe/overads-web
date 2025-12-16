export interface User {
  id: number;
  uuid: string;
  full_name: string;
  business_name: string;
  phone: string;
  email: string;
  is_admin: boolean;
  expiration_date: string | null;
  package_id: number | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
  credit: number;
}

export interface CurrentUser {
  id: number;
  uuid: string;
  full_name: string;
  business_name: string;
  phone: string;
  email: string;
  is_admin: boolean;
  expiration_date: string | null;
  package_id: number | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
  credit: number;
}