export type ICustomer = {
  email: string;
  password: string;
};

export type INewCustomer = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  addresses: IDraftAddress[];
  defaultShippingAddress?: number;
  defaultBillingAddress?: number;
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
  isLogged: boolean;
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
  postalCodeError2: string;
  dobError: string;
  showSuccessModal: boolean;
  modalTitle: string;
  modalMessage: string;
  successfulRegistration: boolean;
  asDefaultShipping: boolean;
  asDefaultBilling: boolean;
  sameAddresses: boolean;

  street2: string;
  city2: string;
  postalCode2: string;
  country2: string;
}

export interface ICatlogCards {
  count: number;
  limit: number;
  offset: number;
  results: IResult[];
  total: number;
}

export interface IResult {
  createdAt: string;
  createdBy: ICreatedBy;
  id: string;
  lastMessageSequenceNumber: number;
  lastModifiedAt: string;
  lastModifiedBy: IUser;
  lastVariantId: number;
  masterData: IMasterData;
  priceMode: string;
  productType: IProductType;
  version: number;
  versionModifiedAt: string;
}

interface ICreatedBy {
  isPlatformClient: boolean;
  user: IUser;
}

interface IUser {
  id: string;
  typeId: string;
}

interface IProductType {
  id: string;
  typeId: string;
}

interface IMasterData {
  current: ICurrent;
  hasStagedChanges: boolean;
  published: boolean;
}

interface ICurrent {
  name: IText;
  categories: [];
  description: IText;
  masterVariant: IVariants;
  metaDescription: IText;
  metaTitle: IText;
  slug: IText;
  variants: IVariants[];
}

interface IText {
  'en-GB': string;
  ru: string;
  pl: string;
}

interface IVariants {
  prices: IPrices[];
  images: IImages[];
}
interface IPrices {
  discount: IValue;
  value: IValue;
}
interface IValue {
  centAmount: number;
  currencyCode: string;
}

interface IImages {
  dimensions: { w: number; h: number };
  url: string;
}
