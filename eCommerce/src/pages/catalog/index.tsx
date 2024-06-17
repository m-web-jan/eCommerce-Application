import { IResult, RootState } from '../../types';
import { useCallback, useEffect, useState } from 'react';
import { ProductCard } from '../../components/catalogCard';
import { Catalog, CatalogCards, CatalogMenu, MenuLogo } from './style';
import { allProducts } from '../../api/getAllProducts';
import { getProductsByCategory } from '../../api/getCategory';
import { getCategoryByKey } from '../../api/getCategoryByKey';
import { getMyActiveCart } from '../../api/cart/getMyActiveCart';
import { useDispatch, useSelector } from 'react-redux';
import React from 'react';
import { ToastContainer } from 'react-toastify';

export const CatalogPage = React.memo(() => {
  const [catalogData, setCatalogData] = useState<IResult[] | null>(null);
  const [catalogTitle, setCatalogTitle] = useState('Мотоэкипировка');
  const [catalogText, setCatalogText] = useState(
    'В нашем интернет-магазине вы найдете всё необходимое для безопасной и комфортной езды: шлемы, мотокомбинезоны, боты и аксессуары. Мы предлагаем высококачественную мотоэкипировку от ведущих брендов, чтобы вы могли наслаждаться каждой поездкой, зная, что вы надежно защищены. Откройте для себя мир мотоэкипировки с MotoMax!'
  );
  const [cartData, setCartData] = useState({});
  const dispatch = useDispatch();
  const states = useSelector((state: RootState) => state.cart);

  const changeState = useCallback((type: string, value: string | boolean | number) => {
    dispatch({ type: type, payload: value });
  }, [dispatch]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await allProducts();
        setCatalogData(data);
        const response = await getMyActiveCart();
        setCartData(response);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchData();
  }, []);

  const changeCategory = useCallback(async (categoryKey: string) => {
    try {
      const categoryData = await getCategoryByKey(categoryKey);
      setCatalogTitle(categoryData?.name?.ru);
      setCatalogText(categoryData?.description?.ru);
      const data = await getProductsByCategory(categoryData?.id);
      setCatalogData(data);
      changeState('setOpenCategoryMenu', false); // Закрываем меню после изменения категории
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  }, [changeState]);

  useEffect(() => {
    console.log('Menu state updated:', states.openCategoryMenu);
  }, [states.openCategoryMenu]);

  return (
    <Catalog>
      <CatalogMenu
        className={states.openCategoryMenu ? 'open' : ''}
        onClick={() => {
          console.log('Closing menu');
          changeState('setOpenCategoryMenu', false);
        }}
      >
        <MenuLogo to="/">
          <img src="../../icons/lightLogo.png" alt="logoIcon" />
          <h2>MotoMax</h2>
        </MenuLogo>
        <p>Категории:</p>
        <ul>
          {[
            { text: 'Шлема', key: 'helmet' },
            { text: 'Комбинезоны', key: 'suits' },
            { text: 'Боты', key: 'boots' },
            { text: 'Аксессуары', key: 'accessories' },
          ].map((category, index) => (
            <li
              key={index}
              onClick={() => {
                console.log('Changing category:', category.key);
                changeCategory(category.key);
              }}
            >
              {category.text}
            </li>
          ))}
        </ul>
      </CatalogMenu>
      <div className="container">
        <p
          className="categories"
          onClick={() => {
            console.log('Before toggle:', states.openCategoryMenu);
            changeState('setOpenCategoryMenu', !states.openCategoryMenu);
            console.log('After toggle:', states.openCategoryMenu);
          }}
        >
          Категории
        </p>
        <h1>{catalogTitle}</h1>
        <p>{catalogText}</p>
        <CatalogCards>
          {catalogData ? (
            catalogData.map((card, index) => (
              <ProductCard
                key={index}
                link={`/catalog/${card.key}`}
                cartData={cartData}
                productId={card.id}
                cardData={card.masterData.current}
              />
            ))
          ) : (
            <p>Loading...</p>
          )}
        </CatalogCards>
      </div>
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
    </Catalog>
  );
});
