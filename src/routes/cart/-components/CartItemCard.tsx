import { UseMutationResult } from '@tanstack/react-query';
import { Cart } from '../-queryOptions';
import Checkbox from '../../../components/Checkbox/Checkbox';
import NumberInput from '../../../components/NumberInput/NumberInput';

interface Props {
  item: Cart;
  deleteItem: UseMutationResult<unknown, Error, number>;
}

function CartItemCard({ item, deleteItem }: Props) {
  const { name, imageUrl, price } = item.product;
  return (
    <div>
      <div className='cart-container'>
        <div className='flex gap-15 mt-10'>
          <Checkbox checked={true} onChange={() => {}} />
          <img className='w-144 h-144' src={imageUrl} alt={name} />
          <span className='cart-name'>{name}</span>
        </div>
        <div className='flex-col-center justify-end gap-15'>
          <img
            className='cart-trash-svg'
            src='./assets/svgs/trash.svg'
            alt='삭제'
            onClick={() => deleteItem.mutate(item.id)}
          />
          <NumberInput value={1} setValue={() => {}} />
          <span className='cart-price'>{price.toLocaleString()}원</span>
        </div>
      </div>
      <hr className='divide-line-thin mt-10' />
    </div>
  );
}

export default CartItemCard;
