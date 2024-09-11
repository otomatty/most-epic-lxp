import { Component, For } from "solid-js";
import { useTheme } from "../../../contexts/ThemeContext";

const ThemeSwitcher: Component = () => {
  const { themeColors, setThemeColors } = useTheme();

  const handleColorChange = (index: number, color: string) => {
    const newColors = [...themeColors];
    newColors[index] = color;
    setThemeColors(newColors);
  };

  return (
    <div>
      <For each={themeColors}>
        {(color, index) => (
          <div>
            <label for={`themeColor${index()}`}>
              テーマカラー {index() + 1}:
            </label>
            <input
              type="color"
              id={`themeColor${index()}`}
              value={color}
              onInput={(e) =>
                handleColorChange(index(), (e.target as HTMLInputElement).value)
              }
            />
          </div>
        )}
      </For>
    </div>
  );
};

export default ThemeSwitcher;
