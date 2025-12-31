"use client";

import CircularLoading from "@/core/components/ui/circular-loading";
import BasePage from "@/core/layout/base-page";
import { DonorDonationCard } from "./campaign_donors_card/donor-donation-card";
import { Campaign as CampaignType } from "../types/campaign";
import { Title } from "@/core/components/text/title";
import { Line } from "@/core/components/ui/line";
import { useGetDonationsContext } from "@/modules/donation/providers/get-donations-provider";

interface CampaignProps {
  initialCampaign: CampaignType;
}

export const CampaignDonations = ({ initialCampaign }: CampaignProps) => {
  const { donations, loading, error } = useGetDonationsContext();

  return (
    <BasePage className="mx-auto space-y-2! rounded-b-2xl border border-gray-300 bg-white px-4 py-3 text-start md:max-w-lg md:min-w-lg">
      <Title text={`Daftar Donasi Kampanye ${initialCampaign.title}`} />
      <Line />
      {loading && <CircularLoading />}
      {!loading && !error && donations.length === 0 && (
        <p className="text-center text-xs text-gray-500"> Belum ada donasi</p>
      )}
      {!loading &&
        !error &&
        donations.map((donation, index) => (
          <DonorDonationCard key={index} donation={donation} />
        ))}
    </BasePage>
  );
};
