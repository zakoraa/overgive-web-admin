"use client";

import { createContext, useContext, useState, useCallback } from "react";
import { getAssignmentDetail } from "../services/get-assignment-detail";
import { AssignmentDetail } from "../types/assignment-detail";

type AssignmentDetailContextType = {
  data: AssignmentDetail;
  loading: boolean;
  error: string | null;
  reload: () => Promise<void>;
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
  const [data, setData] = useState(initialAssignment);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const reload = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const result = await getAssignmentDetail(initialAssignment.id);

      setData(result);
    } catch (err: any) {
      setError(err?.message ?? "Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  }, [initialAssignment.id]);

  return (
    <AssignmentDetailContext.Provider value={{ data, loading, error, reload }}>
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
