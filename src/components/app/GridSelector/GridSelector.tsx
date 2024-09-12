import { Component, For, createSignal } from "solid-js";
import {
  GridContainer,
  GridItem,
  ItemContent,
  ItemEmoji,
  ItemText,
  CheckMark,
} from "./GridSelector.styled";

export interface GridItem {
  id: string;
  emoji: string;
  text: string;
}

interface GridSelectorProps {
  items: GridItem[];
  columns: number;
  multiSelect: boolean;
  maxSelections?: number; // 最大選択数を指定するオプションのプロパティを追加
  selectedItems: string[];
  onItemSelect: (itemId: string) => void;
}

const GridSelector: Component<GridSelectorProps> = (props) => {
  const [selectedItems, setSelectedItems] = createSignal(props.selectedItems);

  const handleItemClick = (itemId: string) => {
    console.log("Item clicked:", itemId); // デバッグ用
    setSelectedItems((prev) => {
      if (props.multiSelect) {
        if (prev.includes(itemId)) {
          // 選択解除の場合は常に許可
          const newSelection = prev.filter((id) => id !== itemId);
          props.onItemSelect(itemId);
          return newSelection;
        } else {
          // 選択追加の場合、最大選択数をチェック
          if (props.maxSelections && prev.length >= props.maxSelections) {
            console.log("Maximum selections reached");
            return prev; // 最大選択数に達している場合は選択を変更しない
          }
          const newSelection = [...prev, itemId];
          props.onItemSelect(itemId);
          return newSelection;
        }
      } else {
        props.onItemSelect(itemId);
        return [itemId];
      }
    });
  };

  return (
    <GridContainer columns={props.columns}>
      <For each={props.items}>
        {(item) => {
          const isSelected = () => selectedItems().includes(item.id);
          console.log("Item:", item.id, "Selected:", isSelected()); // デバッグ用
          return (
            <GridItem
              onClick={() => handleItemClick(item.id)}
              selected={isSelected()}
            >
              <ItemContent>
                <ItemEmoji>{item.emoji}</ItemEmoji>
                <ItemText>{item.text}</ItemText>
              </ItemContent>
              {isSelected() && <CheckMark>✓</CheckMark>}
            </GridItem>
          );
        }}
      </For>
    </GridContainer>
  );
};

export default GridSelector;
