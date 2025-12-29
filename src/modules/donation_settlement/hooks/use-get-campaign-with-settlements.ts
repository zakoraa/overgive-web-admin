"use client";

import { useQuery, QueryFunctionContext } from "@tanstack/react-query";
import { getCampaignsWithSettlements } from "../services/get-campaigns-with-settlement";
import { PaginatedCampaignSettlements } from "../types/campaign-settlement";

export const useGetCampaignsWithSettlements = (
    page: number,
    pageSize: number,
    search?: string
) => {
    return useQuery<PaginatedCampaignSettlements, Error>({
        queryKey: ["campaigns-with-settlements", page, pageSize, search],
        queryFn: ({ queryKey }: QueryFunctionContext) => {
            const [, qPage, qPageSize, qSearch] = queryKey;
            return getCampaignsWithSettlements(
                qPage as number,
                qPageSize as number,
                qSearch as string | undefined
            );
        },
    });
};
