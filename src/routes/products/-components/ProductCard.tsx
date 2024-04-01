import { Product, useAddToCartMutation } from '../-queryOptions';
import CartIcon from '../../../assets/svgs/cart.svg?react';

interface Props {
  product: Product;
  onClick: () => void;
}

const ProductCard = ({ product, onClick }: Props) => {
  const { mutate } = useAddToCartMutation();
  const { name, price, imageUrl } = product;
  return (
    <div>
      <img src={imageUrl} alt={name} onClick={onClick} />
      <div className='flex justify-between w-280 p-5'>
        <div className='product-info'>
          <span className='product-info__name'>{name}</span>
          <span className='product-info__price'>
            {price.toLocaleString()}원
          </span>
        </div>
        <CartIcon
          style={{ cursor: 'pointer' }}
          onClick={() => mutate(product)}
        />
      </div>
    </div>
  );
};

export default ProductCard;
