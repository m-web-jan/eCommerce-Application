import styled from 'styled-components';

export const MainBanner = styled.div`
  width: 100%;
  background: url(../images/mainBanner.jpg) no-repeat center;
  background-size: cover;
  padding: 10rem 0 10rem 0;
  h1 {
    color: white;
    font-size: 6rem;
    text-align: center;
    @media (max-width: 768px) {
      font-size: 3rem;
    }
  }
  p {
    color: white;
    font-size: 1.5rem;
    margin: 1rem auto 2rem auto;
    max-width: 45rem;
    font-weight: 300;
    text-align: center;
    @media (max-width: 768px) {
      font-size: 1rem;
    }
  }
  a {
    text-decoration: none;
    text-align: center;
    padding: 1rem 0;
    color: white;
    font-size: 1rem;
    background-color: #FCC022;
    border-radius: 10px;
    display: block;
    width: 200px;
    margin: 0 auto;
    transition: all.3s;
    @media (hover: hover) {
      &:hover {
        background-color: #d29f1e;
        transition: all.3s;
      }
    }
  }
`;
export const Cards = styled.div`
  @media (max-width: 768px) {
    padding: 70px 0;
  }
  padding: 150px 2rem;
  max-width: 70rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  row-gap: 3rem;
  .card {
    &:nth-child(even) {
      flex-direction: row-reverse;
    }
    display: flex;
    justify-content: space-between;
    @media (max-width: 768px) {
      row-gap: 1rem;
      &:nth-child(even) {
        flex-direction: column;
      }
      flex-direction: column;
      & > div {
        margin: 0 auto;
        width: 80% !important;
      }
      .content {
        h2 {
          font-size: 2.5rem !important;
        }
      }
    }
    .image {
      align-self: center;
      width: 45%;
      border-radius: 10px;
      position: relative;
      .image-back {
        position: absolute;
        background-color: #FCC022;
        width: 100%;
        height: 100%;
        left: -20px;
        bottom: -20px;
        border-radius: 10px;
      }
      img {
        position: relative;
        z-index: 1;
        border-radius: 10px;
        width: 100%;
      }
    }
    .content {
      width: 45%;
      padding: 1rem 2rem 1rem 1rem;
      h2 {
        font-size: 3rem;
        padding-bottom: 0.5rem;
        border-bottom: 1px solid #FCC022;
      }
      p {
        margin-top: 1.5rem;
      }
    }
  }
`;
