import { updateCustomerData } from '../../api/updateCustomerById';
import { updateEmail } from '../../api/updateEmail';

export async function updatePersonalData(
  mail: string,
  name: string,
  lastname: string,
  dateOfBirth: string,
  id: string,
  version: string,
  dispatch: any
) {
  function changeState(type: string, value: string | boolean) {
    dispatch({ type: type, payload: value });
  }

  const requestData: IRequestData = {
    version: version,
    actions: [
      {
        action: 'setFirstName',
        firstName: name,
      },
      {
        action: 'setLastName',
        lastName: lastname,
      },
      {
        action: 'setDateOfBirth',
        dateOfBirth: dateOfBirth,
      },
    ],
  };

  const response = await updateCustomerData(id, requestData);

  const requestEmailData = {
    version: response?.version,
    actions: [
      {
        action: 'changeEmail',
        email: mail,
      },
    ],
  };

  const emailResponse = await updateEmail(id, requestEmailData);

  changeState('setVersion', emailResponse?.version);
  if (response?.version > 0 && emailResponse?.version > 0) {
    changeState('setModalMessage', 'Данные успешно обновлены');
    changeState('setShowModal', true);
  } else {
    changeState('setModalMessage', emailResponse?.message);
    changeState('setShowModal', true);
  }
}

export interface IRequestData {
  version: string;
  actions: {
    action: string;
    [key: string]: string;
  }[];
}


export async function updateAddress1(
  default1: boolean,
  city: string,
  code: string,
  country: string,
  street: string,
  id: string,
  version: string,
  dispatch: any,
  type: string,
) {
  function changeState(type: string, value: string | boolean) {
    dispatch({ type: type, payload: value });
  }

  const requestData: IRequestAddressData = {
    version: version,
    actions: [
      {
        action : "addAddress",
        address : {
          "streetName" : street,
          "postalCode" : code,
          "city" : city,
          "country" : country
        }
      },
    ],
  };
  const response = await updateCustomerData(id, requestData);
  const requestIdData: IRequestAddressData = {
    version: version + 1,
    actions: [
      {
        action : `add${type}AddressId`,
        addressId : response.addresses[response.addresses.length-1].id
      }
    ],
  };
  const responseId = await updateCustomerData(id, requestIdData);
  if (default1) {
    const requestDefaultData: IRequestAddressData = {
      version: version + 2,
      actions: [
        {
          action : `setDefault${type}Address`,
          addressId : response.addresses[response.addresses.length-1].id
        }
      ],
    };
    const responseDefault = await updateCustomerData(id, requestDefaultData);
    changeState('setVersion', responseDefault?.version);
  } else {
    changeState('setVersion', responseId?.version);
  }



  if (responseId?.version > 0) {
    changeState('setModalMessage', 'Данные успешно обновлены');
    changeState('setShowModal', true);
  } else {
    changeState('setModalMessage', responseId?.message);
    changeState('setShowModal', true);
  }
}

export interface IRequestAddressData {
  version: string;
  actions: {
    action: string;
    address?: {[key: string]: string};
    addressId? : string
  }[];
}