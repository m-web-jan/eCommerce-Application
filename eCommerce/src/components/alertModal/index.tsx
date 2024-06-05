import { Button } from '../button';
import styled from 'styled-components';

const StyleModal = styled.div`
  z-index: 99;
  position: fixed;
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

export const SuccessModal = ({ ...props }) => {
  return (
    <StyleModal>
      <div>
        <h2>{props.title}</h2>
        <p>{props.message}</p>
        <Button onClick={props.onClose} text={props.buttonText} />
      </div>
    </StyleModal>
  );
};
