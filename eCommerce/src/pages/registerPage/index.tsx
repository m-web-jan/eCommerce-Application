import { ChangeEvent, FormEvent, useEffect } from 'react';
import { Input } from '../../components/input';
import { Button } from '../../components/button';
import { ErrorMsg, FormField, Label, StyledLink, TwoInRow } from './style';
import { Select } from '../../components/select';
import { registration } from '../../api/register';
import { SuccessModal } from '../../components/alertModal';
import { useNavigate } from 'react-router-dom';
import { login } from '../../api/login';
import { getEmailToken } from '../../api/emailToken';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../types';
import { validateDob, validateEmail, validateField, validatePassword, validatePostalCode } from './validations';
import { getCookie } from '../../api/cookie';

export const RegisterPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const emailToken = getCookie('emailToken');
    if (emailToken) {
      navigate('/');
    }
  }, [navigate]);

  const dispatch = useDispatch();
  const registerSelector = (state: RootState) => state.register;
  const states = useSelector((state: RootState) => registerSelector(state));
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

  const isFormValid = () => {
    return (
      states.emailError === '' &&
      states.passwordError === '' &&
      states.nameError === '' &&
      states.lastnameError === '' &&
      states.streetError === '' &&
      states.cityError === '' &&
      states.postalCodeError === '' &&
      states.dobError === ''
    );
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await registration({
        email: states.email,
        password: states.password,
        firstName: states.name,
        lastName: states.lastname,
        dateOfBirth: states.dateOfBirth,
        addresses: [
          {
            streetName: states.street,
            city: states.city,
            postalCode: states.postalCode,
            country: states.country,
          },
        ],
      });
      changeState('setModalTitle', 'Registration Successful!');
      changeState('setModalMessage', 'Customer successfully created');
      changeState('setShowSuccessModal', true);
      changeState('setRegistration', true);
      console.log(response.customer);
    } catch (e: any) {
      changeState('setModalTitle', 'Registration failed!');
      changeState('setModalMessage', e.response.data.message);
      changeState('setShowSuccessModal', true);
      changeState('setRegistration', false);
    }
  };

  const automaticLogin = async () => {
    await login({
      email: states.email,
      password: states.password,
    });
    await getEmailToken(states.email, states.password);
    navigate('/');
    changeState('setEmail', '');
    changeState('setPassword', '');
  };

  return (
    <div>
      {states.showSuccessModal && (
        <SuccessModal
          onClose={() => {
            changeState('setShowSuccessModal', false);
            if (states.successfulRegistration) automaticLogin();
          }}
          title={states.modalTitle}
          message={states.modalMessage}
          buttonText="Close"
        />
      )}
      <FormField action="#" onSubmit={handleSubmit}>
        <h1>Register</h1>
        <p>
          Already have an account?<StyledLink to={'/login'}>Login</StyledLink>
        </p>
        <Input
          type="email"
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
          show
        </Label>
        <ErrorMsg>{states.passwordError}</ErrorMsg>
        <TwoInRow>
          <ErrorMsg>
            <Input
              type="text"
              placeholder="name"
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                changeState('setName', event.target.value);
                changeState('setNameError', validateField(event.target.value));
              }}
              required={true}
            />
            {states.nameError}
          </ErrorMsg>
          <ErrorMsg>
            <Input
              type="text"
              placeholder="lastname"
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                changeState('setLastname', event.target.value);
                changeState('setLastnameError', validateField(event.target.value));
              }}
              required={true}
            />
            {states.lastnameError}
          </ErrorMsg>
        </TwoInRow>
        <TwoInRow>
          <p>Date of birth:</p>
          <ErrorMsg>
            <Input
              type="date"
              required={true}
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                changeState('setDobError', validateDob(event.target.value, dispatch));
              }}
            />
            {states.dobError}
          </ErrorMsg>
        </TwoInRow>
        <TwoInRow>
          <ErrorMsg>
            <Input
              type="text"
              placeholder="street"
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                changeState('setStreet', event.target.value);
                changeState('setStreetError', validateField(event.target.value));
              }}
              required={true}
            />
            {states.streetError}
          </ErrorMsg>
          <ErrorMsg>
            <Input
              type="text"
              placeholder="city"
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                changeState('setCity', event.target.value);
                changeState('setcityError', validateField(event.target.value));
              }}
              required={true}
            />
            {states.cityError}
          </ErrorMsg>
        </TwoInRow>
        <TwoInRow>
          <ErrorMsg>
            <Input
              type="text"
              placeholder="postal code"
              required={true}
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                changeState('setPostalCodeError', validatePostalCode(event.target.value, dispatch));
              }}
            />
            {states.postalCodeError}
          </ErrorMsg>
          <Select
            id="country"
            required={true}
            onChange={(event: ChangeEvent<HTMLSelectElement>) => {
              changeState('setCountry', event.target.value);
            }}
          >
            <option value="">Select a country...</option>
            {['BY', 'PL', 'RU', 'UK', 'US'].map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </Select>
        </TwoInRow>
        <Button type="submit" text="Create account" disabled={!isFormValid()} />
      </FormField>
    </div>
  );
};
