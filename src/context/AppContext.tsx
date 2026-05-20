import { createContext, useState } from "react";

type AppContextType = {
  activePage: string;
  setActivePage: React.Dispatch<React.SetStateAction<string>>;
  timerActive: boolean;
  setTimerActive: React.Dispatch<React.SetStateAction<boolean>>;
};

export const AppContext = createContext<AppContextType | undefined>(undefined);

function AppContextProvider({ children }: { children: React.ReactNode }) {
  const [activePage, setActivePage] = useState("");
  const [timerActive, setTimerActive] = useState(false);

  return (
    <AppContext.Provider
      value={{ activePage, setActivePage, timerActive, setTimerActive }}
    >
      {children}
    </AppContext.Provider>
  );
}

export default AppContextProvider;
