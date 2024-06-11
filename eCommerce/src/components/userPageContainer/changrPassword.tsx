import styled from 'styled-components';
import { RoundedButton } from '../roundedButton';
import { FormEvent, useState } from 'react';
import { validatePassword } from '../../pages/registerPage/validations';
import { RootState } from '../../types';
import { useDispatch, useSelector } from 'react-redux';
import { updatePassword } from '../../api/updatePassword';
import { delCookie, getCookie } from '../../api/cookie';
import { login } from '../../api/login';
import { getEmailToken } from '../../api/emailToken';

const Modal = styled.div`
  z-index: 99;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3);
  .content {
    max-width: 350px;
    background-color: white;
    border-radius: 10px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    padding: 1rem 2rem;
    h2 {
      font-size: 2rem;
      margin-bottom: 1rem;
    }
    input {
      padding: 5px 15px;
      outline: none;
    }
    button {
      margin-top: 1rem;
    }
    span {
      margin-bottom: 1rem;
      color: red;
      font-size: 0.8rem;
    }
  }
  @media (max-width: 768px) {
    .content {
      h2 {
        font-size: 1.5rem;
      }
    }
  }
`;

export interface passwordRequestData {
  id : string;
  version : any;
  currentPassword : string;
  newPassword : string;
}

export const PasswordModal = ({ ...props }) => {
  const dispatch = useDispatch();
  const profileSelector = (state: RootState) => state.profile;
  const states = useSelector((state: RootState) => profileSelector(state));
  function changeState(type: string, value: string | boolean) {
    dispatch({ type: type, payload: value });
  }

  const [error1, setError1] = useState('');
  const [error2, setError2] = useState('');
  const [value1, setValue1] = useState('');
  const [value2, setValue2] = useState('');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!error1 && !error2) {
      const requetData: passwordRequestData = {
        id : props.id,
        version : states.version,
        currentPassword : value1,
        newPassword : value2,
      }
      changeState('setShowModalPassword', false);
      changeState('setShowModal', true);
      try {
        const response = await updatePassword(requetData);
        changeState('setModalMessage', 'Пароль был изменён.');
        const emailToken = getCookie('emailToken');
        if (emailToken) {
          delCookie('emailToken');
          await login({
            email: states.email,
            password: value2,
          });
          await getEmailToken(states.email, value2);
        }
        changeState('setVersion', response?.version);

      } catch(e: any) {
        changeState('setModalMessage', 'Указанный старый пароль не соответствует.');
      }
    }
  };

  return (
    <Modal>
      <form action='#' className="content" onSubmit={handleSubmit}>
        <h2>Сброс пароля</h2>
        <input value={value1} type="text" placeholder='Старый пароль' onChange={(e) => {
          setValue1(e.target.value);
          setError1(validatePassword(e.target.value));
        }} required={true} />
        <span>{error1}</span>
        <input value={value2} type="text" placeholder='Новый пароль' onChange={(e) => {
          setValue2(e.target.value);
          setError2(validatePassword(e.target.value));
        }} required={true} />
        <span>{error2}</span>
        <RoundedButton type='submit' text='Сброс'/>
      </form>
    </Modal>
  );
};
