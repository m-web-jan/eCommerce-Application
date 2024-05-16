import { ChangeEvent, FormEvent } from 'react';
import { Input } from '../../components/input';
import { Button } from '../../components/button';
import { ErrorMsg, FormField, Label, StyledLink } from './style';
import { login } from '../../api/login';
import { useNavigate } from 'react-router-dom';
import { SuccessModal } from '../../components/alertModal';
import { getEmailToken } from '../../api/emailToken';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../types';
import { validateEmail, validatePassword } from './validations';

export const LoginPage = () => {
  const dispatch = useDispatch();
  const authSelector = (state: RootState) => state.auth;

  const {
    email,
    password,
    emailError,
    passwordError,
    showPassword,
    showSuccessModal,
    modalTitle,
    modalMessage,
  } = useSelector((state: RootState) => authSelector(state));

  function changeState(type: string, value: string | boolean) {
    dispatch({ type: type, payload: value });
  }

  const navigate = useNavigate();

  const handleChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    changeState('setEmail', value);
    validateEmail(value, dispatch);
  };
  const handleChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    changeState('setPassword', value);
    validatePassword(value, dispatch);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await login({
        email: email,
        password: password,
      });
      await getEmailToken(email, password);
      navigate('/');
    } catch (e: any) {
      changeState('setModalTitle', 'Login failed!');
      changeState('setModalMessage', e.response.data.message);
      changeState('setShowSuccessModal', true);
    }
  };

  return (
    <div>
      {showSuccessModal && (
        <SuccessModal
          onClose={() => changeState('setShowSuccessModal', false)}
          title={modalTitle}
          message={modalMessage}
          buttonText="Close"
        />
      )}
      <FormField action="#" onSubmit={handleSubmit}>
        <h1>login</h1>
        <p>
          I don't have an account.
          <StyledLink to={'/register'}>Register</StyledLink>
        </p>
        <Input
          type="email"
          placeholder="email"
          value={email}
          onChange={handleChangeEmail}
        />
        <ErrorMsg>{emailError}</ErrorMsg>
        <Input
          type={showPassword ? 'text' : 'password'}
          placeholder="password"
          value={password}
          onChange={handleChangePassword}
        />
        <Label>
          <Input
            type="checkbox"
            checked={showPassword}
            onChange={() => {changeState('setShowPassword', !showPassword)}}
          />
          show
        </Label>
        <ErrorMsg>{passwordError}</ErrorMsg>
        <Button type="submit" text="Login" />
      </FormField>
    </div>
  );
};
