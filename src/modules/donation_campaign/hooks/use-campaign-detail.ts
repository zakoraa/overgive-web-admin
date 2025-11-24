import { useQuery } from "@tanstack/react-query";
import { getCampaignDetail } from "../services/campaign-service";
import { Campaign } from "../types/campaign";

export const useCampaignDetail = (id: string) => {
  return useQuery<Campaign | null>({
    queryKey: ["campaign", id],        // unik per campaign
    queryFn: () => getCampaignDetail(id),
    enabled: !!id,                     // hanya fetch kalau ada id
  });
};
