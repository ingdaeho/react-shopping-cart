import { nav, navTitle, navButton } from './GNB.css';
import classNames from 'classnames';
import { useNavigate } from '@tanstack/react-router';

export default function GNB() {
  const navigate = useNavigate();
  return (
    <nav className={classNames(nav, 'flex', 'justify-around')}>
      <div className='flex-center'>
        <h1 className={navTitle} onClick={() => navigate({ to: '/products' })}>
          CLEAN CODE SHOP
        </h1>
      </div>
      <div className='flex gap-15'>
        <button className={navButton} onClick={() => navigate({ to: '/cart' })}>
          장바구니
        </button>
        <button
          className={navButton}
          onClick={() => navigate({ to: '/orderList' })}
        >
          주문목록
        </button>
      </div>
    </nav>
  );
}
