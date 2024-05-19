export type ICustomer = {
  email: string;
  password: string;
}

export type INewCustomer = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  addresses: IDraftAddress[];
  // defaultShippingAddress?: number;
  // defaultBillingAddress?: number;
  // shippingAddresses: number[];
  // billingAddresses: number[];
};

export type IDraftAddress = {
  streetName: string;
  city: string;
  postalCode: string;
  country: string;
};


// store
export interface RootState {
  auth: IAuthState;
  register: IRegisterState;
}

interface IAuthState {
  email: string;
  password: string;
  emailError: string;
  passwordError: string;
  showPassword: boolean;
  showSuccessModal: boolean;
  modalTitle: string;
  modalMessage: string;
}

interface IRegisterState {
  email: string;
  password: string;
  name: string;
  lastname: string;
  dateOfBirth: string;
  street: string;
  city: string;
  postalCode: string;
  country: string;
  emailError: string;
  passwordError: string;
  showPassword: boolean;
  nameError: string;
  lastnameError: string;
  streetError: string;
  cityError: string;
  postalCodeError: string;
  dobError: string;
  showSuccessModal: boolean;
  modalTitle: string;
  modalMessage: string;
  successfulRegistration: boolean;
}