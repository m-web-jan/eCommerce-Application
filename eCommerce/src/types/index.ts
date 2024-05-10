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

export type IDraftAddress = {
  country: keyof typeof COUNTRIES_DATA;
  postalCode: string;
  city: string;
  streetName: string;
  key?: string;
};
