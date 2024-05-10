import { createFileRoute, useNavigate } from '@tanstack/react-router';
import Button from '../../components/Button/Button';
import { useSuspenseQuery } from '@tanstack/react-query';
import { orderListQueryOptions } from './-queryOptions';
import PageTitle from '../../components/PageTitle/PageTitle';
import { useModal } from '../../hooks/useModal';
import { useAddToCartMutation } from '../products/-hooks';
import CartModal from './-components/CartModal';

function Order() {
  const navigate = useNavigate();
  const { data } = useSuspenseQuery(orderListQueryOptions());
  const { isOpen, openModal, closeModal: handleClose, modalRef } = useModal();
  const { mutate } = useAddToCartMutation();

  return (
    <>
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
                      to: '/orderList/$orderId',
                      params: { orderId: order.id },
                    })
                  }
                >
                  상세보기 {'>'}
                </span>
              </div>
              {order.orderDetails.map((product) => {
                const { id, name, price, imageUrl, quantity } = product;
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
                      onClick={() => {
                        mutate(product, { onSuccess: () => openModal() });
                      }}
                    >
                      장바구니
                    </Button>
                  </div>
                );
              })}
            </div>
          );
        })}
      </section>
      <CartModal ref={modalRef} open={isOpen} onClose={handleClose} />
    </>
  );
}

export const Route = createFileRoute('/orderList/')({
  component: Order,
  loader: ({ context }) =>
    context.queryClient.ensureQueryData(orderListQueryOptions()),
  pendingComponent: () => <div />,
});
