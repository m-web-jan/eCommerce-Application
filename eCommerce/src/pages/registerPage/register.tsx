import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { UserStatusTypes } from '../../slices/users/userReducerType';
import {
  fetchRegisterCustomer,
  resetStatus,
} from '../../slices/users/usersSlice';

export function RegistrationForm() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { user, status, message } = useAppSelector((state) => state.users);

  const handleSubmit = (values: RegistrationFormFields) => {
    const newCustomerData = prepareNewUserDataForSubmit(values);
    dispatch(fetchRegisterCustomer(newCustomerData));
  };

  useEffect(() => {
    if (user && status === null) {
      navigate('/');
    } else if (status === UserStatusTypes.ERROR) {
      toast.error(message, toastOptions);
    } else if (user && status === UserStatusTypes.SUCCESS) {
      toast.success(`Welcome ${user.firstName} ${user.lastName}`, toastOptions);
      dispatch(resetStatus());
      navigate('/');
    }
  }, [user, message, status, navigate, dispatch]);

  return (
    <Formik initialValues={registrationFormFields} onSubmit={handleSubmit}>
      {({ errors, touched, setFieldValue, values }) => (
        <StyledFormikForm>
          <FormGroup>
            <StyledFormikInput
              name="firstName"
              placeholder="First name"
              validate={getTextErrorMsg}
            />
            {errors.firstName && touched.firstName && (
              <StyledErrorMessage>{errors.firstName}</StyledErrorMessage>
            )}
            <StyledFormikInput
              name="lastName"
              placeholder="Second name"
              validate={getTextErrorMsg}
            />
            {errors.lastName && touched.lastName && (
              <StyledErrorMessage>{errors.lastName}</StyledErrorMessage>
            )}
            <StyledFormikInput
              name="birthDate"
              type="date"
              validate={getBirthDateErrorMsg}
            />
            {errors.birthDate && touched.birthDate && (
              <StyledErrorMessage>{errors.birthDate}</StyledErrorMessage>
            )}
            <StyledFormikInput
              name="email"
              type="email"
              placeholder="email"
              validate={getEmailErrorMsg}
            />
            {errors.email && touched.email && (
              <StyledErrorMessage>{errors.email}</StyledErrorMessage>
            )}
            <StyledPasswordInputWrapper />
            {errors.password && touched.password && (
              <StyledErrorMessage>{errors.password}</StyledErrorMessage>
            )}
            <RegistrationPageCheckbox
              name="userDataProcessingConsent"
              label="Hereby I provide my consent for processing my personal data."
            />
          </FormGroup>

          <RegistrationPageAddressBlock
            errors={errors}
            touched={touched}
            values={values}
            setFieldValue={setFieldValue}
          />

          <FormGroup>
            <StyledBtn $primary type="submit">
              Submit
            </StyledBtn>
          </FormGroup>
        </StyledFormikForm>
      )}
    </Formik>
  );
}
