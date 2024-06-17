import styled from 'styled-components';

export const DetailedProductBlock = styled.div`
  width: 75%;
  @media (max-width: 768px) {
    width: 100%;
  }
  margin: 0 auto;
  display: flex;
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const ProductSlider = styled.div`
  @media (max-width: 768px) {
    width: 100%;
  }
  width: 50%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  position: relative;
  .leftArrow {
    filter: invert(1);
    width: 30px;
    position: absolute;
    transform: rotate(180deg);
    top: 40%;
    left: 10px;
    cursor: pointer;
  }
  .rightArrow {
    filter: invert(1);
    width: 30px;
    position: absolute;
    right: 10px;
    top: 40%;
    cursor: pointer;
  }
`;
export const SliderNav = styled.ol`
  list-style: none;
  display: flex;
  column-gap: 1rem;
  margin: 5rem auto 0 auto;
  @media (max-width: 768px) {
    margin: 2rem auto 2rem auto;
  }
  li {
    width: 35px;
    height: 5px;
    background-color: gray;
  }
  .active {
    background-color: black;
  }
`;
export const SliderImages = styled.div`
  cursor: pointer;
  display: flex;
  overflow: hidden;
  max-width: 250px;
  column-gap: 2rem;
  align-self: center;
  user-select: none;
`;
export const SliderImage = styled.img`
  align-self: center;
  max-width: 250px;
  transition: all.3s;
`;

export const ProductContent = styled.div`
  @media (max-width: 768px) {
    width: calc(100% - 2rem);
    padding: 1rem;
  }
  width: 50%;
  background-color: black;
  color: white;
  padding: 2rem;
  p {
    text-transform: uppercase;
    font-style: 14px;
    font-weight: 300;
  }
  h1 {
    font-size: 24px;
    margin-top: 14px;
  }
  h2 {
    font-size: 16px;
    font-weight: 400;
    margin-top: 2rem;
  }
  h3 {
    margin-top: 1rem;
    font-size: 14px;
    font-weight: 300;
  }
`;
export const ProductPrice = styled.div`
  margin-top: 0.5rem;
  font-size: 1.5rem;
  div {
    display: flex;
    column-gap: 1rem;
  }
`;
export const OldPrice = styled.span`
  color: gray;
  text-decoration: line-through;
`;
export const RadioLabel = styled.label`
  width: 20px;
  height: 20px;
  border-radius: 20px;
  box-shadow: inset 0 0 4px 0 rgba(0, 0, 0, 0.5);
  cursor: pointer;
  position: relative;
  z-index: 2;
  display: flex;
  background-color: ${(props) => props.color};
  color: ${(props) => props.color};
`;
export const ProductOptions = styled.div`
  max-width: 250px;
  background-color: white;
  margin-top: 1.5rem;
  padding: 1rem 0.5rem;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
  .colors {
    display: flex;
    align-items: center;
    h2 {
      color: black;
      margin: 0;
      align-self: center;
      font-weight: 500;
      margin-right: 3rem;
    }
    span {
      display: flex;
    }
    input[type='radio'] {
      opacity: 0;
      width: 12px;
    }
    input[type='radio']:checked + label {
      background-color: ${(props) => props.color};
      box-shadow:
        0 0 0 2px white,
        0 0 0 4px;
    }
  }
  .sizes {
    display: flex;
    align-items: center;
    h2 {
      color: black;
      margin: 0;
      align-self: center;
      font-weight: 500;
      margin-right: 1.5rem;
      @media (max-width: 768px) {
        margin: 0;
      }
    }
    span {
      display: flex;
    }
    label {
      font-size: 16px;
      color: black;
      cursor: pointer;
      font-weight: 500;
      position: relative;
    }
    input[type='radio'] {
      opacity: 0;
      width: 20px;
    }
    input[type='radio']:checked + label::after {
      content: '';
      width: 150%;
      height: 3px;
      position: absolute;
      background-color: black;
      bottom: -5px;
      left: -25%;
    }
  }
`;
export const RemoveBtn = styled.button`
  user-select: none;
  width: 100%;
  border-radius: 50px;
  margin-top: 1rem;
  text-align: center;
  padding: 10px 0;
  font-size: 16px;
  font-weight: 500;
  background-color: white;
  color: black;
  border: 2px solid white;
  transition: 0.3s;
  cursor: pointer;
  &:disabled {
    background-color: gray;
    border: 2px solid gray;
    pointer-events: none;
  }
  @media (hover: hover) {
    &:hover {
      color: white;
      background-color: black;
      transition: 0.3s;
    }
  }
`;
