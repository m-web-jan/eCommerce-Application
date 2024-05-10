import { publicInstance } from ".";
import { getAuthToken } from "./authToken"

export const registration = async () => {
  const authToken = getAuthToken();

  const response = await publicInstance.post(
    '/me/signup',
    newUserRequestData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
  });
}