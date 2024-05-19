export const validateEmail = (value: string, dispatch: any) => {
  function changeState(type: string, value: string | boolean) {
    dispatch({ type: type, payload: value });
  }
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

export const validatePassword = (value: string, dispatch: any) => {
  function changeState(type: string, value: string | boolean) {
    dispatch({ type: type, payload: value });
  }
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

export const validateField = (value: string) => {
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

export const validatePostalCode = (value: string, dispatch: any) => {
  function changeState(type: string, value: string | boolean) {
    dispatch({ type: type, payload: value });
  }
  changeState('setPostalCode', value);
  const postalCodePattern = /^\d{5}$|^[A-Za-z]\d[A-Za-z] \d[A-Za-z]\d$/;
  if (!postalCodePattern.test(value)) {
    return 'Postal code format is invalid';
  }
  return '';
};

export const validateDob = (value: string, dispatch: any) => {
  function changeState(type: string, value: string | boolean) {
    dispatch({ type: type, payload: value });
  }
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