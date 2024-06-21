import { useParams } from "react-router-dom";
import { StyledContainer } from "./style";
import { useEffect, useState } from "react";
import { getMyActiveCart } from "../../api/cart/getMyActiveCart";
import { DetailedProduct } from "../../components/DetailedProduct";

export const ProductPage = () => {
  const [cartData, setCartData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getMyActiveCart();
        setCartData(response);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchData();
  }, []);


  const { productKey } = useParams<{ productKey: string }>();

  return (
    <StyledContainer>
      {cartData ? (
        <DetailedProduct productKey={productKey} cartData={cartData} />
      ) : (
        <p>Загрузка...</p>
      )}
    </StyledContainer>
  )
}