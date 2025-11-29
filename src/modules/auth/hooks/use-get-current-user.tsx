"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUser } from "../services/get-current-user";

interface GetCurrentUserContextType {
  user: any;
  loading: boolean;
  reloadUser: () => Promise<void>;
}

const GetCurrentUserContext = createContext<GetCurrentUserContextType>({
  user: null,
  loading: true,
  reloadUser: async () => {},
});

export const useGetCurrentUserContext = () => useContext(GetCurrentUserContext);

export function GetCurrentUserProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const loadUser = async () => {
    setLoading(true);

    const data = await getCurrentUser();
    setUser(data);

    setLoading(false);
  };

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <GetCurrentUserContext.Provider
      value={{
        user,
        loading,
        reloadUser: loadUser,
      }}
    >
      {children}
    </GetCurrentUserContext.Provider>
  );
}
