import { createFileRoute } from '@tanstack/react-router';
import { useSuspenseQuery } from '@tanstack/react-query';
import Checkbox from '../../components/Checkbox/Checkbox';
import Button from '../../components/Button/Button';
import NumberInput from '../../components/NumberInput/NumberInput';
import { cartItemQueryOptions } from './-queryOptions';

export const Cart = () => {
  const { data } = useSuspenseQuery(cartItemQueryOptions());

  return (
    <section className='cart-section'>
      <header className='flex-col-center mt-20'>
        <h2 className='cart-section__title'>장바구니</h2>
        <hr className='divide-line mt-20' />
      </header>

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
          {data.map(({ id, product }) => {
            return (
              <div key={id}>
                <div className='cart-container'>
                  <div className='flex gap-15 mt-10'>
                    <input
                      className='checkbox'
                      name='checkbox'
                      type='checkbox'
                      checked={true}
                      onChange={() => {}}
                    />
                    <img
                      className='w-144 h-144'
                      src={product.imageUrl}
                      alt={product.name}
                    />
                    <span className='cart-name'>{product.name}</span>
                  </div>
                  <div className='flex-col-center justify-end gap-15'>
                    <img
                      className='cart-trash-svg'
                      src='./assets/svgs/trash.svg'
                      alt='삭제'
                    />
                    <NumberInput value={1} setValue={() => {}} />
                    <span className='cart-price'>
                      {product.price.toLocaleString()}원
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
              <span className='highlight-text'>결제예상금액</span>
              <span className='highlight-text'>21,800원</span>
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
};

export const Route = createFileRoute('/cart/')({
  component: Cart,
  loader: ({ context }) =>
    context.queryClient.ensureQueryData(cartItemQueryOptions()),
});
