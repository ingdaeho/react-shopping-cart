import { createFileRoute } from '@tanstack/react-router';
import { z } from 'zod';
import HighlightText from '../../components/HighlightText/HighlightText';
import PageTitle from '../../components/PageTitle/PageTitle';
import Button from '../../components/Button/Button';
import { orderQueryOptions } from '../orderList/-queryOptions';
import { Fragment } from 'react/jsx-runtime';
import * as styles from '../orderList/order.css';

export const Order = () => {
  const data = Route.useLoaderData();

  const totalPrice = data.orderDetails.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <section className={styles.orderSectionContainer}>
      <PageTitle>주문/결제</PageTitle>

      <div className={styles.orderContentSection}>
        <section className={styles.orderSection}>
          <section className={styles.orderLeftSection}>
            <h3 className={styles.orderTitle}>
              주문 상품({data.orderDetails.length}건)
            </h3>

            <hr className={styles.orderDivideLine} style={{ marginTop: 10 }} />

            {data.orderDetails.map((product, index) => {
              const { id, name, quantity, imageUrl } = product;
              return (
                <Fragment key={id + index}>
                  <div className={styles.orderContainer}>
                    <div className={styles.orderInfoContainer}>
                      <img
                        className={styles.orderItemImage}
                        src={imageUrl}
                        alt={name}
                      />
                      <div className={styles.orderItemInfoContainer}>
                        <span className={styles.orderName}>{name}</span>
                        <span>수량: {quantity}</span>
                      </div>
                    </div>
                  </div>
                  <hr
                    className={styles.orderDivideThinLine}
                    style={{ marginTop: 10 }}
                  />
                </Fragment>
              );
            })}
          </section>

          <section className={styles.orderRightSection}>
            <div className={styles.orderRightSectionTop}>
              <h3 className={styles.orderTitle}>결제금액</h3>
            </div>
            <hr className={styles.orderDivideThinLine} />
            <div>
              <div className={styles.orderTotalPrice}>
                <HighlightText>총 결제금액</HighlightText>
                <HighlightText>{totalPrice.toLocaleString()}원</HighlightText>
              </div>
              <div className={styles.orderButtonContainer}>
                <Button
                  variant='contained'
                  color='primary'
                  className={styles.orderButton}
                >
                  {totalPrice.toLocaleString()}원 결제하기
                </Button>
              </div>
            </div>
          </section>
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
