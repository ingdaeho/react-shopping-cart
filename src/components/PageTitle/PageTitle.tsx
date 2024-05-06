import { PropsWithChildren } from 'react';
import { pageTitle } from './PageTitle.css';

const PageTitle = ({ children }: PropsWithChildren) => {
  return (
    <header className='flex-col-center mt-20'>
      <h2 className={pageTitle}>{children}</h2>
      <hr className='divide-line mt-20' />
    </header>
  );
};

export default PageTitle;
