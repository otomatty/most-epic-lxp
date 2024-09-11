import { styled } from "solid-styled-components";

export const EditProfileContainer = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

export const EditProfileForm = styled("form")`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 400px;
  gap: 1rem;
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

export const EditProfileInput = styled("input")`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

export const EditProfileFileInput = styled("input")`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

export const EditProfileButton = styled("button")`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

export const CurrentAvatar = styled("img")`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 1rem;
`;
