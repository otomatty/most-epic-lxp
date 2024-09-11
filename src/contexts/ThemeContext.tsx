import {
  createContext,
  useContext,
  createSignal,
  JSX,
  onMount,
} from "solid-js";
import { getUserData, updateUserData } from "../services/userService";

interface ThemeContextProps {
  themeColors: string[];
  setThemeColors: (colors: string[]) => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider = (props: { children: JSX.Element }) => {
  const [themeColors, setThemeColors] = createSignal<string[]>([
    "#007bff",
    "#28a745",
    "#ffc107",
    "#dc3545",
    "#17a2b8",
  ]);

  onMount(async () => {
    const userData = await getUserData();
    if (userData && userData.themeColors) {
      setThemeColors(userData.themeColors);
      updateCSSVariables(userData.themeColors);
    }
  });

  const updateThemeColors = (colors: string[]) => {
    setThemeColors(colors);
    updateCSSVariables(colors);
    updateUserData({ themeColors: colors });
  };

  const updateCSSVariables = (colors: string[]) => {
    const root = document.documentElement;
    root.style.setProperty("--primary-color", colors[0]);
    root.style.setProperty("--secondary-color", colors[1]);
    root.style.setProperty("--tertiary-color", colors[2]);
    root.style.setProperty("--quaternary-color", colors[3]);
    root.style.setProperty("--quinary-color", colors[4]);
  };

  return (
    <ThemeContext.Provider
      value={{ themeColors: themeColors(), setThemeColors: updateThemeColors }}
    >
      {props.children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextProps => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
