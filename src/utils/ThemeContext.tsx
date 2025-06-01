import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface AppContextType {
  lastScrollY: number;
  setLastScrollY: (position: number) => void;
  isMobile: boolean;
  menuOpen: boolean;
  toggleMenu: () => void;
  closeMenu: () => void;
}

const defaultContext: AppContextType = {
  lastScrollY: 0,
  setLastScrollY: () => {},
  isMobile: false,
  menuOpen: false,
  toggleMenu: () => {},
  closeMenu: () => {},
};

const AppContext = createContext<AppContextType>(defaultContext);

export const useAppContext = () => useContext(AppContext);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Initial check
    checkMobile();

    // Add resize listener
    window.addEventListener('resize', checkMobile);

    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    // Close menu when changing to desktop
    if (!isMobile) {
      closeMenu();
    }
  }, [isMobile]);

  return (
    <AppContext.Provider
      value={{
        lastScrollY,
        setLastScrollY,
        isMobile,
        menuOpen,
        toggleMenu,
        closeMenu,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}; 