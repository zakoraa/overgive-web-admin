import { useEffect, useState } from "react";
import { DonationWithBlockchain } from "../services/get-donation-by-id";
import { extractDonationHashFromInput } from "../utils/extract-donation-hash-from-input";
import { generateDonationHash } from "@/modules/donation_campaign/pages/detail/utils/generate-donation-hash";

export function useVerifyDonationDetail(donation: DonationWithBlockchain | null) {
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!donation || !donation.blockchain_tx_hash) return;

    const verify = async () => {
      setLoading(true);

      const regeneratedHash = generateDonationHash({
        user_id: donation.user_id,
        username: donation.username,
        user_email: donation.user_email,
        campaign_id: donation.campaign_id,
        amount: donation.amount,
        currency: donation.currency,
        donation_message: donation.donation_message,
        xendit_reference_id: donation.xendit_reference_id,
      });


      if (!donation.blockchain) {
        setIsValid(false);
        setLoading(false);
        return;
      }

      const blockchainHash = extractDonationHashFromInput(
        donation.blockchain.input
      );

      setIsValid(regeneratedHash === blockchainHash);
      setLoading(false);
    };

    verify();
  }, [donation]);

  return {
    isValid,
    loading,
  };
}