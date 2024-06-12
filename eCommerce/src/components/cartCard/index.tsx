import styled from 'styled-components';
import { getTypeById } from '../../api/getTypeById';
import { useEffect, useState } from 'react';

const Card = styled.div`
  background-color: #dcdcdc;
  border-radius: 20px;
  padding: 1rem;
  display: flex;
  margin-top: 1rem;
  & > img {
    margin-right: 1rem;
    width: 150px;
    border-radius: 10px;
  }
  .content {
    h3 {
      font-size: 1.5rem;
      font-weight: 500;
      max-width: 250px;
    }
    h4 {
      font-size: 1rem;
      font-weight: 500;
    }
    .controls {
      display: flex;
      margin-top: 1rem;
      .countBtns {
        display: flex;
        column-gap: 1.5rem;
        background-color: white;
        border-radius: 10px;
        * {
          align-self: center;
        }
        img {
          width: 12px;
          cursor: pointer;
          padding: 0.5rem;
        }
      }
      .bin {
        margin-left: 5px;
        width: 30px;
        height: 30px;
        align-self: center;
        cursor: pointer;
      }
    }
  }
  .price {
    margin-left: auto;
    .price {
      font-size: 1.5rem;
    }
    .oldPrice {
      text-align: right;
      font-size: 1rem;
      color: gray;
      text-decoration: line-through;
    }
  }
`;

export const CartCard = ({ ...props }) => {
  const [typeData, setTypeData] = useState('');
  useEffect(() => {
    const fetchData = async () => {
      try {
        const typeData = await getTypeById(props.itemData?.productType?.id);
        setTypeData(typeData);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchData();
  }, []);

  let price = (props.itemData?.price?.value?.centAmount / 100).toFixed(2);
  let newPrice = (
    props.itemData?.price?.discounted?.value?.centAmount / 100
  ).toFixed(2);

  return (
    <Card>
      <img src={props.itemData?.variant?.images[0]?.url} alt="cardImage" />
      <div className="content">
        <h3>{props?.itemData?.name?.ru}</h3>
        <h4>{typeData}</h4>
        <div className="controls">
          <div className="countBtns">
            <img src="../icons/minus.png" alt="Icon" />
            <p>1</p>
            <img src="../icons/plus.png" alt="Icon" />
          </div>
          <img src="../icons/bin.png" alt="Icon" className="bin" />
        </div>
      </div>
      <div className="price">
        <p className="price">{price} BYN</p>
        {newPrice !== 'NaN' && <p className="oldPrice">{newPrice} BYN</p>}
      </div>
    </Card>
  );
};
