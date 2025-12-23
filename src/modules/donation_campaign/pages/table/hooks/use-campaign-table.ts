import { useQuery } from "@tanstack/react-query";
import { getCampaignsTable } from "../services/get-campaigns-table";
import { PaginatedCampaigns } from "../types/campaign-table";

export const useCampaigns = (page: number, pageSize: number, search?: string) => {
  const { data, isLoading, isError } = useQuery<PaginatedCampaigns>({
    queryKey: ["campaigns", page, pageSize, search],
    queryFn: () => getCampaignsTable(page, pageSize, search),
  });

  return {
    campaigns: data?.data ?? [],
    total: data?.total ?? 0,
    isLoading,
    isError,
  };
};

