import styled from 'styled-components';

export const DetailedProductBlock = styled.div`
  width: 75%;
  margin: 0 auto;
  display: flex;
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
`;

export const ProductSlider = styled.div`
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
export const ProductOptions = styled.div`
  width: 250px;
  background-color: white;
  margin-top: 1.5rem;
  padding: 1rem 0.5rem;
  border-radius: 10px;
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
    label {
      width: 20px;
      height: 20px;
      border-radius: 20px;
      box-shadow: inset 0 0 4px 0 rgba(0, 0, 0, 0.5);
      cursor: pointer;
      position: relative;
      z-index: 2;
    }
    input[type='radio'] {
      opacity: 0;
      width: 12px;
    }
    input[type='radio']:checked + label::before {
      content: '';
      width: 100%;
      height: 3px;
      position: absolute;
      background-color: black;
      bottom: -8px;
      left: 0;
      /* z-index: 1; */
    }
  }
  .sizes {
    display: flex;
    align-items: center;
    margin-top: 1rem;
    h2 {
      color: black;
      margin: 0;
      align-self: center;
      font-weight: 500;
      margin-right: 1.5rem;
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

export const AddButton = styled.div`
  margin-top: 3rem;
  text-align: center;
  padding: 10px 0;
  font-size: 16px;
  font-weight: 500;
  background-color: white;
  border-radius: 50px;
  color: black;
  border: 2px solid white;
  transition: 0.3s;
  cursor: pointer;
  @media (hover: hover) {
    &:hover {
      color: white;
      background-color: black;
      transition: 0.3s;
    }
  }
`;
