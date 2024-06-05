import { useDispatch, useSelector } from 'react-redux';
import { ContentBlock, StyledText, StyledTitle, UserPageStyled } from './style';
import { RootState } from '../../types';
import { MouseEvent, useState } from 'react';
import { validateDob, validateEmail, validateField } from '../../pages/registerPage/validations';
import { updatePersonalData } from './updateData.tsx';
import { SuccessModal } from '../alertModal/index.tsx';
import { RoundedButton } from '../roundedButton/index.tsx';
import { PasswordModal } from './changrPassword.tsx';

export const UserPageContainer = ({ ...props }) => {
  const [isChanging1, setIsChanging1] = useState(false);
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

  return (
    <UserPageStyled>
      {states.showModalPassword && (<PasswordModal id={props.id} />)}
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
      <ContentBlock>
        <div className="row">
          <img src="../icons/userAvatar.png" alt="userIcon" />
          <div className="content">
            <StyledTitle>{`${states?.firstName} ${states?.lastName}`}</StyledTitle>
            <StyledText>{states?.email}</StyledText>
            <StyledText>{states?.city1}</StyledText>
          </div>
          <RoundedButton
            onClick={() => {
              changeState('setShowModalPassword', !states.showModalPassword);
            }}
            text="Изменить пароль"
          />
        </div>
      </ContentBlock>

      <ContentBlock>
        <div className="top-row">
          <StyledTitle>Личные данные</StyledTitle>
          <RoundedButton
            onClick={(e: MouseEvent<HTMLButtonElement>) => {
              changeData(e);
            }}
            text="Изменить"
          />
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

      <ContentBlock>
        <RoundedButton
          onClick={(e: MouseEvent<HTMLButtonElement>) => {
            changeData(e);
          }}
          text="Изменить"
        />
        <div className="top-row">
          <StyledTitle>Адрес доставки</StyledTitle>
          <label htmlFor="mainAddress1">
            <input type="checkbox" id="mainAddress1" checked={states?.default1} />
            Основной адрес
          </label>
        </div>
        <div className="row">
          <div className="content">
            <label htmlFor="street1">
              Улица
              <input type="text" id="street1" value={states?.street1} />
            </label>
            <label htmlFor="postalCode1">
              Почтовый индекс
              <input type="email" id="postalCode1" value={states?.postalCode1} />
            </label>
          </div>
          <div className="content">
            <label htmlFor="city1">
              Город
              <input type="text" id="city1" value={states?.city1} />
            </label>
            <label>
              Страна
              <select
                value={states?.country1}
                required={true}
                // onChange={(event: ChangeEvent<HTMLSelectElement>) => {
                //   changeState('setCountry', event.target.value);
                //   if (states.sameAddresses) changeState('setCountry2', event.target.value);
                //   changeState(
                //     'setPostalCodeError',
                //     validatePostalCode(states.postalCode, event.target.value)
                //   );
                // }}
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

      <ContentBlock>
        <div className="top-row">
          <StyledTitle>Адрес для счетов</StyledTitle>
          <label htmlFor="mainAddress1">
            <input type="checkbox" id="mainAddress1" checked={states?.default2} />
            Основной адрес
          </label>
        </div>
        <div className="row">
          <div className="content">
            <label htmlFor="street2">
              Улица
              <input type="text" id="street2" value={states?.street2} />
            </label>
            <label htmlFor="postalCode2">
              Почтовый индекс
              <input type="email" id="postalCode2" value={states?.postalCode2} />
            </label>
          </div>
          <div className="content">
            <label htmlFor="city2">
              Город
              <input type="text" id="city2" value={states?.city2} />
            </label>
            <label>
              Страна
              <select
                value={states?.country2}
                required={true}
                // onChange={(event: ChangeEvent<HTMLSelectElement>) => {
                //   changeState('setCountry', event.target.value);
                //   if (states.sameAddresses) changeState('setCountry2', event.target.value);
                //   changeState(
                //     'setPostalCodeError',
                //     validatePostalCode(states.postalCode, event.target.value)
                //   );
                // }}
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
