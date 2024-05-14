export enum UserStatusTypes {
  ERROR = 'ERROR',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
}

export type User = { userName?: string; email?: string; phone?: string };

export type LoginData = { username: string; password: string };

export interface UsersState {
  user: ICustomer | null;
  status: UserStatusTypes | null;
  message: string | null;
  isAuth: boolean;
}

export type IDraftAddress = {
  country: keyof typeof COUNTRIES_DATA;
  postalCode: string;
  city: string;
  streetName: string;
  key?: string;
};

export type IAddress = {
  id: string;
  country: keyof typeof COUNTRIES_DATA;
  postalCode: string;
  city: string;
  streetName: string;
};

export type ICustomerDraft = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  addresses: IDraftAddress[];
  defaultShippingAddress?: number;
  defaultBillingAddress?: number;
  shippingAddresses: number[];
  billingAddresses: number[];
};

export type ICustomer = {
  id: string;
  version: number;
  email: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  addresses: IAddress[];
  shippingAddressIds: string[];
  billingAddressIds: string[];
  defaultShippingAddressId?: string;
  defaultBillingAddressId?: string;
};

export const COUNTRIES_DATA = {
  US: {
    name: 'United States',
    postalCodePattern: /^[0-9]{5}(?:-[0-9]{4})?$/,
    example: '12345 or 12345-1234',
  },
  DE: { name: 'Germany', postalCodePattern: /^[0-9]{5}$/, example: '12345' },
  ES: {
    name: 'Spain',
    postalCodePattern: /^(?:(?:[0-4]{1}[0-9]{1})|(?:5[0-2]{1}))[0-9]{3}$/,
    example: '12345 (but < 53000)',
  },
  AU: { name: 'Australia', postalCodePattern: /^[0-9]{4}$/, example: '1234' },
};
