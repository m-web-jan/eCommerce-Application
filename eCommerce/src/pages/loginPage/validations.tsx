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
