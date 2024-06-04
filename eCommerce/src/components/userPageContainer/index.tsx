import { useDispatch, useSelector } from 'react-redux';
import { ContentBlock, StyledText, StyledTitle, UserPageStyled } from './style';
import { RootState } from '../../types';

export const UserPageContainer = ({ ...props }) => {
  const countries = ['RU', 'BY', 'UK'];
  const dispatch = useDispatch();
  const profileSelector = (state: RootState) => state.profile;

  const states = useSelector((state: RootState) => profileSelector(state));
  function changeState(type: string, value: string | boolean) {
    dispatch({ type: type, payload: value });
  }

  console.log(states);

  return (
    <UserPageStyled>
      <StyledTitle>Мой Профиль</StyledTitle>
      <ContentBlock>
        <div className="row">
          <img src="../icons/userAvatar.png" alt="userIcon" />
          <div className="content">
            <StyledTitle>{`${states?.firstName} ${states?.lastName}`}</StyledTitle>
            <StyledText>{states?.email}</StyledText>
            <StyledText>{states?.city1}</StyledText>
          </div>
        </div>
      </ContentBlock>

      <ContentBlock>
        <StyledTitle>Личные данные</StyledTitle>
        <div className="row">
          <div className="content">
            <label htmlFor="name">
              Имя
              <input type="text" id="name" value={states?.firstName} />
            </label>
            <label htmlFor="mail">
              Почта
              <input type="email" id="mail" value={states?.email} />
            </label>
          </div>
          <div className="content">
            <label htmlFor="lastName">
              Фамилия
              <input type="text" id="lastName" value={states?.lastName} />
            </label>
            <label htmlFor="dateOfBirth">
              Дата рождения
              <input type="date" id="dateOfBirth" value={states?.dateOfBirth} />
            </label>
          </div>
        </div>
      </ContentBlock>

      <ContentBlock>
        <div className="main-address">
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
        <div className="main-address">
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
