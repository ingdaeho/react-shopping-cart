import { useState } from 'react';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import ProductCard from './products/-components/ProductCard';
import SnackBar from '../components/SnackBar/SnackBar';
import { PendingComponent } from './-components/pendingComponent';
import { useProductList } from './products/-hooks';

export const ProductList = () => {
  const navigate = useNavigate();
  const [showSnackBar, setShowSnackBar] = useState(false);
  const handleCloseSnackBar = () => setShowSnackBar(false);
  const { ref, virtualizer, allItems } = useProductList();

  return (
    <>
      <div ref={ref} style={{ width: `100%`, overflow: 'auto' }}>
        <div
          style={{
            height: `${virtualizer.getTotalSize()}px`,
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          {virtualizer.getVirtualItems().map((row) => {
            const product = allItems[row.index];
            return (
              <div
                key={row.key}
                data-index={row.index}
                ref={virtualizer.measureElement}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 360,
                  width: 280,
                  height: `${row.size}px`,
                  transform: `translate(${row.lane * row.size}px, ${row.start}px)`,
                }}
              >
                <ProductCard
                  product={product}
                  setShowSnackBar={setShowSnackBar}
                  onClick={() =>
                    navigate({
                      to: '/products/$productId',
                      params: { productId: product.id },
                    })
                  }
                />
              </div>
            );
          })}
        </div>
      </div>
      <SnackBar
        open={showSnackBar}
        onClose={handleCloseSnackBar}
        message='장바구니에 추가했습니다'
      />
    </>
  );
};

export const Route = createFileRoute('/')({
  component: ProductList,
  pendingComponent: PendingComponent,
});
