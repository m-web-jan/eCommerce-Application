import { StyledFooter } from './style';

export const Footer = () => {
  return (
    <StyledFooter>
      <div className="container">
        <h2 className="logo">MotoMax</h2>
        <div className="social">
          <a href="https://www.instagram.com/motomaxbrest/" target="_blank">
            <img src="../icons/instagram.png" alt="socialIcon" />
          </a>
          <a href="https://vk.com/motoclubbrest" target="_blank">
            <img src="../icons/vk.png" alt="socialIcon" />
          </a>
          <a href="https://www.tiktok.com/@programist21" target="_blank">
            <img src="../icons/tiktok.png" alt="socialIcon" />
          </a>
          <a href="tel:+375 (29) 558-88-78" target="_blank">
            <img src="../icons/phone.png" alt="socialIcon" />
          </a>
        </div>
        <p className="bio">
          ООО «БайкерШоп»
          <br />
          УНП 291724220
        </p>
      </div>
    </StyledFooter>
  );
};
