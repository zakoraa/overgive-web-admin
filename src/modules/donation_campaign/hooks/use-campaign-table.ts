import { useQuery } from "@tanstack/react-query";
import { getCampaignsTable } from "../services/campaign-service";
import { PaginatedCampaigns } from "../types/campaign";

export const useCampaigns = (page: number, pageSize: number) => {

  const { data, isLoading, isError } = useQuery<PaginatedCampaigns>({
    queryKey: ["campaigns", page, pageSize],
    queryFn: () => getCampaignsTable(page, pageSize),
  });

  return {
    campaigns: data?.data ?? [], // default kosong array
    total: data?.total ?? 0,     // default 0
    isLoading,
    isError,
  };
};
