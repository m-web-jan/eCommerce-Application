import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Card = styled(Link)`
  &:hover {
    transition: .3s;
    box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.25);
  }
  transition: .3s;
  display: block;
  width: 17rem;
  text-decoration: none;
  color: black;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.25);
  img {
    width: 100%;
    height: 50%;
  }
`;
const CardContent = styled.div`
  padding: 1rem;
  p {
    margin-top: 1rem;
  }
`;
const Price = styled.p`
  margin-left: 1rem;
  background-color: black;
  padding: 5px;
  color: white;
  font-size: 14px;
  font-weight: 500;
  margin-top: -33px;
  z-index: 1;
  position: absolute;
  span {
    margin-right: 5px;
    text-decoration: line-through;
    color: gray;
  }
  span:nth-child(2n) {
    text-decoration: none;
    color: #E32B2B;
  }
`;

export const ProductCard = ( {...props} ) => {
  let price = (props.cardData.masterVariant.prices[0].value.centAmount / 100).toFixed(2);
  let newPrice = (props.cardData.masterVariant.prices[0]?.discounted?.value.centAmount / 100).toFixed(2);
  let currency = props.cardData.masterVariant.prices[0].value.currencyCode;

  return (
    <Card to={props.link}>
      <img src={props.cardData.masterVariant.images[0]?.url} alt="productImage" />
      {newPrice !== 'NaN' ? (
        <Price>
          <span>{`${price}${currency}`}</span>
          <span>{`${newPrice}${currency}`}</span>
        </Price>
      ) : (
        <Price>{`${price}${currency}`}</Price>
      )}
      <CardContent>
        <h2>{props.cardData.name.ru}</h2>
        <p>{props.cardData.description.ru}</p>
      </CardContent>
    </Card>
  );
};
