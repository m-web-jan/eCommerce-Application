import styled from 'styled-components';

export const Cart = styled.div`
  padding: 0 1rem;
  max-width: 600px;
  margin: 0 auto;
  &>h2 {
    font-size: 40px;
    margin: 3rem 0;
    span {
      color: gray;
      margin-left: 1rem;
      font-size: 2rem;
    }
  }
`;

export const PayBlock = styled.div`
  margin: 4rem 0;
  padding: 1rem;
  background-color: #DCDCDC;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  .content {
    display: flex;
    justify-content: space-between;
    .total {
      h2 {
        font-size: 2rem;
        font-weight: 500;
      }
    }
    .price {
      font-size: 2rem;
    }
  }
  button {
    width: 100%;
    margin: 0 auto;
    margin-top: 1rem;
    display: block;
    padding: 14px;
    font-size: 1rem;
    border-radius: 10px;
    border: none;
    cursor: pointer;
    background-color: black;
    color: white;
    transition: all.3s;
    @media (hover: hover) {
      &:hover {
        width: 95%;
        transition: all.3s;
      }
    }
  }
`