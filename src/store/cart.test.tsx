import { act, renderHook } from '@testing-library/react';
import { useCartStore } from './cart';
import { products } from '../mocks/handlers/data';

describe('useCartStore hook 테스트', () => {
  test('장바구니에 상품 추가', () => {
    const { result } = renderHook(() => useCartStore());
    const productData = Array.from(products.values());
    const product = productData[0];

    act(() => {
      result.current.setItems([{ id: product.id, product }]);
    });

    expect(result.current.items).toHaveLength(1);
  });

  test('장바구니 상품 수량을 변경', () => {
    const { result } = renderHook(() => useCartStore());
    const productData = Array.from(products.values());
    const product = productData[0];

    act(() => {
      result.current.setItems([{ id: product.id, product }]);
      result.current.handleQuantity(product.id, 3);
    });

    expect(result.current.items[0].quantity).toBe(3);
  });
});
