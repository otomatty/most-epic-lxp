import { Component, createSignal, onCleanup } from "solid-js";
import { Portal } from "solid-js/web";
import {
  PopupContainer,
  PopupContent,
  XpAmount,
  CloseButton,
} from "./XpGainPopup.styled";

interface XpGainPopupProps {
  xpGained: number;
  onClose: () => void;
}

const XpGainPopup: Component<XpGainPopupProps> = (props) => {
  const [isVisible, setIsVisible] = createSignal(true);

  const closePopup = () => {
    setIsVisible(false);
    props.onClose();
  };

  // 5秒後に自動的にポップアップを閉じる
  const timer = setTimeout(closePopup, 5000);

  onCleanup(() => clearTimeout(timer));

  return (
    <Portal>
      {isVisible() && (
        <PopupContainer>
          <PopupContent>
            <XpAmount>+{props.xpGained} XP</XpAmount>
            <p>経験値を獲得しました！</p>
            <CloseButton onClick={closePopup}>閉じる</CloseButton>
          </PopupContent>
        </PopupContainer>
      )}
    </Portal>
  );
};

export default XpGainPopup;
