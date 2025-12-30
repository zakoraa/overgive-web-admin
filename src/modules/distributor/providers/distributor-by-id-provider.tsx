"use client";

import { createContext, useContext, ReactNode } from "react";
import { useDistributorById } from "../hooks/use-distributor-by-id";
import { User } from "@/core/types/user";

interface DistributorByIdContextProps {
  data: User | null | undefined;
  loading: boolean;
  error: string | null;
  reload: () => void;
}

const DistributorByIdContext = createContext<
  DistributorByIdContextProps | undefined
>(undefined);

interface DistributorByIdProviderProps {
  distributorId: string;
  children: ReactNode;
}

export const DistributorByIdProvider = ({
  distributorId,
  children,
}: DistributorByIdProviderProps) => {
  const { data, loading, error, reload } = useDistributorById(distributorId);

  return (
    <DistributorByIdContext.Provider value={{ data, loading, error, reload }}>
      {children}
    </DistributorByIdContext.Provider>
  );
};

export const useDistributorByIdContext = () => {
  const context = useContext(DistributorByIdContext);
  if (!context) {
    throw new Error(
      "useDistributorByIdContext harus digunakan di dalam DistributorByIdProvider",
    );
  }
  return context;
};
