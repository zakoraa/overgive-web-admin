"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { Campaign } from "../types/campaign";

interface CampaignDetailContextValue {
  campaign: Campaign | null;
  setCampaign: (data: Campaign | null) => void;
}

const CampaignDetailContext = createContext<
  CampaignDetailContextValue | undefined
>(undefined);

interface CampaignDetailProviderProps {
  children: ReactNode;
  initialCampaign?: Campaign;
}

export const CampaignDetailProvider = ({
  children,
  initialCampaign,
}: CampaignDetailProviderProps) => {
  const [campaign, setCampaign] = useState<Campaign | null>(
    initialCampaign ?? null,
  );

  return (
    <CampaignDetailContext.Provider value={{ campaign, setCampaign }}>
      {children}
    </CampaignDetailContext.Provider>
  );
};

export const useCampaignDetailContext = () => {
  const context = useContext(CampaignDetailContext);
  if (!context)
    throw new Error(
      "useCampaignDetailContext must be used within CampaignDetailProvider",
    );
  return context;
};
