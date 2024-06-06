import { IResult } from '../../types';
import { useEffect, useState } from 'react';
import { ProductCard } from '../../components/catalogCard';
import { Catalog, CatalogCards, CatalogMenu, MenuLogo } from './style';
import { allProducts } from '../../api/getAllProducts';
import { getProductsByCategory } from '../../api/getCategory';
import { getCategoryByKey } from '../../api/getCategoryByKey';

export const CatalogPage = () => {
  const [catalogData, setCatalogData] = useState<IResult[] | null>(null);
  const [openCategoryMenu, setOpenCategoryMenu] = useState(false);
  const [catalogTitle, setCatalogTitle] = useState('Мотоэкипировка');
  const [catalogText, setCatalogText] = useState(
    'В нашем интернет-магазине вы найдете всё необходимое для безопасной и комфортной езды: шлемы, мотокомбинезоны, боты и аксессуары. Мы предлагаем высококачественную мотоэкипировку от ведущих брендов, чтобы вы могли наслаждаться каждой поездкой, зная, что вы надежно защищены. Откройте для себя мир мотоэкипировки с MotoMax!'
  );
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

  const changeCategory = (categoryKey: string) => {
    const fetchData = async () => {
      try {
        const categoryData = await getCategoryByKey(categoryKey);
        setCatalogTitle(categoryData?.name?.ru);
        setCatalogText(categoryData?.description?.ru);
        const data = await getProductsByCategory(categoryData?.id);
        setCatalogData(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchData();
  };

  const categories = [
    { text: 'Шлема', key: 'helmet' },
    { text: 'Комбинезоны', key: 'suits' },
    { text: 'Боты', key: 'boots' },
    { text: 'Аксессуары', key: 'accessories' },
  ];

  return (
    <Catalog>
      <CatalogMenu isOpen={openCategoryMenu} onClick={() => {setOpenCategoryMenu(!openCategoryMenu)}}>
        <MenuLogo to="/">
          <img src="../../icons/lightLogo.png" alt="logoIcon" />
          <h2>MotoMax</h2>
        </MenuLogo>
        <p>Категории:</p>
        <ul>
          {categories.map((category, index) => (
            <li
              key={index}
              onClick={() => {
                changeCategory(category.key);
              }}
            >
              {category.text}
            </li>
          ))}
        </ul>
      </CatalogMenu>
      <div className="container">
        <p className='categories' onClick={() => {setOpenCategoryMenu(!openCategoryMenu)}}>Категории</p>
        <h1>{catalogTitle}</h1>
        <p>{catalogText}</p>
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
