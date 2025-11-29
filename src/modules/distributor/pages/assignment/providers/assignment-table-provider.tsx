"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { DistributorAssignment } from "../types/distributor-assignment";
import { getDistributorAssignments } from "../services/get-distributor-assignments";

interface AssignmentContextType {
  assignments: DistributorAssignment[];
  isLoading: boolean;
  page: number;
  totalPages: number;
  setPage: (page: number) => void;
  reload: () => Promise<void>;
}

const AssignmentContext = createContext<AssignmentContextType>({
  assignments: [],
  isLoading: true,
  page: 1,
  totalPages: 1,
  setPage: () => {},
  reload: async () => {},
});

export const useAssignmentContext = () => useContext(AssignmentContext);

export const AssignmentProvider = ({ children }: { children: React.ReactNode }) => {
  const [assignments, setAssignments] = useState<DistributorAssignment[]>([]);
  const [isLoading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const load = async () => {
    setLoading(true);

    const res = await getDistributorAssignments({ page, limit: 10 });

    setAssignments(res.data);
    setTotalPages(res.totalPages);

    setLoading(false);
  };

  useEffect(() => {
    load();
  }, [page]); // reload ketika page berubah

  return (
    <AssignmentContext.Provider
      value={{
        assignments,
        isLoading,
        page,
        totalPages,
        setPage,
        reload: load,
      }}
    >
      {children}
    </AssignmentContext.Provider>
  );
};
