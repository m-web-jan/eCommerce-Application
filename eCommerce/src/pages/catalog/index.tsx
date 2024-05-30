import { useSelector } from 'react-redux';
import { IResult, RootState } from '../../types';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ProductCard } from '../../components/catalogCard';
import { Catalog, CatalogCards } from './style';
import { allProducts } from '../../api/getAllProducts';


export const CatalogPage = () => {
  const [catalogData, setCatalogData] = useState<IResult[] | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await allProducts();
        setCatalogData(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchData();
  }, []);

  const navigate = useNavigate();
  const authSelector = (state: RootState) => state.auth;
  const states = useSelector((state: RootState) => authSelector(state));
  useEffect(() => {
    if (!states.isLogged) {
      navigate('/login');
    }
  }, [navigate]);


  return (
    <Catalog>
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
          {catalogData && catalogData.map((card, index) => (
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
