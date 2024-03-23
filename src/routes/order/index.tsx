import { createFileRoute, useNavigate } from '@tanstack/react-router';
import Button from '../../components/Button/Button';
import { useSuspenseQuery } from '@tanstack/react-query';
import { orderListQueryOptions } from './-queryOptions';
import PageTitle from '../../components/PageTitle/PageTitle';

export const Route = createFileRoute('/order/')({
  component: Order,
  loader: ({ context }) =>
    context.queryClient.ensureQueryData(orderListQueryOptions()),
});

function Order() {
  const navigate = useNavigate();
  const { data } = useSuspenseQuery(orderListQueryOptions());
  return (
    <section className='order-section'>
      <PageTitle>주문 목록</PageTitle>

      {data.map((order) => {
        return (
          <div className='order-list' key={order.id}>
            <div className='order-list__header'>
              <span>주문번호: {order.id}</span>
              <span
                style={{ cursor: 'pointer' }}
                onClick={() =>
                  navigate({
                    to: '/order/$orderId',
                    params: { orderId: order.id.toString() },
                  })
                }
              >
                상세보기 {'>'}
              </span>
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
}
