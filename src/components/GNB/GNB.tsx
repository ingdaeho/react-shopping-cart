import { nav, navTitle, navButton } from './GNB.css';
import classNames from 'classnames';

export default function GNB() {
  return (
    <nav className={classNames(nav, 'flex', 'justify-around')}>
      <div className='flex-center'>
        <h1 className={navTitle}>CLEAN CODE SHOP</h1>
      </div>
      <div className='flex gap-15'>
        <button className={navButton}>장바구니</button>
        <button className={navButton}>주문목록</button>
      </div>
    </nav>
  );
}
