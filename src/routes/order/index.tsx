import { createFileRoute } from '@tanstack/react-router';
import Button from '../../components/Button/Button';
import { useSuspenseQuery } from '@tanstack/react-query';
import { orderListQueryOptions } from './-queryOptions';

export const Order = () => {
  const { data } = useSuspenseQuery(orderListQueryOptions());
  return (
    <section className='order-section'>
      <header className='flex-col-center mt-20'>
        <h2 className='order-section__title'>주문 목록</h2>
        <hr className='divide-line mt-20' />
      </header>

      {data.map((order) => {
        return (
          <div className='order-list'>
            <div className='order-list__header'>
              <span>주문번호: {order.id}</span>
              <span>상세보기 {'>'}</span>
            </div>
            {order.orderDetails.map(
              ({ id, name, price, quantity, imageUrl }) => {
                return (
                  <div className='order-list-item' key={id}>
                    <div className='flex gap-15 mt-10'>
                      <img className='w-144 h-144' src={imageUrl} alt={name} />
                      <div className='flex-col gap-15'>
                        <span className='order-name'>{name}</span>
                        <span className='order-info'>
                          {price.toLocaleString()}원 / 수량: {quantity}개
                        </span>
                      </div>
                    </div>
                    <Button
                      variant='contained'
                      color='primary'
                      size='small'
                      className='flex-center self-start'
                    >
                      장바구니
                    </Button>
                  </div>
                );
              }
            )}
          </div>
        );
      })}
    </section>
  );
};

export const Route = createFileRoute('/order/')({
  component: Order,
  loader: ({ context }) =>
    context.queryClient.ensureQueryData(orderListQueryOptions()),
});