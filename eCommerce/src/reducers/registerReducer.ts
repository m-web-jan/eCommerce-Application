const initialState = {
  email: '',
  password: '',
  name: '',
  lastname: '',
  dateOfBirth: '',
  street: '',
  city: '',
  postalCode: '',
  country: '',
  emailError: '',
  passwordError: '',
  nameError: '',
  lastnameError: '',
  streetError: '',
  cityError: '',
  postalCodeError: '',
  dobError: '',
  showPassword: false,
  successfulRegistration: false,
  showSuccessModal: false,
  modalTitle: '',
  modalMessage: '',
  asDefaultShipping: false,
  asDefaultBilling: false,
  sameAddresses: true,

  street2: '',
  city2: '',
  postalCode2: '',
  country2: '',
};

const registerReducer = (state = initialState, action: { type: string; payload: string }) => {
  switch (action.type) {
    case 'setEmail':
      return { ...state, email: action.payload };
    case 'setPassword':
      return { ...state, password: action.payload };
    case 'setName':
      return { ...state, name: action.payload };
    case 'setLastname':
      return { ...state, lastname: action.payload };
    case 'setDateOfBirth':
      return { ...state, dateOfBirth: action.payload };
    case 'setStreet':
      return { ...state, street: action.payload };
    case 'setCity':
      return { ...state, city: action.payload };
    case 'setPostalCode':
      return { ...state, postalCode: action.payload };
    case 'setCountry':
      return { ...state, country: action.payload };
    case 'setEmailError':
      return { ...state, emailError: action.payload };
    case 'setPasswordError':
      return { ...state, passwordError: action.payload };
    case 'setShowPassword':
      return { ...state, showPassword: action.payload };
    case 'setNameError':
      return { ...state, nameError: action.payload };
    case 'setLastnameError':
      return { ...state, lastnameError: action.payload };
    case 'setStreetError':
      return { ...state, streetError: action.payload };
    case 'setcityError':
      return { ...state, cityError: action.payload };
    case 'setPostalCodeError':
      return { ...state, postalCodeError: action.payload };
    case 'setDobError':
      return { ...state, dobError: action.payload };
    case 'setShowSuccessModal':
      return { ...state, showSuccessModal: action.payload };
    case 'setModalTitle':
      return { ...state, modalTitle: action.payload };
    case 'setModalMessage':
      return { ...state, modalMessage: action.payload };
    case 'setRegistration':
      return { ...state, successfulRegistration: action.payload };
    case 'setDefaultShippingAddress':
      return { ...state, asDefaultShipping: action.payload };
    case 'setSameAddresses':
      return { ...state, sameAddresses: action.payload };
    case 'setDefaultBillingAddress':
      return { ...state, asDefaultBilling: action.payload };

    case 'setStreet2':
      return { ...state, street2: action.payload };
    case 'setCity2':
      return { ...state, city2: action.payload };
    case 'setPostalCode2':
      return { ...state, postalCode2: action.payload };
    case 'setCountry2':
      return { ...state, country2: action.payload };
    default:
      return state;
  }
};

export default registerReducer;
