import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useSuspenseQuery } from '@tanstack/react-query';
import { z } from 'zod';
import Button from '../../components/Button/Button';
import { productQueryOptions, useAddToCartMutation } from './-queryOptions';

export const ProductDetail = () => {
  const navigate = useNavigate();
  const { productId } = Route.useParams();
  const { data } = useSuspenseQuery(productQueryOptions(productId));
  const { mutate } = useAddToCartMutation();

  return (
    <div className='product-detail-container'>
      <div className='flex-col-center w-520'>
        <img
          className='w-480 h-480 mb-10'
          src={data.imageUrl}
          alt={data.name}
        />
        <div className='product-detail-info'>
          <span className='product-detail-info__name'>{data.name}</span>
          <hr className='divide-line-gray my-20' />
          <div className='flex justify-between'>
            <span>금액</span>
            <span className='product-detail-info__price'>
              {data.price.toLocaleString()}원
            </span>
          </div>
        </div>
        <Button
          variant='contained'
          color='secondary'
          className='flex-center mt-20'
          onClick={() =>
            mutate(data, { onSuccess: () => navigate({ to: '/cart' }) })
          }
        >
          장바구니
        </Button>
      </div>
    </div>
  );
};

export const Route = createFileRoute('/products/$productId')({
  component: ProductDetail,
  parseParams: ({ productId }) => ({
    productId: z.number().int().parse(Number(productId)),
  }),
  loader: ({ context, params }) =>
    context.queryClient.ensureQueryData(productQueryOptions(params.productId)),
  pendingComponent: () => <div />,
});
