export interface ApiKeyResponse {
  apiKey: string | null;
  igId: string | null;
}

export interface UpdateApiKeyPayload {
  igId: string;
  apiKey: string;
}

export interface UpdateApiKeyResponse {
  ok: boolean;
}