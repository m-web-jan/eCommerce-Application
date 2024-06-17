import { Cart, Empty, PayBlock } from './style';
import { CartCard } from '../../components/cartCard';
import { RootState } from '../../types';
import { useDispatch, useSelector } from 'react-redux';
import { getMyActiveCart } from '../../api/cart/getMyActiveCart';
import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import { RoundedButton } from '../../components/roundedButton';
import { deleteMyCart } from '../../api/cart/deleteMyCart';

export const CartPage = () => {
  const dispatch = useDispatch();
  const cartSelector = (state: RootState) => state.cart;
  const states = useSelector((state: RootState) => cartSelector(state));
  function changeState(type: string, value: string | boolean | number) {
    dispatch({ type: type, payload: value });
  }

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const data = await getMyActiveCart();
        changeState('setCartData', data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchCartData();
  }, []);

  useEffect(() => {
    let price = (states.cartData?.totalPrice?.centAmount / 100).toFixed(2);
    changeState('setTotalPrice', price);
    changeState('setCartItems', states.cartData?.lineItems?.length);
  }, [states.cartData]);

  function clearCart() {
    deleteMyCart(states.cartData?.id, states.cartData?.version)
    .then((data) => {
      data.lineItems = [];
      changeState('setCartData', data);
    })
    .catch((error) => {
      console.error('Error checking item in cart:', error);
    });
  }

  return (
    <Cart>
      {states.cartData?.lineItems?.length > 0 && (
        <div className='top'>
          <h2>
            Корзина<span>{states.cartItems}</span>
          </h2>
          <RoundedButton text='Очистить корзину' onClick={() => {clearCart()}} />
        </div>
      )}
      {states.cartData?.lineItems?.map((card, index) => (
        <CartCard key={index} itemData={card} cart={states?.cartData} changeState={changeState} />
      ))}
      {states.cartData?.lineItems?.length > 0 && (
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
      )}
      {states.cartData?.lineItems?.length === 0 && (
        <Empty>
          <img src="../images/emptyCart.png" alt="" />
          <h2>Ваша корзина пуста</h2>
          <p>Похоже, вы еще не сделали свой выбор...</p>
          <Link to="/catalog">Вернуться к покупкам</Link>
        </Empty>
      )}
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </Cart>
  );
};
