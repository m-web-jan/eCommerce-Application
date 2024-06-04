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
}

export interface IRequestData {
  version: string;
  actions: {
    action: string;
    [key: string]: string;
  }[];
}
