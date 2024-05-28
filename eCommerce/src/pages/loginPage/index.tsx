import { ChangeEvent, FormEvent, useEffect } from 'react';
import { Input } from '../../components/input';
import { Button } from '../../components/button';
import { ErrorMsg, FormField, Label, StyledLink } from './style';
import { login } from '../../api/login';
import { useNavigate } from 'react-router-dom';
import { SuccessModal } from '../../components/alertModal';
import { getEmailToken } from '../../api/emailToken';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../types';
import { validateEmail, validatePassword } from '../registerPage/validations';

export const LoginPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (states.isLogged) {
      navigate('/');
    }
  }, [navigate]);

  const dispatch = useDispatch();
  const authSelector = (state: RootState) => state.auth;
  const states = useSelector((state: RootState) => authSelector(state));

  function changeState(type: string, value: string | boolean) {
    dispatch({ type: type, payload: value });
  }

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
        email: states.email,
        password: states.password,
      });
      await getEmailToken(states.email, states.password);
      navigate('/');
      changeState('setEmail', '');
      changeState('setPassword', '');
      changeState('setLogged', true);
    } catch (e: any) {
      changeState('setModalTitle', 'Login failed!');
      changeState('setModalMessage', e.response.data.message);
      changeState('setShowSuccessModal', true);
    }
  };

  return (
    <div>
      {states.showSuccessModal && (
        <SuccessModal
          onClose={() => changeState('setShowSuccessModal', false)}
          title={states.modalTitle}
          message={states.modalMessage}
          buttonText="Close"
        />
      )}
      <FormField action="#" onSubmit={handleSubmit}>
        <h1>Авторизация</h1>
        <p>
          У меня нет аккаунта.
          <StyledLink to={'/register'}>Зарегистрироваться</StyledLink>
        </p>
        <Input
          type="text"
          placeholder="email"
          value={states.email}
          onChange={handleChangeEmail}
          required={true}
        />
        <ErrorMsg>{states.emailError}</ErrorMsg>
        <Input
          type={states.showPassword ? 'text' : 'password'}
          placeholder="password"
          value={states.password}
          onChange={handleChangePassword}
          required={true}
        />
        <Label>
          <Input
            type="checkbox"
            checked={states.showPassword}
            onChange={() => {
              changeState('setShowPassword', !states.showPassword);
            }}
          />
          показать
        </Label>
        <ErrorMsg>{states.passwordError}</ErrorMsg>
        <Button type="submit" text="Login" />
      </FormField>
    </div>
  );
};
