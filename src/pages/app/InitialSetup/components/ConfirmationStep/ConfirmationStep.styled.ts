import { styled } from "solid-styled-components";

export const ConfirmationStepContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

export const FadeInContainer = styled.div`
  animation: fadeIn 0.5s ease-in-out;
  width: 100%;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

export const ConfirmationItem = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 10px;
`;

export const ConfirmationLabel = styled.span`
  font-weight: bold;
`;

export const ConfirmationValue = styled.span`
  text-align: right;
`;

export const ConfirmButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
  margin-top: 20px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;
