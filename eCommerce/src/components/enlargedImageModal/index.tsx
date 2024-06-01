import styled from 'styled-components';

const StyledModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 11;
  display: flex;
  justify-content: center;
  padding-top: calc(50vh - 225px);
  backdrop-filter: blur(4px);
  .arrow:nth-child(2) {
    transform: rotate(180deg);
  }
  .arrow {
    @media (max-width: 768px) {
      margin-top: calc(35% - 50px);
    }
    margin-top: calc(450px / 2 - 50px);
    width: 50px;
    height: 50px;
    cursor: pointer;
  }
  .slider {
    max-width: 450px;
    max-height: 450px;
    overflow: hidden;
    .sliderImages {
      display: flex;
      img {
        transition: 0.3s;
        width: 100%;
        height: fit-content;
      }
    }
  }
  .closeBtn {
    @media (max-width: 768px) {
      margin-left: 250px;
    }
    margin-top: -50px;
    margin-left: 500px;
    width: 50px;
    height: 50px;
    position: absolute;
    cursor: pointer;
  }
`;

export const ImageModal = ({ ...props }) => {
  let current = 0;
  const turnSlides = (imagesUrls: string[], direction: 'left' | 'right') => {
    const modalImages = document.querySelector('#modalImages') as HTMLElement;
    const firstImg = modalImages.querySelector('img') as HTMLImageElement;
    const imageCount = imagesUrls.length - 1;

    if (direction === 'left') {
      current = current == 0 ? -imageCount : current + 1;
      firstImg.style.marginLeft = `${current * 100}%`;
    } else {
      current = current == -imageCount ? 0 : current - 1;
      firstImg.style.marginLeft = `${current * 100}%`;
    }
  };

  return (
    <StyledModal style={{ display: `${props.open ? 'flex' : 'none'}` }}>
      <img
        onClick={() => {
          props.setOpenModal(false);
        }}
        src="../icons/close.png"
        alt="closeBtn"
        className="closeBtn"
      />
      <img
        onClick={() => {
          turnSlides(props.images, 'left');
        }}
        src="../icons/arrow.png"
        alt="sliderArrow"
        className="arrow"
      />
      <div className="slider">
        <div className="sliderImages" id="modalImages">
          {props.images?.map((url: string, index: number) => (
            <img key={index} src={url} alt="sliderImage" />
          ))}
        </div>
      </div>
      <img
        onClick={() => {
          turnSlides(props.images, 'right');
        }}
        src="../icons/arrow.png"
        alt="sliderArrow"
        className="arrow"
      />
    </StyledModal>
  );
};
