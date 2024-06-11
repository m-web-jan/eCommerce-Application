import {
  Block,
  BlockContent,
  BlockImg,
  Code,
  Logo,
  MarginTop,
  StyledLink,
  SubTitle,
  Title,
} from './style';

export const NotFound = () => {
  return (
    <div>
      <Block>
        <BlockImg src="../images/404Image.png" alt="Image" />
        <BlockContent>
          <Logo>
            <img src="../icons/darkLogo.png" alt="cart-icon" />
            <h2>MotoMax</h2>
          </Logo>
          <Title>Упс! Кажется, ты заблудился!</Title>
          <SubTitle>
          Дом находится на расстоянии одного клика. Давайте вернемся и продолжим нашу обычную жизнь
          </SubTitle>
          <MarginTop>
            <StyledLink to={'/'}>Главная</StyledLink>
          </MarginTop>
          <Code>Код ошибки 404</Code>
        </BlockContent>
      </Block>
    </div>
  );
};
