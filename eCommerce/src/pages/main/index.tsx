import { Link } from 'react-router-dom';
import { Cards, MainBanner, Supply } from './style';

export const MainPage = () => {
  return (
    <div>
      <MainBanner>
        <h1>MotoMax</h1>
        <p>
          В нашем магазине есть всё для комфортной и безопасной езды. Широкий ассортимент
          мотоэкипировки от мировых брендов.
        </p>
        <Link to="/catalog">Перейти в каталог</Link>
      </MainBanner>
      <Supply>
        <h2>Новые поступления</h2>
        <div className="video">
          <video src="../deliveryOfGoods.mp4" autoPlay loop muted></video>
          <div className="blur"></div>
          <p className="content">
            <b>03.07.2024 КРУПНАЯ ПОСТАВКА</b>
            <br />
            ШЛЕМОВ THUNDER 4
            <br />
            <b>07.07.2024 БОЛЬШАЯ ПОСТАВКА</b>
            <br />
            МОТОЭКИПИРОВКИ
            <br />
            <b>15.07.2024 ПОСТАВКА РАСХОДНИКОВ</b>
            <br />
            МАСЛА, ФИЛЬТРА, СМАЗКА ЦЕПИ
          </p>
        </div>
      </Supply>
      <Cards>
        <div className="card">
          <div className="image">
            <div className="image-back"></div>
            <img src="../images/helmet.jpg" alt="cardImage" />
          </div>
          <div className="content">
            <h2 className="title">Шлемы</h2>
            <p>
              Защита головы – основа вашей безопасности на дороге. В нашем ассортименте вы найдете
              шлемы различных типов и дизайнов, подходящие как для новичков, так и для опытных
              байкеров.
            </p>
          </div>
        </div>
        <div className="card">
          <div className="image">
            <div className="image-back"></div>
            <img src="../images/suit.jpg" alt="cardImage" />
          </div>
          <div className="content">
            <h2 className="title">Комбинезоны</h2>
            <p>
              Максимальная защита и комфорт в одном комплекте. Наши мотокомбинезоны обеспечивают
              высокую защиту и удобство при езде. Разработаны с учетом самых современных технологий
              и материалов.
            </p>
          </div>
        </div>
        <div className="card">
          <div className="image">
            <div className="image-back"></div>
            <img src="../images/boots.jpg" alt="cardImage" />
          </div>
          <div className="content">
            <h2 className="title">Боты</h2>
            <p>
              Прочные и удобные боты для любой погоды и условий. Наши модели гарантируют отличную
              защиту и комфорт для ваших ног на протяжении всей поездки.
            </p>
          </div>
        </div>
      </Cards>
    </div>
  );
};
