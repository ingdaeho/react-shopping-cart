import { createFileRoute, useNavigate } from '@tanstack/react-router';
import Button from '../../components/Button/Button';
import { orderListQueryOptions } from './-queryOptions';
import PageTitle from '../../components/PageTitle/PageTitle';
import { useModal } from '../../hooks/useModal';
import { useAddToCartMutation } from '../products/-hooks';
import CartModal from './-components/CartModal';
import * as styles from './order.css';

function Order() {
  const navigate = useNavigate();
  const data = Route.useLoaderData();
  const { isOpen, openModal, closeModal: handleClose, modalRef } = useModal();
  const { mutate } = useAddToCartMutation();

  return (
    <>
      <section className={styles.orderSectionContainer}>
        <PageTitle>주문 목록</PageTitle>

        <div className={styles.orderContentSection}>
          <div className={styles.innerContainer}>
            {data.map((order) => {
              return (
                <div className={styles.orderList} key={order.id}>
                  <div className={styles.orderListHeader}>
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
                      <div className={styles.orderListItem} key={id}>
                        <div className={styles.orderInfoContainer}>
                          <img
                            className={styles.orderItemImage}
                            src={imageUrl}
                            alt={name}
                          />
                          <div className={styles.orderItemInfoContainer}>
                            <span className={styles.orderName}>{name}</span>
                            <span className={styles.orderInfo}>
                              {price.toLocaleString()}원 / 수량: {quantity}개
                            </span>
                          </div>
                        </div>
                        <Button
                          variant='contained'
                          color='primary'
                          size='small'
                          className={styles.orderButton}
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
          </div>
        </div>
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
