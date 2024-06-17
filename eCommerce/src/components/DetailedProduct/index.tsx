import { useEffect, useState } from 'react';
import { getProductByKey } from '../../api/getProductByKey';
import { ICurrent } from '../../types';
import {
  DetailedProductBlock,
  OldPrice,
  ProductContent,
  ProductOptions,
  ProductPrice,
  ProductSlider,
  RadioLabel,
  RemoveBtn,
  SliderImage,
  SliderImages,
  SliderNav,
} from './style';
import { getProductImages } from './getImages';
import { getTypeById } from '../../api/getTypeById';
import { turnSlides } from './turnSlider';
import { getProductColors, getProductSizes } from './getAttributes';
import { AddCartButton } from '../addButton';
import { ImageModal } from '../enlargedImageModal';
import { addItem } from '../../helpers/cart/addItem';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { checkItemInCart } from '../../helpers/itemInCart';
import { useDispatch } from 'react-redux';
import { removeProduct } from '../../api/cart/removeProductFromCart';
import { getMyActiveCart } from '../../api/cart/getMyActiveCart';

export const DetailedProduct = ({ ...props }) => {
  const dispatch = useDispatch();
  const [productData, setProductData] = useState<ICurrent | null>(null);
  const [productType, setProductType] = useState('');
  const [currentImage, setCurrentImage] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [inCart, setInCart] = useState(false);
  const [productId, setProductId] = useState('');
  const [itemId, setItemId] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [data, id, pId] = await getProductByKey(props.productKey);
        setProductData(data);
        setProductId(pId);
        const typeData = await getTypeById(id);
        setProductType(typeData);
        const checkCart = await checkItemInCart(pId, props.cartData);
        setItemId(checkCart?.itemId);
        setInCart(checkCart?.exists);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchData();
  }, []);

  const notify = () => {
    toast.success('Товар был добавлен', {
      position: 'top-center',
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored',
    });
  };

  const notifyDel = () => {
    toast.error('Товар был удален из корзины', {
      position: 'top-center',
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored',
    });
  };

  const handleAddToCart = async (e: Event) => {
    e.preventDefault();
    try {
      const addButton = e.target as HTMLButtonElement;
      addButton.disabled = true;
      notify();
      await addItem(e, productId, dispatch);
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
    setInCart(true);
    await getMyActiveCart()
    .then((data) => {
      props.cartData.version = data?.version;
      props.cartData = data;
    })
    await checkItemInCart(productId, props.cartData)
    .then((data) => {
      setItemId(data?.itemId);
    })
  };

  const productPrice = (productData?.masterVariant.prices[0]?.value.centAmount! / 100).toFixed(2);
  const newPrice = (
    productData?.masterVariant.prices[0]?.discounted?.value.centAmount! / 100
  ).toFixed(2);

  const productCurrency = productData?.masterVariant.prices[0]?.value.currencyCode;
  const imagesUrls = getProductImages(productData);
  const colors = getProductColors(productData);
  const sizes = getProductSizes(productData);

  async function removeFromCart() {
    try {
      await removeProduct(props.cartData?.id, itemId, props.cartData?.version);
      notifyDel();
      dispatch({ type: 'addItem', payload: -1 });
      setInCart(false);
    } catch (error) {
      console.error('Error removing product:', error);
    }
  }

  return (
    <DetailedProductBlock>
      <ImageModal images={imagesUrls} open={openModal} setOpenModal={setOpenModal} />
      <ProductSlider>
        <SliderImages
          id="sliderImages"
          onClick={() => {
            setOpenModal(!openModal);
          }}
        >
          {imagesUrls.map((url, index) => (
            <SliderImage key={index} src={url} />
          ))}
        </SliderImages>
        <SliderNav>
          {imagesUrls.map((_, index) => (
            <li key={index} className={index === 0 ? 'active' : ''}></li>
          ))}
        </SliderNav>
        <img
          onClick={() => {
            setCurrentImage(turnSlides(imagesUrls, 'left', currentImage));
          }}
          src="../icons/arrow.png"
          alt="arrowIcon"
          className="leftArrow"
        />
        <img
          onClick={() => {
            setCurrentImage(turnSlides(imagesUrls, 'right', currentImage));
          }}
          src="../icons/arrow.png"
          alt="arrowIcon"
          className="rightArrow"
        />
      </ProductSlider>
      <ProductContent>
        <p>{productType}</p>
        <h1>{productData?.name.ru}</h1>
        <h2>Цена:</h2>
        <ProductPrice>
          {newPrice !== 'NaN' ? (
            <div>
              <span>
                {newPrice}
                {productCurrency}
              </span>
              <OldPrice>
                {productPrice}
                {productCurrency}
              </OldPrice>
            </div>
          ) : (
            <span>
              {productPrice}
              {productCurrency}
            </span>
          )}
        </ProductPrice>
        <h2>Описание товара:</h2>
        <h3>{productData?.description.ru}</h3>
        <ProductOptions style={{ display: `${sizes[0] && colors[0] ? 'flex' : 'none'}` }}>
          <div className="colors" style={{ display: `${colors[0] ? 'flex' : 'none'}` }}>
            <h2>Цвет:</h2>
            {colors.map((color, index) => (
              <span key={index}>
                <input name="color" type="radio" id={`cl${index}`} />
                <RadioLabel htmlFor={`cl${index}`} color={color} />
              </span>
            ))}
          </div>
          <div className="sizes" style={{ display: `${sizes[0] ? 'flex' : 'none'}` }}>
            <h2>Размер:</h2>
            {sizes.map((size, index) => (
              <span key={index}>
                <input name="size" type="radio" id={`s${index}`} />
                <label htmlFor={`s${index}`}>{size}</label>
              </span>
            ))}
          </div>
        </ProductOptions>
        <AddCartButton
          onClick={(e: Event) => handleAddToCart(e)}
          disabled={inCart}
          text="Добавить в корзину"
        />
        <RemoveBtn disabled={!inCart} onClick={removeFromCart}>
          Убратсь из корзины
        </RemoveBtn>
      </ProductContent>
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
    </DetailedProductBlock>
  );
};
