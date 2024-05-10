import { createFileRoute } from '@tanstack/react-router';
import { z } from 'zod';
import HighlightText from '../../components/HighlightText/HighlightText';
import PageTitle from '../../components/PageTitle/PageTitle';
import Button from '../../components/Button/Button';
import { orderQueryOptions } from '../orderList/-queryOptions';
import { useSuspenseQuery } from '@tanstack/react-query';
import { Fragment } from 'react/jsx-runtime';

export const Order = () => {
  const { orderId } = Route.useParams();
  const { data } = useSuspenseQuery(orderQueryOptions(orderId));

  const totalPrice = data.orderDetails.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  return (
    <section className='order-section'>
      <PageTitle>주문/결제</PageTitle>

      <div className='flex'>
        <section className='order-left-section'>
          <h3 className='order-title'>
            주문 상품({data.orderDetails.length}건)
          </h3>

          <hr className='divide-line-gray mt-10' />

          {data.orderDetails.map((product, index) => {
            const { id, name, quantity, imageUrl } = product;
            return (
              <Fragment key={id + index}>
                <div className='order-container'>
                  <div className='flex gap-15 mt-10'>
                    <img className='w-144 h-144' src={imageUrl} alt={name} />
                    <div className='flex-col gap-15'>
                      <span className='order-name'>{name}</span>
                      <span>수량: {quantity}</span>
                    </div>
                  </div>
                </div>
                <hr className='divide-line-thin mt-10' />
              </Fragment>
            );
          })}
        </section>

        <section className='order-right-section'>
          <div className='order-right-section__top'>
            <h3 className='order-title'>결제금액</h3>
          </div>
          <hr className='divide-line-thin' />
          <div className='order-right-section__bottom'>
            <div className='flex justify-between p-20 mt-20'>
              <HighlightText>총 결제금액</HighlightText>
              <HighlightText>{totalPrice.toLocaleString()}원</HighlightText>
            </div>
            <div className='flex-center mt-30 mx-10'>
              <Button
                variant='contained'
                color='primary'
                className='flex-center'
              >
                {totalPrice.toLocaleString()}원 결제하기
              </Button>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
};

export const Route = createFileRoute('/order/$orderId')({
  component: Order,
  parseParams: ({ orderId }) => ({
    orderId: z.number().int().parse(Number(orderId)),
  }),
  loader: ({ context, params }) =>
    context.queryClient.ensureQueryData(orderQueryOptions(params.orderId)),
  pendingComponent: () => <div />,
});
