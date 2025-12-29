import { updateOperationalCost } from "@/modules/donation_settlement/services/update-operational-cost";
import { useMutation } from "@tanstack/react-query";

export const useUpdateOperationalCost = () => {
  return useMutation({
    mutationFn: updateOperationalCost,
  });
};
