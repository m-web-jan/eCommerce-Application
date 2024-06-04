import { useEffect, useState } from 'react';
import { getCustomerData } from '../../api/getCustomerDetails';
import { UserPageContainer } from '../../components/userPageContainer';
import { useDispatch } from 'react-redux';

export const ProfilePage = () => {
  const [customerData, setCustomerData] = useState({ id: '', version: '' });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCustomerData();
        setCustomerData(data);
        changeState('setProfileName', data.firstName);
        changeState('setProfileLastname', data.lastName);
        changeState('setProfileEmail', data.email);
        changeState('setProfileDOB', data.dateOfBirth);
        changeState('setCity1', data.addresses[0].city);
        changeState('setCity2', data.addresses[1].city);
        changeState('setStreet1', data.addresses[0].streetName);
        changeState('setStreet2', data.addresses[1].streetName);
        changeState('setCode1', data.addresses[0].postalCode);
        changeState('setCode2', data.addresses[1].postalCode);
        changeState('setCountry1', data.addresses[0].country);
        changeState('setCountry2', data.addresses[1].country);
        changeState('setDefault1', data?.defaultShippingAddressId ? true : false);
        changeState('setDefault2', data?.defaultBillingAddressId ? true : false);
        changeState('setVersion', data?.version);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchData();
  }, []);

  const dispatch = useDispatch();
  function changeState(type: string, value: string | boolean) {
    dispatch({ type: type, payload: value });
  }

  return (
    <UserPageContainer id={customerData.id}></UserPageContainer>
  );
};
