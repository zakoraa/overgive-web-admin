"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createOperationalCost } from "../services/create-operational-cost";

interface OperationalCostInput {
    campaignId: string;
    amount: number;
    maxAllowedAmount: number;
    receiptImageUrl: string;
    note: string;
}

export const useCreateOperationalCost = () => {
    const queryClient = useQueryClient();

    return useMutation<any, Error, OperationalCostInput>({
        mutationFn: (input) => createOperationalCost(input),
        onSuccess: (_data, variables) => {
            queryClient.invalidateQueries({
                queryKey: ["donation-settlement-summary", variables.campaignId],
            });
        },
    });
};
