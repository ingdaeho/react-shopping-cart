import { nav, navTitle, navButton } from './GNB.css';
import classNames from 'classnames';
import { useNavigate } from '@tanstack/react-router';
import Badge from '../Badge/Badge';
import { useSuspenseQuery } from '@tanstack/react-query';
import { cartItemQueryOptions } from '../../routes/cart/-queryOptions';

export default function GNB() {
  const navigate = useNavigate();
  const { data: cartItems } = useSuspenseQuery(cartItemQueryOptions());

  return (
    <nav className={classNames(nav, 'flex', 'justify-around')}>
      <div className='flex-center'>
        <h1 className={navTitle} onClick={() => navigate({ to: '/' })}>
          CLEAN CODE SHOP
        </h1>
      </div>
      <div className='flex gap-15'>
        <Badge badgeContent={cartItems.length}>
          <button
            className={navButton}
            onClick={() => navigate({ to: '/cart' })}
          >
            장바구니
          </button>
        </Badge>
        <button
          className={navButton}
          onClick={() => navigate({ to: '/order' })}
        >
          주문목록
        </button>
      </div>
    </nav>
  );
}
