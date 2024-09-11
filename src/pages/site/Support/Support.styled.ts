import { styled } from "solid-styled-components";

export const SupportContainer = styled("div")`
  padding: 20px;
  text-align: center;
`;

export const ContactForm = styled("form")`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const FormField = styled("div")`
  margin-bottom: 15px;
  width: 100%;
  max-width: 400px;

  label {
    display: block;
    margin-bottom: 5px;
  }

  input,
  textarea {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
  }
`;

export const SubmitButton = styled("button")`
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #0056b3;
  }
`;
