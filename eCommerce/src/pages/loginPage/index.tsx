import { useState, ChangeEvent } from 'react';
import { Input } from '../../components/input';
import { Button } from '../../components/button';
import { ErrorMsg, FormField, Label, StyledLink } from './style';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

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

    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d!@#$%^&*]{8,}$/;
    if (trimmedValue.length < 8) {
      setPasswordError('Password must be at least 8 characters long');
    } else if (!passwordPattern.test(trimmedValue)) {
      setPasswordError('Password must contain at least one uppercase letter (A-Z), one lowercase letter (a-z), one digit (0-9), and may contain special characters (!@#$%^&*)');
    } else if (value !== trimmedValue) {
      setPasswordError('Password must not contain leading or trailing whitespace');
    } else {
      setPasswordError('');
    }
  };
  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = () => {
    // Логика для отправки формы
  };
  return (
    <div>
      <FormField action="#" onSubmit={handleSubmit}>
        <h1>login</h1>
        <p>
        I don't have an account.<StyledLink to={'/register'}>Register</StyledLink>
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
