import { useState, ChangeEvent, FormEvent } from 'react';
import { Input } from '../../components/input';
import { Button } from '../../components/button';
import { ErrorMsg, FormField, Label, StyledLink, TwoInRow } from './style';
import { Select } from '../../components/select';
import { registration } from '../../api/register';
import { SuccessModal } from '../../components/alertModal';
import { useNavigate } from 'react-router-dom';
import { login } from '../../api/login';

export const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [nameError, setNameError] = useState('');
  const [lastnameError, setLastnameError] = useState('');
  const [streetError, setStreetError] = useState('');
  const [cityError, setcityError] = useState('');
  const [postalCodeError, setPostalCodeError] = useState('');
  const [dobError, setDobError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const navigate = useNavigate();

  const countries = ['BY', 'PL', 'RU', 'UK', 'US'];

  const handleChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setEmail(value);
    validateEmail(value);
  };

  const handleChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setPassword(value);
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
      setEmailError(
        'Email address must contain an "@" symbol separating local part and domain name'
      );
      return;
    }
    if (value.split('@').length !== 2) {
      setEmailError(
        'Email address must contain exactly one "@" symbol separating local part and domain name'
      );
      return;
    }
    if (!emailPattern.test(value)) {
      setEmailError(
        'Email address must be properly formatted (e.g., user@example.com)'
      );
      return;
    }
    setEmailError('');
  };
  const validatePassword = (value: string) => {
    const trimmedValue = value.trim();

    const passwordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d!@#$%^&*]{8,}$/;
    if (trimmedValue.length < 8) {
      setPasswordError('Password must be at least 8 characters long');
    } else if (!passwordPattern.test(trimmedValue)) {
      setPasswordError(
        'Password must contain at least one uppercase letter (A-Z), one lowercase letter (a-z), one digit (0-9), and may contain special characters (!@#$%^&*)'
      );
    } else if (value !== trimmedValue) {
      setPasswordError(
        'Password must not contain leading or trailing whitespace'
      );
    } else {
      setPasswordError('');
    }
  };

  const validatePostalCode = (value: string) => {
    setPostalCode(value);
    const postalCodePattern = /^\d{5}$|^[A-Za-z]\d[A-Za-z] \d[A-Za-z]\d$/;
    if (!postalCodePattern.test(value)) {
      return 'Postal code format is invalid';
    }
    return '';
  };

  const validateDob = (value: string) => {
    setDateOfBirth(value);
    const dob = new Date(value);
    const currentDate = new Date();
    const minAge = 13;

    let age = currentDate.getFullYear() - dob.getFullYear();
    const monthDiff = currentDate.getMonth() - dob.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && currentDate.getDate() < dob.getDate())
    ) {
      age--;
    }

    if (age < minAge) {
      return `At least ${minAge} years old`;
    }
    return '';
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const isFormValid = () => {
    return (
      emailError === '' &&
      passwordError === '' &&
      nameError === '' &&
      lastnameError === '' &&
      streetError === '' &&
      cityError === '' &&
      postalCodeError === '' &&
      dobError === ''
    );
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await registration({
        email: email,
        password: password,
        firstName: name,
        lastName: lastname,
        dateOfBirth: dateOfBirth,
        addresses: [
          {
            streetName: street,
            city: city,
            postalCode: postalCode,
            country: country,
          },
        ],
      });
      setModalTitle('Registration Successful!');
      setModalMessage('Customer successfully created');
      setShowSuccessModal(true);
      console.log(response.customer);
    } catch (e: any) {
      setModalTitle('Registration failed!');
      setModalMessage(e.response.data.message);
      setShowSuccessModal(true);
    }
  };

  const automaticLogin = async () => {
    await login({
      email: email,
      password: password,
    });
    navigate('/');
  }

  return (
    <div>
      {showSuccessModal && (
        <SuccessModal
          onClose={() => {
            setShowSuccessModal(false);
            automaticLogin();
          }}
          title={modalTitle}
          message={modalMessage}
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
          value={email}
          onChange={handleChangeEmail}
          required={true}
        />
        <ErrorMsg>{emailError}</ErrorMsg>
        <Input
          type={showPassword ? 'text' : 'password'}
          placeholder="password"
          value={password}
          onChange={handleChangePassword}
          required={true}
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
        <TwoInRow>
          <ErrorMsg>
            <Input
              type="text"
              placeholder="name"
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                setName(event.target.value);
                setNameError(handleChangeStringField(event));
              }}
              required={true}
            />
            {nameError}
          </ErrorMsg>
          <ErrorMsg>
            <Input
              type="text"
              placeholder="lastname"
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                setLastname(event.target.value);
                setLastnameError(handleChangeStringField(event));
              }}
              required={true}
            />
            {lastnameError}
          </ErrorMsg>
        </TwoInRow>
        <TwoInRow>
          <p>Date of birth:</p>
          <ErrorMsg>
            <Input
              type="date"
              required={true}
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                setDobError(validateDob(event.target.value));
              }}
            />
            {dobError}
          </ErrorMsg>
        </TwoInRow>
        <TwoInRow>
          <ErrorMsg>
            <Input
              type="text"
              placeholder="street"
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                setStreet(event.target.value);
                setStreetError(handleChangeStringField(event));
              }}
              required={true}
            />
            {streetError}
          </ErrorMsg>
          <ErrorMsg>
            <Input
              type="text"
              placeholder="city"
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                setCity(event.target.value);
                setcityError(handleChangeStringField(event));
              }}
              required={true}
            />
            {cityError}
          </ErrorMsg>
        </TwoInRow>
        <TwoInRow>
          <ErrorMsg>
            <Input
              type="text"
              placeholder="postal code"
              required={true}
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                setPostalCodeError(validatePostalCode(event.target.value));
              }}
            />
            {postalCodeError}
          </ErrorMsg>
          <Select
            id="country"
            required={true}
            onChange={(event: ChangeEvent<HTMLSelectElement>) => {
              setCountry(event.target.value);
            }}
          >
            <option value="">Select a country...</option>
            {countries.map((country) => (
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
