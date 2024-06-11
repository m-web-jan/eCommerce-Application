import { useDispatch, useSelector } from 'react-redux';
import { ContentBlock, StyledText, StyledTitle, UserPageStyled } from './style';
import { RootState } from '../../types';
import { ChangeEvent, MouseEvent, useState } from 'react';
import {
  validateDob,
  validateEmail,
  validateField,
  validatePostalCode,
  validateStreet,
} from '../../pages/registerPage/validations';
import { updateAddress1, updatePersonalData } from './updateData.tsx';
import { SuccessModal } from '../alertModal/index.tsx';
import { RoundedButton } from '../roundedButton/index.tsx';
import { PasswordModal } from './changrPassword.tsx';

export const UserPageContainer = ({ ...props }) => {
  const [isChanging1, setIsChanging1] = useState(false);
  const [isChanging2, setIsChanging2] = useState(false);
  const [isChanging3, setIsChanging3] = useState(false);
  const countries = ['RU', 'BY', 'UK'];
  const dispatch = useDispatch();
  const profileSelector = (state: RootState) => state.profile;
  const registerSelector = (state: RootState) => state.register;

  const states = useSelector((state: RootState) => profileSelector(state));
  const stateErrors = useSelector((state: RootState) => registerSelector(state));
  function changeState(type: string, value: string | boolean) {
    dispatch({ type: type, payload: value });
  }

  function changeData(e: MouseEvent<HTMLButtonElement>) {
    const buttonElement = e.target as HTMLButtonElement;
    if (!isChanging1) {
      buttonElement.innerText = 'Сохранить';
      setIsChanging1(!isChanging1);
    } else {
      if (
        !stateErrors.nameError &&
        !stateErrors.emailError &&
        !stateErrors.lastnameError &&
        !stateErrors.dobError
      ) {
        buttonElement.innerText = 'Изменить';
        updatePersonalData(
          states?.email,
          states?.firstName,
          states?.lastName,
          states?.dateOfBirth,
          props.id,
          states?.version,
          dispatch
        );
        setIsChanging1(!isChanging1);
      }
    }
  }

  function changeAddress1(e: MouseEvent<HTMLButtonElement>) {
    if (!states?.city1 || !states?.postalCode1 || !states?.country1 || !states?.street1) return;
    const buttonElement = e.target as HTMLButtonElement;
    if (!isChanging2) {
      changeState('setStreet1', '');
      changeState('setCode1', '');
      changeState('setCity1', '');
      changeState('setDefault1', false);
      buttonElement.innerText = 'Сохранить';
      setIsChanging2(!isChanging2);
    } else {
      if (!stateErrors.streetError && !stateErrors.postalCodeError && !stateErrors.cityError) {
        buttonElement.innerText = 'Добавить';
        updateAddress1(
          states?.default1,
          states?.city1,
          states?.postalCode1,
          states?.country1,
          states?.street1,
          props.id,
          states?.version,
          dispatch,
          'Shipping'
        );
        setIsChanging2(!isChanging2);
      }
    }
  }

  function changeAddress2(e: MouseEvent<HTMLButtonElement>) {
    if (!states?.city2 || !states?.postalCode2 || !states?.country2 || !states?.street2) return;
    const buttonElement = e.target as HTMLButtonElement;
    if (!isChanging3) {
      changeState('setStreet2', '');
      changeState('setCode2', '');
      changeState('setCity2', '');
      changeState('setDefault2', false);
      buttonElement.innerText = 'Сохранить';
      setIsChanging3(!isChanging3);
    } else {
      if (!stateErrors.streetError2 && !stateErrors.postalCodeError2 && !stateErrors.cityError2) {
        buttonElement.innerText = 'Добавить';
        updateAddress1(
          states?.default2,
          states?.city2,
          states?.postalCode2,
          states?.country2,
          states?.street2,
          props.id,
          states?.version,
          dispatch,
          'Billing'
        );
        setIsChanging3(!isChanging3);
      }
    }
  }

  return (
    <UserPageStyled>
      {states.showModalPassword && <PasswordModal id={props.id} />}
      {states.showModal && (
        <SuccessModal
          title="MotoMax"
          message={states.modalMessage}
          onClose={() => {
            changeState('setShowModal', !states.showModal);
          }}
          buttonText="Закрыть"
        />
      )}
      <StyledTitle>Мой Профиль</StyledTitle>
      <ContentBlock onSubmit={(e) => {e.preventDefault(); changeState('setShowModalPassword', !states.showModalPassword);}}>
        <div className="row">
          <img src="../icons/userAvatar.png" alt="userIcon" />
          <div className="content">
            <StyledTitle>{`${states?.firstName} ${states?.lastName}`}</StyledTitle>
            <StyledText>{states?.email}</StyledText>
            <StyledText>{states?.city1}</StyledText>
          </div>
          <RoundedButton
            text="Изменить пароль"
          />
        </div>
      </ContentBlock>

      <ContentBlock onSubmit={(e) => {e.preventDefault()}}>
        <div className="top-row">
          <RoundedButton
            onClick={(e: MouseEvent<HTMLButtonElement>) => {
              changeData(e);
            }}
            text="Изменить"
          />
          <StyledTitle>Личные данные</StyledTitle>
        </div>
        <div className="row">
          <div className="content">
            <label htmlFor="name">
              Имя
              <input
                disabled={isChanging1 ? false : true}
                type="text"
                id="name"
                value={states?.firstName}
                onChange={(e) => {
                  changeState('setProfileName', e.target.value);
                  changeState('setNameError', validateField(e.target.value));
                }}
              />
              <span className="error">{stateErrors.nameError}</span>
            </label>
            <label htmlFor="mail">
              Почта
              <input
                disabled={isChanging1 ? false : true}
                type="email"
                id="mail"
                value={states?.email}
                onChange={(e) => {
                  changeState('setProfileEmail', e.target.value);
                  validateEmail(e.target.value, dispatch);
                }}
              />
              <span className="error">{stateErrors.emailError}</span>
            </label>
          </div>
          <div className="content">
            <label htmlFor="lastName">
              Фамилия
              <input
                disabled={isChanging1 ? false : true}
                type="text"
                id="lastName"
                value={states?.lastName}
                onChange={(e) => {
                  changeState('setProfileLastname', e.target.value);
                  changeState('setLastnameError', validateField(e.target.value));
                }}
              />
              <span className="error">{stateErrors.lastnameError}</span>
            </label>
            <label htmlFor="dateOfBirth">
              Дата рождения
              <input
                disabled={isChanging1 ? false : true}
                type="date"
                id="dateOfBirth"
                value={states?.dateOfBirth}
                onChange={(e) => {
                  changeState('setProfileDOB', e.target.value);
                  changeState('setDobError', validateDob(e.target.value, dispatch));
                }}
              />
              <span className="error">{stateErrors.dobError}</span>
            </label>
          </div>
        </div>
      </ContentBlock>

      <ContentBlock onSubmit={(e) => {e.preventDefault()}}>
        <RoundedButton
          onClick={(e: MouseEvent<HTMLButtonElement>) => {
            changeAddress1(e);
          }}
          text="Добавить"
        />
        <div className="top-row">
          <StyledTitle>Адрес доставки</StyledTitle>
          <label htmlFor="mainAddress1">
            <input
              type="checkbox"
              id="mainAddress1"
              checked={states?.default1}
              onClick={() => {
                changeState('setDefault1', !states?.default1);
              }}
            />
            Основной адрес
          </label>
        </div>
        <div className="row">
          <div className="content">
            <label htmlFor="street1">
              Улица
              <input
                required
                disabled={isChanging2 ? false : true}
                onChange={(e) => {
                  changeState('setStreet1', e.target.value);
                  changeState('setStreetError', validateStreet(e.target.value));
                }}
                type="text"
                id="street1"
                value={states?.street1}
              />
              <span className="error">{stateErrors.streetError}</span>
            </label>
            <label htmlFor="postalCode1">
              Почтовый индекс
              <input
                required
                disabled={isChanging2 ? false : true}
                onChange={(e) => {
                  changeState('setCode1', e.target.value);
                  changeState(
                    'setPostalCodeError',
                    validatePostalCode(e.target.value, states?.country1)
                  );
                }}
                type="email"
                id="postalCode1"
                value={states?.postalCode1}
              />
              <span className="error">{stateErrors.postalCodeError}</span>
            </label>
          </div>
          <div className="content">
            <label htmlFor="city1">
              Город
              <input
                required
                disabled={isChanging2 ? false : true}
                onChange={(e) => {
                  changeState('setCity1', e.target.value);
                  changeState('setcityError', validateField(e.target.value));
                }}
                type="text"
                id="city1"
                value={states?.city1}
              />
              <span className="error">{stateErrors.cityError}</span>
            </label>
            <label>
              Страна
              <select
                disabled={isChanging2 ? false : true}
                value={states?.country1}
                required={true}
                onChange={(event: ChangeEvent<HTMLSelectElement>) => {
                  changeState('setCountry1', event.target.value);
                  changeState(
                    'setPostalCodeError',
                    validatePostalCode(states.postalCode1, event.target.value)
                  );
                }}
              >
                {countries.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>
      </ContentBlock>

      <ContentBlock onSubmit={(e) => {e.preventDefault()}}>
        <RoundedButton
          onClick={(e: MouseEvent<HTMLButtonElement>) => {
            changeAddress2(e);
          }}
          text="Добавить"
        />
        <div className="top-row">
          <StyledTitle>Адрес для счетов</StyledTitle>
          <label htmlFor="mainAddress2">
            <input
              type="checkbox"
              id="mainAddress2"
              checked={states?.default2}
              onChange={() => {
                changeState('setDefault2', !states?.default2);
              }}
            />
            Основной адрес
          </label>
        </div>
        <div className="row">
          <div className="content">
            <label htmlFor="street2">
              Улица
              <input
                required
                disabled={isChanging3 ? false : true}
                onChange={(e) => {
                  changeState('setStreet2', e.target.value);
                  changeState('setStreetError2', validateStreet(e.target.value));
                }}
                type="text"
                id="street2"
                value={states?.street2}
              />
              <span className="error">{stateErrors.streetError2}</span>
            </label>
            <label htmlFor="postalCode2">
              Почтовый индекс
              <input
                required
                disabled={isChanging3 ? false : true}
                onChange={(e) => {
                  changeState('setCode2', e.target.value);
                  changeState(
                    'setPostalCodeError2',
                    validatePostalCode(e.target.value, states?.country2)
                  );
                }}
                type="email"
                id="postalCode2"
                value={states?.postalCode2}
              />
              <span className="error">{stateErrors.postalCodeError2}</span>
            </label>
          </div>
          <div className="content">
            <label htmlFor="city2">
              Город
              <input
                required
                disabled={isChanging3 ? false : true}
                onChange={(e) => {
                  changeState('setCity2', e.target.value);
                  changeState('setcityError2', validateField(e.target.value));
                }}
                type="text"
                id="city2"
                value={states?.city2}
              />
              <span className="error">{stateErrors.cityError}</span>
            </label>
            <label>
              Страна
              <select
                disabled={isChanging3 ? false : true}
                value={states?.country2}
                required={true}
                onChange={(event: ChangeEvent<HTMLSelectElement>) => {
                  changeState('setCountry2', event.target.value);
                  changeState(
                    'setPostalCodeError2',
                    validatePostalCode(states.postalCode1, event.target.value)
                  );
                }}
              >
                {countries.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>
      </ContentBlock>
    </UserPageStyled>
  );
};
