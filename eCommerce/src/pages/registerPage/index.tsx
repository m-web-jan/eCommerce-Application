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
import { INewCustomer, RootState } from '../../types';
import {
  validateDob,
  validateEmail,
  validateField,
  validatePassword,
  validatePostalCode,
} from './validations';
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
      const newCustomer: INewCustomer = {
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
          {
            streetName: states.street2,
            city: states.city2,
            postalCode: states.postalCode2,
            country: states.country2,
          },
        ],
      };
      if (states.asDefaultShipping) newCustomer.defaultShippingAddress = 0;
      if (states.asDefaultBilling) newCustomer.defaultBillingAddress = 1;
      const response = await registration(newCustomer);
      changeState('setModalTitle', 'Registration Successful!');
      changeState('setModalMessage', 'Customer successfully created');
      changeState('setShowSuccessModal', true);
      changeState('setRegistration', true);
      changeState('setDefaultShippingAddress', false);
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

  function changeBillingAddres() {
    if (states.sameAddresses) {
      console.log('not same');
    } else {
      changeState('setStreet2', states.street);
      changeState('setCity2', states.city);
      changeState('setPostalCode2', states.postalCode);
      changeState('setCountry2', states.country);
    }
  }

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
        <h2>Shipping address</h2>
        <TwoInRow>
          <ErrorMsg>
            <Input
              type="text"
              placeholder="street"
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                changeState('setStreet', event.target.value);
                changeState('setStreetError', validateField(event.target.value));
                if (states.sameAddresses) changeState('setStreet2', event.target.value);
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
                if (states.sameAddresses) changeState('setCity2', event.target.value);
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
                validatePostalCode(event.target.value, dispatch);
                changeState('setPostalCode', event.target.value);
                if (states.sameAddresses) changeState('setPostalCode2', event.target.value);
              }}
            />
            {states.postalCodeError}
          </ErrorMsg>
          <Select
            required={true}
            onChange={(event: ChangeEvent<HTMLSelectElement>) => {
              changeState('setCountry', event.target.value);
              if (states.sameAddresses) changeState('setCountry2', event.target.value);
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
        <Label>
          <Input
            type="checkbox"
            checked={states.asDefaultShipping}
            onChange={() => {
              changeState('setDefaultShippingAddress', !states.asDefaultShipping);
            }}
          />
          Default shipping address
        </Label>
        <Label>
          <Input
            type="checkbox"
            checked={states.sameAddresses}
            onChange={() => {
              changeState('setSameAddresses', !states.sameAddresses);
              changeBillingAddres();
            }}
          />
          Same address for billing and shipping
        </Label>
        <h2>Billing address</h2>
        <TwoInRow>
          <ErrorMsg>
            <Input
              disabled={states.sameAddresses}
              type="text"
              placeholder="street"
              value={states.street2}
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                changeState('setStreet2', event.target.value);
                changeState('setStreetError', validateField(event.target.value));
              }}
              required={true}
            />
            {states.streetError}
          </ErrorMsg>
          <ErrorMsg>
            <Input
              disabled={states.sameAddresses}
              type="text"
              placeholder="city"
              value={states.city2}
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                changeState('setCity2', event.target.value);
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
              disabled={states.sameAddresses}
              type="text"
              placeholder="postal code"
              value={states.postalCode2}
              required={true}
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                changeState('setPostalCode2', event.target.value);
                validatePostalCode(event.target.value, dispatch);
              }}
            />
            {states.postalCodeError}
          </ErrorMsg>
          <Select
            disabled={states.sameAddresses}
            value={states.country2}
            required={true}
            onChange={(event: ChangeEvent<HTMLSelectElement>) => {
              changeState('setCountry2', event.target.value);
            }}
          >
            <option>Select a country...</option>
            {['BY', 'PL', 'RU', 'UK', 'US'].map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </Select>
        </TwoInRow>
        <Label>
          <Input
            type="checkbox"
            checked={states.asDefaultBilling}
            onChange={() => {
              changeState('setDefaultBillingAddress', !states.asDefaultBilling);
            }}
          />
          Default billing address
        </Label>
        <Button type="submit" text="Create account" disabled={!isFormValid()} />
      </FormField>
    </div>
  );
};
