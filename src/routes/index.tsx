import { useState } from 'react';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useSuspenseQuery } from '@tanstack/react-query';
import { productListQueryOptions } from './products/-queryOptions';
import ProductCard from './products/-components/ProductCard';
import SnackBar from '../components/SnackBar/SnackBar';

export const ProductList = () => {
  const navigate = useNavigate();
  const { data } = useSuspenseQuery(productListQueryOptions());
  const [showSnackBar, setShowSnackBar] = useState(false);

  const handleCloseSnackBar = () => setShowSnackBar(false);

  return (
    <>
      <section className='product-container'>
        {data.map((item) => (
          <ProductCard
            key={item.id}
            product={item}
            setShowSnackBar={setShowSnackBar}
            onClick={() =>
              navigate({
                to: '/products/$productId',
                params: { productId: item.id.toString() },
              })
            }
          />
        ))}
      </section>
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
  loader: (opts) =>
    opts.context.queryClient.ensureQueryData(productListQueryOptions()),
  notFoundComponent: () => <div>product not found</div>,
});
