import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Block = styled.div`
  display: flex;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const BlockImg = styled.img`
  border-radius: 20px 0 0 20px;
`;

export const BlockContent = styled.div`
  position: relative;
  border-radius: 0 20px 20px 0;
  background-color: #d3d3d3;
  text-align: center;
  padding: 1rem 2rem;
`;

export const Logo = styled.div`
  display: flex;
  justify-content: center;
  column-gap: 0.625rem;
  img {
    align-self: center;
  }
  h2 {
    align-self: center;
    font-size: 0.75rem;
  }
`;

export const Title = styled.h1`
  font-size: 1.5rem;
  text-align: center;
  margin-top: 6rem;
  width: 16rem;
`;

export const SubTitle = styled.p`
  font-size: 0.75rem;
  font-weight: 300;
  text-align: center;
  margin-top: 1rem;
  width: 16rem;
`;

export const StyledLink = styled(Link)`
  font-size: 0.75rem;
  font-weight: 800;
  text-align: center;
  color: black;
  text-decoration: none;
  margin-top: 2rem;
  position: relative;
  padding-bottom: 0.5rem;
  &:after {
    position: absolute;
    content: '';
    bottom: 0;
    display: block;
    width: 0;
    height: 3px;
    background: black;
    transition: 0.3s;
    left: 50%;
    transform: translate(-50%);
  }
  &:hover:after {
    width: 100%;
  }
`;

export const MarginTop = styled.div`
  margin-top: 2rem;
`;

export const Code = styled.p`
  font-weight: 300;
  font-size: 0.625rem;
  position: absolute;
  bottom: 1rem;
  left: 0;
  right: 0;
`;
