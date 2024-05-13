import { Dispatch, SetStateAction } from 'react';
import { useAddToCartMutation } from '../-hooks';
import CartIcon from '../../../assets/svgs/cart.svg?react';
import { Product } from '../../../types';

interface Props {
  product: Product;
  onClick: () => void;
  setShowSnackBar: Dispatch<SetStateAction<boolean>>;
}

const ProductCard = ({ product, onClick, setShowSnackBar }: Props) => {
  const { mutate } = useAddToCartMutation();
  const { name, price, imageUrl } = product;

  return (
    <div>
      <img
        src={imageUrl}
        alt={name}
        onClick={onClick}
        style={{ width: 280, height: 280, cursor: 'pointer' }}
      />
      <div className='flex justify-between w-280 p-5'>
        <div className='product-info'>
          <span className='product-info__name'>{name}</span>
          <span className='product-info__price'>
            {price.toLocaleString()}원
          </span>
        </div>
        <CartIcon
          style={{ cursor: 'pointer' }}
          onClick={() =>
            mutate(product, {
              onSuccess: () => setShowSnackBar(true),
            })
          }
        />
      </div>
    </div>
  );
};

export default ProductCard;
