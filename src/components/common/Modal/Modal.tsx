import { Component, Show } from "solid-js";
import { ModalContainer, ModalContent, CloseButton } from "./Modal.styled";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: any;
}

const Modal: Component<ModalProps> = ({ isOpen, onClose, children }) => {
  return (
    <Show when={isOpen}>
      <ModalContainer>
        <ModalContent>
          <CloseButton onClick={onClose}>×</CloseButton>
          {children}
        </ModalContent>
      </ModalContainer>
    </Show>
  );
};

export default Modal;
