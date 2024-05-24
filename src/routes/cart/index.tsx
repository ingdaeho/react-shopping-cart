import { useEffect } from 'react';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import Checkbox from '../../components/Checkbox/Checkbox';
import Button from '../../components/Button/Button';
import { cartItemQueryOptions } from './-queryOptions';
import PageTitle from '../../components/PageTitle/PageTitle';
import HighlightText from '../../components/HighlightText/HighlightText';
import NumberInput from '../../components/NumberInput/NumberInput';
import TrashIcon from '../../assets/svgs/trash.svg?react';
import {
  useCreateOrder,
  useDeleteCartItem,
  useDeleteSelectedItems,
} from './-hooks';
import { useCartStore } from '../../store/cart';
import { useModal } from '../../hooks/useModal';
import DeleteConfirmModal from './-components/DeleteConfirmModal';
import OrderConfirmModal from './-components/OrderConfirmModal';
import * as styles from './cart.css';

function Cart() {
  const navigate = useNavigate();
  const data = Route.useLoaderData();
  const cartItems = useCartStore((state) => state.items);
  const setItems = useCartStore((state) => state.setItems);
  const handleQuantity = useCartStore((state) => state.handleQuantity);

  const isAllSelected = useCartStore((state) => state.isAllSelected);
  const selectedItems = useCartStore((state) => state.selectedItems);
  const toggleAllItemsSelection = useCartStore(
    (state) => state.toggleAllItemsSelection
  );
  const toggleItemSelection = useCartStore(
    (state) => state.toggleItemSelection
  );

  const {
    isOpen: isDeleteModalOpen,
    openModal: openDeleteModal,
    closeModal: handleCloseDeleteModal,
    modalRef: deleteModalRef,
  } = useModal();

  const {
    isOpen: isOrderModalOpen,
    openModal: openOrderModal,
    closeModal: handleCloseOrderModal,
    modalRef: orderModalRef,
  } = useModal();

  const deleteCartItem = useDeleteCartItem();
  const deleteSelectedItems = useDeleteSelectedItems();
  const createOrder = useCreateOrder();

  const totalAmount = cartItems.reduce((acc, { id, price, quantity }) => {
    if (selectedItems.has(id)) return acc + price * (quantity || 1);
    return acc;
  }, 0);

  useEffect(() => {
    setItems(data);
  }, [data]);

  return (
    <>
      <section className={styles.cartSectionContainer}>
        <PageTitle>장바구니</PageTitle>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div className={styles.cartSection}>
            <section className={styles.cartLeftSection}>
              <div className={styles.cartItemCheck}>
                <Checkbox
                  label='선택해제'
                  checked={isAllSelected}
                  onChange={toggleAllItemsSelection}
                />
                <Button
                  variant='outlined'
                  size='small'
                  onClick={openDeleteModal}
                >
                  상품삭제
                </Button>
              </div>
              <h3 className={styles.cartTitle}>
                든든배송 상품({cartItems.length}개)
              </h3>

              <hr className={styles.cartDivideLine} style={{ marginTop: 10 }} />

              {cartItems.map((cartItem) => {
                const { name, imageUrl, price, quantity } = cartItem;
                return (
                  <div key={cartItem.id}>
                    <div className={styles.cartContainer}>
                      <div className={styles.cartItemLeftSection}>
                        <Checkbox
                          checked={selectedItems.has(cartItem.id)}
                          onChange={() => toggleItemSelection(cartItem.id)}
                        />
                        <img
                          className={styles.cartItemImage}
                          src={imageUrl}
                          alt={name}
                        />
                        <span className={styles.cartName}>{name}</span>
                      </div>
                      <div className={styles.cartItemRightSection}>
                        <TrashIcon
                          className={styles.cartTrashSvg}
                          onClick={() => deleteCartItem.mutate(cartItem.id)}
                        />
                        <NumberInput
                          value={quantity || 1}
                          onChange={(newQuantity) =>
                            handleQuantity(cartItem.id, newQuantity)
                          }
                        />
                        <span className={styles.cartPrice}>
                          {price.toLocaleString()}원
                        </span>
                      </div>
                    </div>
                    <hr
                      className={styles.cartDivideLineThin}
                      style={{ marginTop: 10 }}
                    />
                  </div>
                );
              })}
            </section>
            <section className={styles.cartRightSection}>
              <div className={styles.cartRightSectionTop}>
                <h3 className={styles.cartTitle}>결제예상금액</h3>
              </div>
              <hr className={styles.cartDivideLineThin} />
              <div>
                <div className={styles.highlightTextContainer}>
                  <HighlightText>결제예상금액</HighlightText>
                  <HighlightText>
                    {totalAmount.toLocaleString()}원
                  </HighlightText>
                </div>
                <div className={styles.orderButtonContainer}>
                  <Button
                    className={styles.orderButton}
                    variant='contained'
                    color='primary'
                    disabled={selectedItems.size === 0}
                    onClick={openOrderModal}
                  >
                    주문하기({selectedItems.size}개)
                  </Button>
                </div>
              </div>
            </section>
          </div>
        </div>
      </section>

      <DeleteConfirmModal
        ref={deleteModalRef}
        open={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        onOk={() =>
          deleteSelectedItems.mutate(Array.from(selectedItems.values()))
        }
      />
      <OrderConfirmModal
        ref={orderModalRef}
        open={isOrderModalOpen}
        onClose={handleCloseOrderModal}
        onOk={async () => {
          const ids = Array.from(selectedItems.values());
          const orderItems = cartItems.filter((item) => ids.includes(item.id));

          const { id } = await createOrder.mutateAsync(orderItems);
          navigate({
            to: '/order/$orderId',
            params: { orderId: id },
          });
        }}
      />
    </>
  );
}

export const Route = createFileRoute('/cart/')({
  component: Cart,
  loader: ({ context }) =>
    context.queryClient.ensureQueryData(cartItemQueryOptions()),
  pendingComponent: () => <div />,
});
