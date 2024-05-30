import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductByKey } from "../../api/getProductByKey";
import { IResult } from "../../types";

export const ProductPage = () => {
  const [productData, setProductData] = useState<IResult | null>(null);
  const { productKey } = useParams<{ productKey: string }>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProductByKey(productKey!);
        setProductData(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchData();
  }, []);

  console.log(productData);

  return (
    <h1>{productKey}</h1>
  )
}