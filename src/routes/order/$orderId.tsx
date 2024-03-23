import { createFileRoute } from '@tanstack/react-router';
import { orderQueryOptions } from './-queryOptions';
import { useSuspenseQuery } from '@tanstack/react-query';
import Button from '../../components/Button/Button';

export const OrderDetail = () => {
  const { orderId } = Route.useParams();
  const { data } = useSuspenseQuery(orderQueryOptions(orderId));
  const { id, orderDetails } = data;

  const totalPrice = orderDetails.reduce((acc, cur) => acc + cur.price, 0);

  return (
    <section className='order-section'>
      <header className='flex-col-center mt-20'>
        <h2 className='order-section__title'>주문내역상세</h2>
        <hr className='divide-line mt-20' />
      </header>

      <div className='order-list'>
        <div className='order-list__header'>
          <span>주문번호: {id}</span>
          <span>상세보기 {'>'}</span>
        </div>
        {orderDetails.map(({ id, name, price, imageUrl }) => {
          return (
            <div className='order-list-item' key={id}>
              <div className='flex gap-15 mt-10'>
                <img className='w-144 h-144' src={imageUrl} alt={name} />
                <div className='flex-col gap-15'>
                  <span className='order-name'>{name}</span>
                  <span className='order-info'>
                    {price.toLocaleString()}원 / 수량: 3개
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
        })}
      </div>

      <div className='order-detail-container'>
        <div className='w-480'>
          <span className='order-detail-title'>결제금액 정보</span>
          <hr className='divide-line-thin my-20' />
          <div className='flex justify-between'>
            <span className='highlight-text'>총 결제금액</span>
            <span className='highlight-text'>
              {totalPrice.toLocaleString()}원
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export const Route = createFileRoute('/order/$orderId')({
  component: OrderDetail,
  loader: ({ context, params }) =>
    context.queryClient.ensureQueryData(orderQueryOptions(params.orderId)),
});
