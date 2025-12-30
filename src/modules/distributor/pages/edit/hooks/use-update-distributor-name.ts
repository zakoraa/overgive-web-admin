"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateDistributorName } from "../services/update-distributor-name";
import { User } from "@/core/types/user";

interface UpdateDistributorNameInput {
    id: string;
    name: string;
}

export function useUpdateDistributorName() {
    const queryClient = useQueryClient();

    return useMutation<User, Error, UpdateDistributorNameInput>({
        mutationFn: updateDistributorName,
        onSuccess: (updatedUser) => {
            queryClient.invalidateQueries({ queryKey: ["user", updatedUser.id] });
        },
    });
}
