import { useQuery } from "@tanstack/react-query";
import { Campaign } from "../../../types/campaign";
import { getCampaignDetails } from "../services/get-campaign-details";

export const useCampaignDetail = (id: string) => {
  return useQuery<Campaign | null>({
    queryKey: ["campaign", id],        
    queryFn: () => getCampaignDetails(id),
    enabled: !!id,                     
  });
};
