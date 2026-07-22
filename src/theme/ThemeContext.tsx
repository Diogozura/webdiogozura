import { createContext, useContext, useEffect, useMemo, useState, ReactNode } from 'react';

export type ThemeMode = 'light' | 'dark';
export type AccentKey = 'padrao' | 'indigo' | 'ciano' | 'lavanda' | 'verde' | 'azul' | 'laranja' | 'amarelo';

export const ACCENTS: { key: AccentKey; label: string; primary: string; secondary: string }[] = [
  { key: 'padrao', label: 'Padrão', primary: '#38BDF8', secondary: '#A855F7' },
  { key: 'indigo', label: 'Índigo', primary: '#6366F1', secondary: '#8B5CF6' },
  { key: 'ciano', label: 'Ciano', primary: '#22D3EE', secondary: '#C026D3' },
  { key: 'lavanda', label: 'Lavanda', primary: '#818CF8', secondary: '#D946EF' },
  { key: 'verde', label: 'Verde', primary: '#22C55E', secondary: '#0D9488' },
  { key: 'azul', label: 'Azul', primary: '#0EA5E9', secondary: '#1D4ED8' },
  { key: 'laranja', label: 'Laranja', primary: '#FB923C', secondary: '#F43F5E' },
  { key: 'amarelo', label: 'Amarelo', primary: '#FACC15', secondary: '#F97316' },
];

const MODE_KEY = 'dz-theme-mode';
const ACCENT_KEY = 'dz-theme-accent';

type ThemeContextValue = {
  mode: ThemeMode;
  accent: AccentKey;
  setMode: (mode: ThemeMode) => void;
  setAccent: (accent: AccentKey) => void;
  toggleMode: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<ThemeMode>('dark');
  const [accent, setAccentState] = useState<AccentKey>('padrao');

  useEffect(() => {
    const storedMode = window.localStorage.getItem(MODE_KEY) as ThemeMode | null;
    const storedAccent = window.localStorage.getItem(ACCENT_KEY) as AccentKey | null;
    if (storedMode) setModeState(storedMode);
    if (storedAccent) setAccentState(storedAccent);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', mode);
    window.localStorage.setItem(MODE_KEY, mode);
  }, [mode]);

  useEffect(() => {
    document.documentElement.setAttribute('data-accent', accent);
    window.localStorage.setItem(ACCENT_KEY, accent);
  }, [accent]);

  const value = useMemo<ThemeContextValue>(() => ({
    mode,
    accent,
    setMode: setModeState,
    setAccent: setAccentState,
    toggleMode: () => setModeState((current) => (current === 'dark' ? 'light' : 'dark')),
  }), [mode, accent]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme deve ser usado dentro de ThemeProvider');
  return context;
}
