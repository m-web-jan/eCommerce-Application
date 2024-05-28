import styled from 'styled-components';

export const Catalog = styled.div`
.container {
  padding: 0 2rem;
  max-width: 90rem;
  margin: 0 auto;
  h2 {
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
  gap: 2rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;