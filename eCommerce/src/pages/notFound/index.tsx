import { Block, BlockContent, BlockImg, Code, Logo, MarginTop, StyledLink, SubTitle, Title } from './style';

export const NotFound = () => {
  return (
    <div>
      <Block>
        <BlockImg src="../images/404Image.png" alt="Image" />
        <BlockContent>
          <Logo>
            <img src="../icons/cart.png" alt="cart-icon" />
            <h2>eComm</h2>
          </Logo>
          <Title>Opps! It’s seems you have been lost!</Title>
          <SubTitle>
            Home is just a click away. Let’s go back and continue our regular
            life
          </SubTitle>
          <MarginTop>
            <StyledLink to={'/'}>GO TO HOME</StyledLink>
          </MarginTop>
          <Code>Error code 404</Code>
        </BlockContent>
      </Block>
    </div>
  );
};
