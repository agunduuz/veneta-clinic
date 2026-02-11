// contexts/SidebarRefreshContext.tsx
"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";

interface SidebarRefreshContextType {
  refreshKey: number;
  triggerRefresh: () => void;
}

const SidebarRefreshContext = createContext<SidebarRefreshContextType>({
  refreshKey: 0,
  triggerRefresh: () => {},
});

export function SidebarRefreshProvider({ children }: { children: ReactNode }) {
  const [refreshKey, setRefreshKey] = useState(0);

  const triggerRefresh = useCallback(() => {
    setRefreshKey((prev) => prev + 1);
  }, []);

  return (
    <SidebarRefreshContext.Provider value={{ refreshKey, triggerRefresh }}>
      {children}
    </SidebarRefreshContext.Provider>
  );
}

export function useSidebarRefresh() {
  return useContext(SidebarRefreshContext);
}
