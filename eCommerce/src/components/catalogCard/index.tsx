import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { AddCartButton } from '../addButton';
import { addItem } from '../../helpers/cart/addItem';
import { checkItemInCart } from '../../helpers/itemInCart';
import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';

const Card = styled(Link)`
  @media (hover: hover) {
    &:hover {
      transition: 0.3s;
      box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.25);
    }
  }
  transition: 0.3s;
  display: block;
  width: 17rem;
  text-decoration: none;
  color: black;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.25);
  img {
    width: 100%;
    height: 50%;
    object-fit: contain;
  }
  position: relative;
  &>div>button {
    margin-top: 0;
    background-color: black;
    color: white;
    border-color: black;
    position: absolute;
    bottom: 16px;
    width: calc(100% - 32px);
    @media (hover: hover) {
      &:hover {
        background-color: white;
        color: black;
      }
    }
  }
`;
const CardContent = styled.div`
  padding: 1rem;
  p {
    margin-top: 1rem;
    max-height: 110px;
    overflow: hidden;
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
    color: #e32b2b;
  }
`;

export const ProductCard = ({ ...props }) => {
  const dispatch = useDispatch();
  const [inCart, setInCart] = useState(false);

  let price = (props.cardData?.masterVariant.prices[0]?.value.centAmount / 100).toFixed(2);
  let newPrice = (
    props.cardData?.masterVariant.prices[0]?.discounted?.value.centAmount / 100
  ).toFixed(2);
  let currency = props.cardData?.masterVariant.prices[0]?.value.currencyCode;

  checkItemInCart(props.productId, props.cartData)
    .then((isInCart) => {
      setInCart(isInCart?.exists);
    })
    .catch((error) => {
      console.error('Error checking item in cart:', error);
    });

    const handleAddToCart = async (e: Event, productId: string) => {
      e.preventDefault();
      try {
        const addButton = e.target as HTMLButtonElement;
        addButton.disabled = true;
        notify();
        await addItem(e, productId, dispatch);
      } catch (error) {
        console.error('Error adding item to cart:', error);
      }
    };

  const notify = () => {
    toast.success('Товар был добавлен', {
      position: "top-center",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      });
  };
  return (
    <Card to={props.link}>
      <img src={props.cardData.masterVariant.images[0]?.url} alt="productImage" />
      {newPrice !== 'NaN' ? (
        <Price>
          <span>{`${price} ${currency}`}</span>
          <span>{`${newPrice} ${currency}`}</span>
        </Price>
      ) : (
        <Price>{`${price} ${currency}`}</Price>
      )}
      <CardContent>
        <h2>{props.cardData.name.ru}</h2>
        <p>{props.cardData.description.ru}</p>
        <AddCartButton
          disabled={inCart}
          onClick={(e: Event) => handleAddToCart(e, props.productId)}
          text="Добавить в корзину"
        />
      </CardContent>
      
    </Card>
  );
};
