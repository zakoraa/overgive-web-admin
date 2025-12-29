// providers/get-campaigns-provider.tsx
"use client";

import { ReactNode, createContext, useContext, useState } from "react";
import { PaginatedCampaignSettlements } from "../types/campaign-settlement";
import { useGetCampaignsWithSettlements } from "../hooks/use-get-campaign-with-settlements";

interface CampaignsContextType {
  page: number;
  pageSize: number;
  search: string;
  setPage: (page: number) => void;
  setSearch: (search: string) => void;
  data: PaginatedCampaignSettlements["data"];
  totalItems: number;
  isLoading: boolean;
  error: Error | null;
}

const CampaignsContext = createContext<CampaignsContextType | undefined>(
  undefined,
);

export const GetCampaignsWithSettlementsProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [search, setSearch] = useState("");

  const {
    data: paginatedData,
    isLoading,
    error,
  } = useGetCampaignsWithSettlements(page, pageSize, search);

  return (
    <CampaignsContext.Provider
      value={{
        page,
        pageSize,
        search,
        setPage,
        setSearch,
        data: paginatedData?.data || [],
        totalItems: paginatedData?.total || 0,
        isLoading,
        error: error ?? null,
      }}
    >
      {children}
    </CampaignsContext.Provider>
  );
};

export const useCampaignWithSettlementsContext = () => {
  const context = useContext(CampaignsContext);
  if (!context)
    throw new Error(
      "useCampaignWithSettlementsContext must be used within GetCampaignsWithSettlementsProvider",
    );
  return context;
};
