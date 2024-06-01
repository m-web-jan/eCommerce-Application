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
  SliderImage,
  SliderImages,
  SliderNav,
} from './style';
import { getProductImages } from './getImages';
import { getTypeById } from '../../api/getTypeById';
import { turnSlides } from './turnSlider';
import { getProductColors, getProductSizes } from './getAttributes';
import { AddCartButton } from '../addButton';

export const DetailedProduct = ({ ...props }) => {
  const [productData, setProductData] = useState<ICurrent | null>(null);
  const [productType, setProductType] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [data, id] = await getProductByKey(props.productKey);
        setProductData(data);
        const typeData = await getTypeById(id);
        setProductType(typeData);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchData();
  }, []);

  const productPrice = (productData?.masterVariant.prices[0]?.value.centAmount! / 100).toFixed(2);
  const newPrice = (
    productData?.masterVariant.prices[0]?.discounted?.value.centAmount! / 100
  ).toFixed(2);

  const productCurrency = productData?.masterVariant.prices[0]?.value.currencyCode;
  const imagesUrls = getProductImages(productData);
  const colors = getProductColors(productData);
  const sizes = getProductSizes(productData);
  console.log(sizes);

  return (
    <DetailedProductBlock>
      <ProductSlider>
        <SliderImages id="sliderImages">
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
            turnSlides(imagesUrls, 'left');
          }}
          src="../icons/arrow.png"
          alt="arrowIcon"
          className="leftArrow"
        />
        <img
          onClick={() => {
            turnSlides(imagesUrls, 'right');
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
        <ProductOptions style={{ display: `${(sizes[0] && colors[0]) ? 'flex' : 'none'}` }}>
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
        <AddCartButton text="Добавить в корзину" />
      </ProductContent>
    </DetailedProductBlock>
  );
};
