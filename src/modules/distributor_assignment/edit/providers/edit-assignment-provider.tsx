"use client";

import { createContext, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAssignmentDetail } from "../services/get-assignment-detail";
import { AssignmentDetail } from "../types/assignment-detail";

type AssignmentDetailContextType = {
  data: AssignmentDetail ;
  loading: boolean;
  error: string | null;
  reload: () => void;
};

const AssignmentDetailContext =
  createContext<AssignmentDetailContextType | null>(null);

export function AssignmentDetailProvider({
  initialAssignment,
  children,
}: {
  initialAssignment: AssignmentDetail;
  children: React.ReactNode;
}) {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["assignment-detail", initialAssignment.id],
    queryFn: () => getAssignmentDetail(initialAssignment.id),
    initialData: initialAssignment,
  });

  return (
    <AssignmentDetailContext.Provider
      value={{
        data,
        loading: isLoading,
        error: error ? (error as Error).message : null,
        reload: refetch,
      }}
    >
      {children}
    </AssignmentDetailContext.Provider>
  );
}

export function useAssignmentDetailContext() {
  const ctx = useContext(AssignmentDetailContext);
  if (!ctx) {
    throw new Error(
      "useAssignmentDetailContext harus dipakai di dalam AssignmentDetailProvider",
    );
  }
  return ctx;
}
