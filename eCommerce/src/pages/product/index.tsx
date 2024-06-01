import { useParams } from "react-router-dom";
import { StyledContainer } from "./style";
import { DetailedProduct } from "../../components/DetailedProduct";

export const ProductPage = () => {
  const { productKey } = useParams<{ productKey: string }>();

  return (
    <StyledContainer>
      <DetailedProduct productKey={productKey} />
    </StyledContainer>
  )
}