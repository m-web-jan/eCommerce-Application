const initialState = {
  version: '',
  firstName: '',
  lastName: '',
  email: '',
  dateOfBirth: '',

  city1: '',
  city2: '',
  street1: '',
  street2: '',
  postalCode1: '',
  postalCode2: '',
  country1: '',
  country2: '',
  default1: false,
  default2: false,
};

const profileReducer = (
  state = initialState,
  action: { type: string; payload: string }
) => {
  switch (action.type) {
    case 'setVersion':
      return { ...state, version: action.payload };
    case 'setProfileName':
      return { ...state, firstName: action.payload };
    case 'setProfileLastname':
      return { ...state, lastName: action.payload };
    case 'setProfileEmail':
      return { ...state, email: action.payload };
    case 'setProfileDOB':
      return { ...state, dateOfBirth: action.payload };
    case 'setCity1':
      return { ...state, city1: action.payload };
    case 'setCity2':
      return { ...state, city2: action.payload };
    case 'setStreet1':
      return { ...state, street1: action.payload };
    case 'setStreet2':
      return { ...state, street2: action.payload };
    case 'setCode1':
      return { ...state, postalCode1: action.payload };
    case 'setCode2':
      return { ...state, postalCode2: action.payload };
    case 'setCountry1':
      return { ...state, country1: action.payload };
    case 'setCountry2':
      return { ...state, country2: action.payload };
    case 'setDefault1':
      return { ...state, default1: action.payload };
    case 'setDefault2':
      return { ...state, default2: action.payload };
    default:
      return state;
  }
};

export default profileReducer;
