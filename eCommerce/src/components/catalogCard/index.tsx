import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Card = styled(Link)`
  display: block;
  width: 17rem;
  text-decoration: none;
  color: black;
  box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.25);
  img {
    width: 100%;
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

export const ProductCard = ({ ...props }) => {
  return (
    <Card to={props.link}>
      <img src={props.image} alt="productImage" />
      {props.newPrice.length ? (
        <Price>
          <span>{props.price}</span>
          <span>{props.newPrice}</span>
        </Price>
      ) : (
        <Price>{props.price}</Price>
      )}
      <CardContent>
        <h1>{props.title}</h1>
        <p>{props.description}</p>
      </CardContent>
    </Card>
  );
};
