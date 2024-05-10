import { useEffect } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { useSuspenseQuery } from '@tanstack/react-query';
import Checkbox from '../../components/Checkbox/Checkbox';
import Button from '../../components/Button/Button';
import { cartItemQueryOptions } from './-queryOptions';
import PageTitle from '../../components/PageTitle/PageTitle';
import HighlightText from '../../components/HighlightText/HighlightText';
import { useSelectItems } from './-hooks/useSelectItems';
import NumberInput from '../../components/NumberInput/NumberInput';
import TrashIcon from '../../assets/svgs/trash.svg?react';
import { useDeleteCartItem } from './-hooks';
import { useCartStore } from '../../store/cart';

function Cart() {
  const { data } = useSuspenseQuery(cartItemQueryOptions());
  const cartItems = useCartStore((state) => state.items);
  const setItems = useCartStore((state) => state.setItems);
  const handleQuantity = useCartStore((state) => state.handleQuantity);

  const deleteCartItem = useDeleteCartItem();
  const {
    isAllSelected,
    selectedItems,
    toggleItemSelection,
    toggleAllItemsSelection,
  } = useSelectItems();

  const totalAmount = cartItems.reduce((acc, { id, price, quantity }) => {
    if (selectedItems.has(id)) {
      return acc + price * (quantity || 1);
    }
    return acc;
  }, 0);

  useEffect(() => {
    setItems(data);
  }, [data]);

  return (
    <section className='cart-section'>
      <PageTitle>장바구니</PageTitle>
      <div className='flex'>
        <section className='cart-left-section'>
          <div className='flex justify-between items-center'>
            <Checkbox
              label='선택해제'
              checked={isAllSelected}
              onChange={toggleAllItemsSelection}
            />
            <Button variant='outlined' size='small'>
              상품삭제
            </Button>
          </div>
          <h3 className='cart-title'>든든배송 상품({data.length}개)</h3>
          <hr className='divide-line-gray mt-10' />

          {cartItems.map((cartItem) => {
            const { name, imageUrl, price, quantity } = cartItem;
            return (
              <div key={cartItem.id}>
                <div className='cart-container'>
                  <div className='flex gap-15 mt-10'>
                    <Checkbox
                      checked={selectedItems.has(cartItem.id)}
                      onChange={() => toggleItemSelection(cartItem.id)}
                    />
                    <img className='w-144 h-144' src={imageUrl} alt={name} />
                    <span className='cart-name'>{name}</span>
                  </div>
                  <div className='flex-col-center justify-end gap-15'>
                    <TrashIcon
                      className='cart-trash-svg'
                      onClick={() => deleteCartItem.mutate(cartItem.id)}
                    />
                    <NumberInput
                      value={quantity || 1}
                      onChange={(newQuantity) =>
                        handleQuantity(cartItem.id, newQuantity)
                      }
                    />
                    <span className='cart-price'>
                      {price.toLocaleString()}원
                    </span>
                  </div>
                </div>
                <hr className='divide-line-thin mt-10' />
              </div>
            );
          })}
        </section>
        <section className='cart-right-section'>
          <div className='cart-right-section__top'>
            <h3 className='cart-title'>결제예상금액</h3>
          </div>
          <hr className='divide-line-thin' />
          <div className='cart-right-section__bottom'>
            <div className='flex justify-between p-20 mt-20'>
              <HighlightText>결제예상금액</HighlightText>
              <HighlightText>{totalAmount.toLocaleString()}원</HighlightText>
            </div>
            <div className='flex-center mt-30 mx-10'>
              <Button
                className='flex-center'
                variant='contained'
                color='primary'
              >
                주문하기({selectedItems.size}개)
              </Button>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}

export const Route = createFileRoute('/cart/')({
  component: Cart,
  loader: ({ context }) =>
    context.queryClient.ensureQueryData(cartItemQueryOptions()),
  pendingComponent: () => <div />,
});
