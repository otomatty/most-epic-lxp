import { styled } from "solid-styled-components";

export const JobSelectionContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

export const JobCard = styled.div`
  background-color: #f0f0f0;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const JobTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 10px;
`;

export const JobDescription = styled.p`
  font-size: 16px;
  margin-bottom: 20px;
`;

export const SelectButton = styled.button`
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

export const JobRole = styled.p`
  font-size: 14px;
  font-style: italic;
  margin-bottom: 10px;
  color: #666;
`;
