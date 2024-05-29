import styled from 'styled-components';

export const Catalog = styled.div`
.container {
  padding: 0 2rem;
  max-width: 90rem;
  margin: 0 auto;
  h1 {
    margin-top: 3rem;
    font-size: 40px;
    text-transform: uppercase;
    font-style: italic;
  }
  p {
    font-size: 1rem;
    max-width: 57rem;
    margin-bottom: 3rem;
  }
}
`;

export const CatalogCards = styled.div`
  margin-bottom: 2rem;
  gap: 2rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;