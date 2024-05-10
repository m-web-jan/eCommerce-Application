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
