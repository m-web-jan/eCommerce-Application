import React from 'react';
import { Button } from '../button';

import styled from 'styled-components';

const StyleModal = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3);
  div {
    padding: 1rem 2rem;
    text-align: center;
    border-radius: 10px;
    margin: 0 auto;
    background-color: white;
    max-width: 20rem;
    position: relative;
    top: 50%;
    transform: translateY(-50%);
    p {
      margin: 1rem 0;
    }
  }
`;

interface SuccessModalProps {
  onClose: () => void;
  title: string;
  message: string;
  buttonText: string;
}

export const SuccessModal: React.FC<SuccessModalProps> = ({ onClose, title, message, buttonText }) => {
  return (
    <StyleModal>
      <div>
        <h2>{title}</h2>
        {/* <p>{message}</p> */}
        <p dangerouslySetInnerHTML={{ __html: message }} />
        <Button onClick={onClose} text={buttonText} />
      </div>
    </StyleModal>
  );
};
