import { createContext, useContext, ReactNode, useState } from "react";
import { useCampaigns } from "../hooks/use-campaign-table";

interface CampaignContextValue {
  campaigns: ReturnType<typeof useCampaigns>["campaigns"];
  total: number;
  isLoading: boolean;
  isError: boolean;
  page: number;
  pageSize: number;
  setPage: (page: number) => void;
  totalPages: number;
}

const CampaignTableContext = createContext<CampaignContextValue | undefined>(
  undefined,
);

export const CampaignTableProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const { campaigns, total, isLoading, isError } = useCampaigns(
    page,
    pageSize,
  );

  const totalPages = Math.ceil(total / pageSize);

  return (
    <CampaignTableContext.Provider
      value={{
        campaigns,
        total,
        isLoading,
        isError,
        page,
        pageSize,
        setPage,
        totalPages,
      }}
    >
      {children}
    </CampaignTableContext.Provider>
  );
};

export const useCampaignContext = () => {
  const context = useContext(CampaignTableContext);
  if (!context)
    throw new Error(
      "useCampaignContext harus dipakai di dalam CampaignProvider",
    );
  return context;
};
