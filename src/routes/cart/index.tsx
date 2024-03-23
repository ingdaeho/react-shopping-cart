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
import CartItemCard from './-components/CartItemCard';

export const Route = createFileRoute('/cart/')({
  component: Cart,
  loader: ({ context }) =>
    context.queryClient.ensureQueryData(cartItemQueryOptions()),
});

function Cart() {
  const { data } = useSuspenseQuery(cartItemQueryOptions());
  const deleteCartItem = useDeleteCartItemMutation();

  return (
    <section className='cart-section'>
      <PageTitle>장바구니</PageTitle>
      <div className='flex'>
        <section className='cart-left-section'>
          <div className='flex justify-between items-center'>
            <Checkbox label='선택해제' checked={false} onChange={() => {}} />
            <Button variant='outlined' size='small'>
              상품삭제
            </Button>
          </div>
          <h3 className='cart-title'>든든배송 상품({data.length}개)</h3>
          <hr className='divide-line-gray mt-10' />
          {data.map((cartItem) => (
            <CartItemCard
              item={cartItem}
              key={cartItem.id}
              deleteItem={deleteCartItem}
            />
          ))}
        </section>
        <section className='cart-right-section'>
          <div className='cart-right-section__top'>
            <h3 className='cart-title'>결제예상금액</h3>
          </div>
          <hr className='divide-line-thin' />
          <div className='cart-right-section__bottom'>
            <div className='flex justify-between p-20 mt-20'>
              <HighlightText>결제예상금액</HighlightText>
              <HighlightText>21,800원</HighlightText>
            </div>
            <div className='flex-center mt-30 mx-10'>
              <Button
                className='flex-center'
                variant='contained'
                color='primary'
              >
                주문하기(3개)
              </Button>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}
