import { useMutation } from "@tanstack/react-query";
import { softDeleteOperationalCost } from "../services/delete-operational-cost";

export const useSoftDeleteOperationalCost = () => {
    return useMutation({
        mutationFn: (id: string) => softDeleteOperationalCost(id),
    });
};
