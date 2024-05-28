import { useSelector } from 'react-redux';
import { RootState } from '../../types';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { ProductCard } from '../../components/catalogCard';
import { Catalog, CatalogCards } from './style';

export const CatalogPage = () => {
  // const dispatch = useDispatch();
  // function changeState(type: string, value: string | boolean) {
  //   dispatch({ type: type, payload: value });
  // }

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
        <h2>Шлемы для мотоциклистов</h2>
        <p>
          Найдите идеальный шлем для вашего стиля езды. Защита и комфорт от ведущих производителей
          для безопасных и приятных поездок. От интегралов до модульных шлемов – все модели созданы
          с учетом высоких стандартов безопасности. Независимо от того, предпочитаете ли вы
          городские улицы или дальние путешествия, в нашем ассортименте найдутся шлемы, которые
          подойдут именно вам.
        </p>
        <CatalogCards>
          <ProductCard
            link="/"
            title="Bogotto FF391"
            description="Мотоциклетный шлем FF391 является идеальным компаньоном для каждой поездки и идеальной моделью начального уровня."
            image="../images/productImg1.png"
            price="150byn"
            newPrice=""
          />
          <ProductCard
            link="/"
            title="Bogotto FF391"
            description="Мотоциклетный шлем FF391 является идеальным компаньоном для каждой поездки и идеальной моделью начального уровня."
            image="../images/productImg1.png"
            price="150byn"
            newPrice=""
          />
          <ProductCard
            link="/"
            title="Bogotto FF391"
            description="Мотоциклетный шлем FF391 является идеальным компаньоном для каждой поездки и идеальной моделью начального уровня."
            image="../images/productImg1.png"
            price="150byn"
            newPrice=""
          />
          <ProductCard
            link="/"
            title="Bogotto FF391"
            description="Мотоциклетный шлем FF391 является идеальным компаньоном для каждой поездки и идеальной моделью начального уровня."
            image="../images/productImg1.png"
            price="150byn"
            newPrice=""
          />
          <ProductCard
            link="/"
            title="Bogotto FF391"
            description="Мотоциклетный шлем FF391 является идеальным компаньоном для каждой поездки и идеальной моделью начального уровня."
            image="../images/productImg1.png"
            price="150byn"
            newPrice=""
          />
          <ProductCard
            link="/"
            title="Bogotto FF391"
            description="Мотоциклетный шлем FF391 является идеальным компаньоном для каждой поездки и идеальной моделью начального уровня."
            image="../images/productImg1.png"
            price="150byn"
            newPrice=""
          />
          <ProductCard
            link="/"
            title="Bogotto FF391"
            description="Мотоциклетный шлем FF391 является идеальным компаньоном для каждой поездки и идеальной моделью начального уровня."
            image="../images/productImg1.png"
            price="150byn"
            newPrice=""
          />
          <ProductCard
            link="/"
            title="Bogotto FF391"
            description="Мотоциклетный шлем FF391 является идеальным компаньоном для каждой поездки и идеальной моделью начального уровня."
            image="../images/productImg1.png"
            price="150byn"
            newPrice=""
          />
          <ProductCard
            link="/"
            title="Bogotto FF391"
            description="Мотоциклетный шлем FF391 является идеальным компаньоном для каждой поездки и идеальной моделью начального уровня."
            image="../images/productImg1.png"
            price="150byn"
            newPrice=""
          />
          <ProductCard
            link="/"
            title="Bogotto FF391"
            description="Мотоциклетный шлем FF391 является идеальным компаньоном для каждой поездки и идеальной моделью начального уровня."
            image="../images/productImg1.png"
            price="150byn"
            newPrice=""
          />
        </CatalogCards>
      </div>
    </Catalog>
  );
};
