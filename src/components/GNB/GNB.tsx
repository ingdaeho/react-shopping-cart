import { useEffect } from 'react';
import { Link } from '@tanstack/react-router';
import { useSuspenseQuery } from '@tanstack/react-query';
import classNames from 'classnames';
import { nav, navTitle, navButton } from './GNB.css';
import Badge from '../Badge/Badge';
import { cartItemQueryOptions } from '../../routes/cart/-queryOptions';
import { useCartStore } from '../../store/cart';

export default function GNB() {
  const { data } = useSuspenseQuery(cartItemQueryOptions());
  const setItems = useCartStore((state) => state.setItems);
  const cartItems = useCartStore((state) => state.items);

  useEffect(() => {
    setItems(data);
  }, [data]);

  return (
    <nav className={classNames(nav, 'flex', 'justify-around')}>
      <div className='flex-center'>
        <Link to='/'>
          <h1 className={navTitle}>CLEAN CODE SHOP</h1>
        </Link>
      </div>
      <div className='flex gap-15'>
        <Badge badgeContent={cartItems.length}>
          <Link to='/cart' className={navButton}>
            장바구니
          </Link>
        </Badge>
        <Link to='/orderList' className={navButton}>
          주문목록
        </Link>
      </div>
    </nav>
  );
}
