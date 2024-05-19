const initialState = {
  email: '',
  password: '',
  emailError: '',
  passwordError: '',
  showPassword: false,
  showSuccessModal: false,
};

const authReducer = (
  state = initialState,
  action: { type: string; payload: string }
) => {
  switch (action.type) {
    case 'setEmail':
      return { ...state, email: action.payload };
    case 'setPassword':
      return { ...state, password: action.payload };
    case 'setEmailError':
      return { ...state, emailError: action.payload };
    case 'setPasswordError':
      return { ...state, passwordError: action.payload };
    case 'setShowPassword':
      return { ...state, showPassword: action.payload };
    case 'setShowSuccessModal':
      return { ...state, showSuccessModal: action.payload };
    case 'setModalTitle':
      return { ...state, modalTitle: action.payload };
    case 'setModalMessage':
      return { ...state, modalMessage: action.payload };
    default:
      return state;
  }
};

export default authReducer;
