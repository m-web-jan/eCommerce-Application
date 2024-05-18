import { ChangeEvent, FormEvent } from 'react'; // 339
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

export const RegisterPage = () => {
  const dispatch = useDispatch();
  const authSelector = (state: RootState) => state.register;
  const states = useSelector((state: RootState) => authSelector(state));

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

  const handleChangeStringField = (event: ChangeEvent<HTMLInputElement>) => {
    const error = validateField(event.target.value);
    return error;
  };

  const validateField = (value: string) => {
    const stringPattern = /^[A-Za-z]+$/;
    if (!value.trim()) {
      return 'This field is required';
    }
    if (value.length < 1) {
      return 'Must contain at least one character';
    }
    if (!stringPattern.test(value)) {
      return 'Must contain only letters';
    }
    return '';
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

    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d!@#$%^&*]{8,}$/;
    if (trimmedValue.length < 8) {
      changeState('setPasswordError', 'Password must be at least 8 characters long');
    } else if (!passwordPattern.test(trimmedValue)) {
      changeState(
        'setPasswordError',
        'Password must contain at least one uppercase letter (A-Z), one lowercase letter (a-z), one digit (0-9), and may contain special characters (!@#$%^&*)'
      );
    } else if (value !== trimmedValue) {
      changeState('setPasswordError', 'Password must not contain leading or trailing whitespace');
    } else {
      changeState('setPasswordError', '');
    }
  };

  const validatePostalCode = (value: string) => {
    changeState('setPostalCode', value);
    const postalCodePattern = /^\d{5}$|^[A-Za-z]\d[A-Za-z] \d[A-Za-z]\d$/;
    if (!postalCodePattern.test(value)) {
      return 'Postal code format is invalid';
    }
    return '';
  };

  const validateDob = (value: string) => {
    changeState('setDateOfBirth', value);
    const dob = new Date(value);
    const currentDate = new Date();
    const minAge = 13;

    let age = currentDate.getFullYear() - dob.getFullYear();
    const monthDiff = currentDate.getMonth() - dob.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && currentDate.getDate() < dob.getDate())) {
      age--;
    }

    if (age < minAge) {
      return `At least ${minAge} years old`;
    }
    return '';
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
      console.log(response.customer);
    } catch (e: any) {
      changeState('setModalTitle', 'Registration failed!');
      changeState('setModalMessage', e.response.data.message);
      changeState('setShowSuccessModal', true);
    }
  };

  const automaticLogin = async () => {
    await login({
      email: states.email,
      password: states.password,
    });
    await getEmailToken(states.email, states.password);
    navigate('/');
  };

  return (
    <div>
      {states.showSuccessModal && (
        <SuccessModal
          onClose={() => {
            changeState('setShowSuccessModal', false);
            automaticLogin();
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
                changeState('setNameError', handleChangeStringField(event));
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
                changeState('setLastnameError', handleChangeStringField(event));
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
                changeState('setDobError', validateDob(event.target.value));
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
                changeState('setStreetError', handleChangeStringField(event));
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
                changeState('setcityError', handleChangeStringField(event));
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
                changeState('setPostalCodeError', validatePostalCode(event.target.value));
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
