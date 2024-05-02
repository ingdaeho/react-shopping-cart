import Skeleton from '../../components/Skeleton/Skeleton';

export const PendingComponent = () => {
  return (
    <section className='product-container'>
      {Array.from({ length: 20 }).map((_, index) => (
        <div key={index}>
          <Skeleton width={285} height={285} />
          <div style={{ height: 49 }} />
        </div>
      ))}
    </section>
  );
};
