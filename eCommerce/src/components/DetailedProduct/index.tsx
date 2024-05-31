import { useEffect, useState } from 'react';
import { getProductByKey } from '../../api/getProductByKey';
import { ICurrent } from '../../types';
import {
  AddButton,
  DetailedProductBlock,
  OldPrice,
  ProductContent,
  ProductOptions,
  ProductPrice,
  ProductSlider,
  SliderImage,
  SliderImages,
  SliderNav,
} from './style';
import { getProductImages } from './getImages';

export const DetailedProduct = ({ ...props }) => {
  const [productData, setProductData] = useState<ICurrent | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProductByKey(props.productKey);
        setProductData(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchData();
  }, []);

  let currentImg = 0;
  const turnSlides = (direction: 'left'|'right') => {
    const sliderImages = document.querySelector('#sliderImages') as HTMLElement;
    const firstImg = sliderImages.querySelector('img') as HTMLImageElement;
    const imageCount = imagesUrls.length - 1;

    if (direction ==='left') {
      currentImg = currentImg == 0 ? -imageCount : currentImg + 1;
      firstImg.style.marginLeft = `${currentImg * 280}px`;
    } else {
      currentImg = currentImg == -imageCount ? 0 : currentImg - 1;
      firstImg.style.marginLeft = `${currentImg * 280}px`;
    }
    changeActiveImg();
  };

  const changeActiveImg = () => {
    const indicates = document.querySelectorAll('li');
    for (let i = 0; i < indicates.length; i++) {
      indicates[i].classList.remove('active');
    }
    indicates[-currentImg].classList.add('active');
  };

  const productPrice = (productData?.masterVariant.prices[0]?.value.centAmount! / 100).toFixed(2);
  const newPrice = (
    productData?.masterVariant.prices[0]?.discounted?.value.centAmount! / 100
  ).toFixed(2);

  const productCurrency = productData?.masterVariant.prices[0]?.value.currencyCode;

  const imagesUrls = getProductImages(productData);

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
        <img onClick={() => {turnSlides('left')}} src="../icons/arrow.png" alt="arrowIcon" className='leftArrow' />
        <img onClick={() => {turnSlides('right')}} src="../icons/arrow.png" alt="arrowIcon" className='rightArrow' />
      </ProductSlider>
      <ProductContent>
        <p>Шлема</p>
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
        <ProductOptions>
          <div className="colors">
            <h2>Цвет:</h2>
            <input name="color" type="radio" id="cl1" />
            <label htmlFor="cl1" style={{ backgroundColor: 'black' }} />
            <input name="color" type="radio" id="cl2" />
            <label htmlFor="cl2" style={{ backgroundColor: 'white' }} />
            <input name="color" type="radio" id="cl3" />
            <label htmlFor="cl3" style={{ backgroundColor: 'red' }} />
            <input name="color" type="radio" id="cl4" />
            <label htmlFor="cl4" style={{ backgroundColor: 'green' }} />
          </div>
          <div className="sizes">
            <h2>Размер:</h2>
            <input name="size" type="radio" id="s1" />
            <label htmlFor="s1">S</label>
            <input name="size" type="radio" id="s2" />
            <label htmlFor="s2">M</label>
            <input name="size" type="radio" id="s3" />
            <label htmlFor="s3">L</label>
            <input name="size" type="radio" id="s4" />
            <label htmlFor="s4">XL</label>
          </div>
        </ProductOptions>
        <AddButton>Добавить в корзину</AddButton>
      </ProductContent>
    </DetailedProductBlock>
  );
};
