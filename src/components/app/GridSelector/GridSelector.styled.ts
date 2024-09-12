import { styled } from "solid-styled-components";

export const GridContainer = styled("div")<{ columns: number }>`
  display: grid;
  grid-template-columns: repeat(${(props) => props.columns}, 1fr);
  gap: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

export const GridItem = styled("div")<{ selected: boolean }>`
  position: relative;
  border: 2px solid ${(props) => (props.selected ? "#007bff" : "#ddd")};
  background-color: ${(props) => (props.selected ? "#e6f2ff" : "transparent")};

  border-radius: 8px;
  padding: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
`;

export const ItemContent = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

export const ItemEmoji = styled("span")`
  font-size: 2rem;
  margin-bottom: 0.5rem;
`;

export const ItemText = styled("span")`
  font-size: 1rem;
`;

export const CheckMark = styled.span`
  position: absolute;
  top: 5px;
  right: 5px;
  color: #007bff;
  font-size: 1.2em;
`;
