export const validateEmail = (value: string, dispatch: any) => {
  function changeState(type: string, value: string | boolean) {
    dispatch({ type: type, payload: value });
  }
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (value.trim() !== value) {
    changeState(
      'setEmailError',
      'Электронная почта не должна содержать пробелов в начале или в конце.'
    );
    return;
  }
  if (!value.includes('@')) {
    changeState('setEmailError', 'Адрес электронной почты должен содержать символ «@».');
    return;
  }
  if (value.split('@').length !== 2) {
    changeState('setEmailError', 'Адрес электронной почты должен содержать ровно один символ «@».');
    return;
  }
  if (!emailPattern.test(value)) {
    changeState(
      'setEmailError',
      'Адрес электронной почты должен быть правильно отформатирован (например, user@example.com).'
    );
    return;
  }
  changeState('setEmailError', '');
};

export const validatePassword = (value: string, dispatch?: any) => {
  function changeState(type: string, value: string | boolean) {
    if (dispatch) {
      dispatch({ type: type, payload: value });
    }
  }
  const trimmedValue = value.trim();
  const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d!@#$%^&*]{8,}$/;
  if (trimmedValue.length < 8) {
    changeState('setPasswordError', 'Пароль должен быть длиной не менее 8 символов');
    return 'Пароль должен быть длиной не менее 8 символов';
  } else if (!passwordPattern.test(trimmedValue)) {
    changeState(
      'setPasswordError',
      'Пароль должен содержать хотя бы одну заглавную букву (A–Z), одну строчную букву (a–z), одну цифру (0–9) и может содержать специальные символы (!@#$%^&*).'
    );
    return 'Пароль должен содержать хотя бы одну заглавную букву (A–Z), одну строчную букву (a–z), одну цифру (0–9) и может содержать специальные символы (!@#$%^&*).';
  } else if (value !== trimmedValue) {
    changeState('setPasswordError', 'Пароль не должен содержать пробелов в начале или в конце.');
    return 'Пароль не должен содержать пробелов в начале или в конце.';
  } else {
    changeState('setPasswordError', '');
    return '';
  }
};

export const validateField = (value: string) => {
  const stringPattern = /^[A-Za-z]|[А-Яа-я]+$/;
  if (!value.trim()) {
    return 'Это поле обязательно к заполнению';
  }
  if (value.length < 1) {
    return 'Должен содержать хотя бы один символ';
  }
  if (!stringPattern.test(value)) {
    return 'Должен содержать только буквы латинского алфавита или кириллицу';
  }
  return '';
};

export const validateStreet = (value: string) => {
  if (value.length < 1) {
    return 'Должен содержать хотя бы один символ';
  }
  return '';
};

export const validatePostalCode = (value: string, country: string) => {
  const postalCodePatern =
    country === 'UK' ? /^([A-Z]{1,2}\d[A-Z\d]? ?\d[A-Z]{2}|GIR ?0AA)$/ : /^\d{6}$/;
  if (!postalCodePatern.test(value)) {
    return 'Неверный формат почтового индекса.';
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
    return `Возраст не менее ${minAge} лет.`;
  }
  return '';
};
