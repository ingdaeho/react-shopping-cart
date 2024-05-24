import { createFileRoute } from '@tanstack/react-router';
import { orderQueryOptions } from './-queryOptions';
import { useSuspenseQuery } from '@tanstack/react-query';
import { z } from 'zod';
import Button from '../../components/Button/Button';
import PageTitle from '../../components/PageTitle/PageTitle';
import HighlightText from '../../components/HighlightText/HighlightText';
import { useAddToCartMutation } from '../products/-hooks';
import { useModal } from '../../hooks/useModal';
import CartModal from './-components/CartModal';
import * as styles from './order.css';

export const OrderDetail = () => {
  const { orderId } = Route.useParams();
  const { data } = useSuspenseQuery(orderQueryOptions(orderId));
  const { isOpen, openModal, closeModal: handleClose, modalRef } = useModal();
  const { mutate } = useAddToCartMutation();

  const totalPrice = data.orderDetails.reduce(
    (acc, { price, quantity }) => acc + price * quantity,
    0
  );

  return (
    <>
      <section className={styles.orderSectionContainer}>
        <PageTitle>주문내역상세</PageTitle>

        <div className={styles.orderContentSection}>
          <div className={styles.innerContainer}>
            <div className={styles.orderList}>
              <div className={styles.orderListHeader}>
                <span>주문번호: {data.id}</span>
              </div>
              {data.orderDetails.map((product) => {
                const { id, name, quantity, price, imageUrl } = product;
                return (
                  <div className={styles.orderListItem} key={id}>
                    <div className={styles.orderDetailPriceContainer}>
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
                      onClick={() =>
                        mutate(product, {
                          onSuccess: () => openModal(),
                        })
                      }
                    >
                      장바구니
                    </Button>
                  </div>
                );
              })}
            </div>

            <div className={styles.orderDetailContainer}>
              <div className={styles.orderTotalPriceText}>
                <span className={styles.orderDetailTitle}>결제금액 정보</span>
                <hr
                  className={styles.orderDivideThinLine}
                  style={{ marginTop: 20 }}
                />

                <div className={styles.orderContainer}>
                  <HighlightText>총 결제금액</HighlightText>
                  <HighlightText>{totalPrice.toLocaleString()}원</HighlightText>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <CartModal ref={modalRef} open={isOpen} onClose={handleClose} />
    </>
  );
};

export const Route = createFileRoute('/orderList/$orderId')({
  component: OrderDetail,
  parseParams: ({ orderId }) => ({
    orderId: z.number().int().parse(Number(orderId)),
  }),
  loader: ({ context, params }) =>
    context.queryClient.ensureQueryData(orderQueryOptions(params.orderId)),
  pendingComponent: () => <div />,
});
