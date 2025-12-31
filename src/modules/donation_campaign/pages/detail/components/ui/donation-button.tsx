"use client";

import { useRouter } from "next/navigation";
import BasePage from "@/core/layout/base-page";
import { useCampaignDetailContext } from "../../providers/campaign-detail-provider";
import { AppButton } from "@/core/components/ui/button/app-button";

export const DonationButton = () => {
  const router = useRouter();
  const { campaign } = useCampaignDetailContext();

  if (!campaign) return null;

  return (
    <BasePage className="fixed bottom-0 h-16 w-full pt-2 pb-2!">
      <AppButton
        text="Donasi Sekarang"
        className="w-full rounded-xl!"
        onClick={() => {
          router.push(`/campaign/${campaign.id}/donate`);
        }}
      />
    </BasePage>
  );
};
