import { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { useSuspenseQuery } from '@tanstack/react-query';
import Checkbox from '../../components/Checkbox/Checkbox';
import Button from '../../components/Button/Button';
import {
  cartItemQueryOptions,
  useDeleteCartItemMutation,
} from './-queryOptions';
import PageTitle from '../../components/PageTitle/PageTitle';
import HighlightText from '../../components/HighlightText/HighlightText';
import { useSelectItems } from './-hooks/useSelectItems';
import NumberInput from '../../components/NumberInput/NumberInput';

export const Route = createFileRoute('/cart/')({
  component: Cart,
  loader: ({ context }) =>
    context.queryClient.ensureQueryData(cartItemQueryOptions()),
});

function Cart() {
  const { data } = useSuspenseQuery(cartItemQueryOptions());
  const [cartItems, setCartItems] = useState(data);

  const deleteCartItem = useDeleteCartItemMutation();
  const {
    isAllSelected,
    selectedItems,
    toggleOrderSelection,
    toggleAllItemsSelection,
  } = useSelectItems(cartItems);

  const totalAmount = cartItems.reduce((acc, { id, product }) => {
    if (selectedItems[id]) {
      return acc + product.price * (product.quantity || 1);
    }
    return acc;
  }, 0);

  const handleQuantityChange = (id: number, newQuantity: number) => {
    setCartItems(
      cartItems.map((cartItem) =>
        cartItem.id === id
          ? {
              ...cartItem,
              product: { ...cartItem.product, quantity: newQuantity },
            }
          : cartItem
      )
    );
  };

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
            const { name, imageUrl, price, quantity } = cartItem.product;
            return (
              <div key={cartItem.id}>
                <div className='cart-container'>
                  <div className='flex gap-15 mt-10'>
                    <Checkbox
                      checked={!!selectedItems[cartItem.id]}
                      onChange={() => toggleOrderSelection(cartItem.id)}
                    />
                    <img className='w-144 h-144' src={imageUrl} alt={name} />
                    <span className='cart-name'>{name}</span>
                  </div>
                  <div className='flex-col-center justify-end gap-15'>
                    <img
                      className='cart-trash-svg'
                      src='./assets/svgs/trash.svg'
                      alt='삭제'
                      onClick={() => deleteCartItem.mutate(cartItem.id)}
                    />
                    <NumberInput
                      value={quantity || 1}
                      onChange={(newQuantity) =>
                        handleQuantityChange(cartItem.id, newQuantity)
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
                주문하기({Object.values(selectedItems).filter(Boolean).length}
                개)
              </Button>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}
