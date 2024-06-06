import { IResult } from '../../types';
import { useEffect, useState } from 'react';
import { ProductCard } from '../../components/catalogCard';
import { Catalog, CatalogCards, CatalogMenu, MenuLogo } from './style';
import { allProducts } from '../../api/getAllProducts';
import { getProductsByCategory } from '../../api/getCategory';

export const CatalogPage = () => {
  const [catalogData, setCatalogData] = useState<IResult[] | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await allProducts();
        setCatalogData(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <Catalog>
      <CatalogMenu>
        <MenuLogo to="/">
          <img src="../../icons/lightLogo.png" alt="logoIcon" />
          <h2>MotoMax</h2>
        </MenuLogo>
        <p>Категории:</p>
        <ul>
          <li onClick={() => {getProductsByCategory('9b08692b-b2ec-4506-b0a1-8a2b759ba500')}}>Шлема</li>
          <li>Комбинезоны</li>
          <li>Боты</li>
          <li>Аксессуары</li>
        </ul>
      </CatalogMenu>
      <div className="container">
        <h1>Шлемы для мотоциклистов</h1>
        <p>
          Найдите идеальный шлем для вашего стиля езды. Защита и комфорт от ведущих производителей
          для безопасных и приятных поездок. От интегралов до модульных шлемов – все модели созданы
          с учетом высоких стандартов безопасности. Независимо от того, предпочитаете ли вы
          городские улицы или дальние путешествия, в нашем ассортименте найдутся шлемы, которые
          подойдут именно вам.
        </p>
        <CatalogCards>
          {catalogData &&
            catalogData.map((card, index) => (
              <ProductCard
                key={index}
                link={`/catalog/${card.key}`}
                cardData={card.masterData.current}
              />
            ))}
        </CatalogCards>
      </div>
    </Catalog>
  );
};
