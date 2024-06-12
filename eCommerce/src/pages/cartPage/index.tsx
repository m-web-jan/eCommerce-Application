import { Cart, PayBlock } from './style';
import { CartCard } from '../../components/cartCard';
import { RootState } from '../../types';
import { useDispatch, useSelector } from 'react-redux';
import { getMyActiveCart } from '../../api/cart/getMyActiveCart';
import { useEffect, useState } from 'react';

export const CartPage = () => {
  const [cartData, setCartData] = useState([]);
  const dispatch = useDispatch();
  const cartSelector = (state: RootState) => state.cart;
  const states = useSelector((state: RootState) => cartSelector(state));
  function changeState(type: string, value: string | boolean | number) {
    dispatch({ type: type, payload: value });
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getMyActiveCart();
        changeState('setCartData', data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    let price = (states.cartData?.totalPrice?.centAmount / 100).toFixed(2);
    changeState('setTotalPrice', price);
    changeState('setCartItems', states.cartData?.lineItems?.length);
  }, [states.cartData]);

  return (
    <Cart>
      <h2>
        Корзина<span>{states.cartItems}</span>
      </h2>
      {/* <CartCard itemData={cartData[0]}></CartCard> */}
      {states.cartData?.lineItems?.map((card, index) => (
        <CartCard key={index} itemData={card} />
      ))}
      <PayBlock>
        <div className="content">
          <div className="total">
            <h2>Итого</h2>
            <p className="count">{states.cartItems} товара</p>
          </div>
          <div className="price">{states.totalPrice} BYN</div>
        </div>
        <button>Оплатить</button>
      </PayBlock>
    </Cart>
  );
};
