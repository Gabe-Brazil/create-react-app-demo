import styled from 'styled-components';

export const ProfileCardContainer = styled.div`
  position: absolute;
  top: 50px;
  right: 10px;
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
`;

export const ProfileCardHeader = styled.h3`
  font-size: 24px;
  margin-bottom: 10px;
`;

export const ProfileCardInfo = styled.p`
  font-size: 16px;
  margin-bottom: 5px;
`;

export const ProfileCardButton = styled.button`
  background-color: #3f51b5;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
`;