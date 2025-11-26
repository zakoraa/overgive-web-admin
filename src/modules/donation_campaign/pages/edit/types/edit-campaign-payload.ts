export interface EditCampaignPayload {
  name?: string;
  background_html?: string;
  category?: string;
  status?: string;
  target_amount?: number | null;
  ended_at?: string | null; // ISO string
  image_file_base64?: string; // optional, base64
}