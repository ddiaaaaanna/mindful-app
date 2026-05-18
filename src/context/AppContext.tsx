import { createContext, useState } from "react";

type AppContextType = {
  activePage: string;
  setActivePage: React.Dispatch<React.SetStateAction<string>>;
};

export const AppContext = createContext<AppContextType | undefined>(undefined);

function AppContextProvider({ children }: { children: React.ReactNode }) {
  const [activePage, setActivePage] = useState("");

  return (
    <AppContext.Provider value={{ activePage, setActivePage }}>
      {children}
    </AppContext.Provider>
  );
}

export default AppContextProvider;
