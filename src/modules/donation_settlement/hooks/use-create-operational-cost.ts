"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createOperationalCost, updateOperationalCost } from "../services/create-operational-cost";

interface OperationalCostInput {
    campaignId: string;
    amount: number;
    note?: string;
    createdBy?: string;
}

interface UpdateOperationalInput {
    id: string;
    updates: { amount?: number; note?: string };
}

// Hook untuk create
export const useCreateOperationalCost = () => {
    const queryClient = useQueryClient();

    return useMutation<any, Error, OperationalCostInput>({
        mutationFn: (input) => createOperationalCost(input),
        onSuccess: (_data, variables) => {
            queryClient.invalidateQueries({ queryKey: ["donation-settlement-summary", variables.campaignId] });
        },
    });
};

// Hook untuk update
export const useUpdateOperationalCost = () => {
    const queryClient = useQueryClient();

    return useMutation<any, Error, UpdateOperationalInput>({
        mutationFn: ({ id, updates }) => updateOperationalCost(id, updates),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["donation-settlement-summary", data.campaign_id] });
        },
    });
};
