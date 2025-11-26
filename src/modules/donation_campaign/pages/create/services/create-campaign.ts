import { CampaignCreateInput } from "../types/campaign-create-input";

export async function createCampaign(payload: CampaignCreateInput) {
  const res = await fetch("/api/campaign/create", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  return res;
}