import { createFileRoute, useNavigate } from '@tanstack/react-router';
import ProductCard from './-components/ProductCard';
import { useSuspenseQuery } from '@tanstack/react-query';
import { productListQueryOptions } from './-queryOptions';

export const ProductList = () => {
  const navigate = useNavigate();
  const { data } = useSuspenseQuery(productListQueryOptions());

  return (
    <section className='product-container'>
      {data.map((item) => (
        <ProductCard
          key={item.id}
          product={item}
          onClick={() =>
            navigate({
              to: '/products/$productId',
              params: { productId: item.id.toString() },
            })
          }
        />
      ))}
    </section>
  );
};

export const Route = createFileRoute('/products/')({
  component: ProductList,
  loader: (opts) =>
    opts.context.queryClient.ensureQueryData(productListQueryOptions()),
  notFoundComponent: () => <div>product not found</div>,
});
