import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getCampaignsTable, deleteCampaign } from "../services/campaign-service";
import { PaginatedCampaigns } from "../types/campaign";

export const useCampaigns = (page: number, pageSize: number) => {
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery<PaginatedCampaigns>({
    queryKey: ["campaigns", page, pageSize],
    queryFn: () => getCampaignsTable(page, pageSize),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteCampaign,
      onSuccess: () => queryClient.invalidateQueries({ queryKey: ["campaigns"], exact: false }),
  });


  return {
    campaigns: data?.data ?? [], // default kosong array
    total: data?.total ?? 0,     // default 0
    isLoading,
    isError,
    deleteCampaign: deleteMutation.mutate,
  };
};
