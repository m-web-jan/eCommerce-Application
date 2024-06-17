import styled from 'styled-components';

export const Cart = styled.div`
  padding: 0 1rem;
  max-width: 600px;
  margin: 0 auto;
  &>.top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    h2 {
      font-size: 40px;
      margin: 3rem 0;
      span {
        color: gray;
        margin-left: 1rem;
        font-size: 2rem;
      }
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

export const Empty = styled.div`
  margin-top: 3rem;
  text-align: center;
  img {
    width: 300px;
    @media (max-width: 768px) {
      width: 200px;
    }
  }
  h2 {
    font-size: 2.5rem;
    @media (max-width: 768px) {
      font-size: 1.5rem;
    }
  }
  p {
    font-size: 2rem;
    color: gray;
    width: 70%;
    margin: 0 auto;
    @media (max-width: 768px) {
      font-size: 1rem;
    }
  }
  a {
    @media (max-width: 768px) {
      font-size: 1rem;
      margin-top: 1rem;
    }
    padding: .5rem 1rem;
    font-size: 20px;
    background-color: #FCC022;
    color: white;
    text-decoration: none;
    display: inline-block;
    margin-top: 2rem;
    border: 2px solid #FCC022;
    transition: all.3s;
    @media (hover: hover) {
      &:hover {
        transition: all.3s;
        background-color: white;
        color: #FCC022;
      }
    }
  }
`
