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
    validateEmail(value);
  };
  const handleChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    changeState('setPassword', value);
    validatePassword(value);
  };

  const validateEmail = (value: string) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!value.includes('@')) {
      changeState(
        'setEmailError',
        'Email address must contain an "@" symbol separating local part and domain name'
      );
      return;
    }
    if (value.split('@').length !== 2) {
      changeState(
        'setEmailError',
        'Email address must contain exactly one "@" symbol separating local part and domain name'
      );
      return;
    }
    if (!emailPattern.test(value)) {
      changeState(
        'setEmailError',
        'Email address must be properly formatted (e.g., user@example.com)'
      );
      return;
    }
    changeState('setEmailError', '');
  };
  const validatePassword = (value: string) => {
    const trimmedValue = value.trim();

    const passwordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d!@#$%^&*]{8,}$/;
    if (trimmedValue.length < 8) {
      changeState(
        'setPasswordError',
        'Password must be at least 8 characters long'
      );
    } else if (!passwordPattern.test(trimmedValue)) {
      changeState(
        'setPasswordError',
        'Password must contain at least one uppercase letter (A-Z), one lowercase letter (a-z), one digit (0-9), and may contain special characters (!@#$%^&*)'
      );
    } else if (value !== trimmedValue) {
      changeState(
        'setPasswordError',
        'Password must not contain leading or trailing whitespace'
      );
    } else {
      changeState('setPasswordError', '');
    }
  };
  const handleTogglePasswordVisibility = () => {
    changeState('setShowPassword', !showPassword);
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
            onChange={handleTogglePasswordVisibility}
          />
          show
        </Label>
        <ErrorMsg>{passwordError}</ErrorMsg>
        <Button type="submit" text="Login" />
      </FormField>
    </div>
  );
};
