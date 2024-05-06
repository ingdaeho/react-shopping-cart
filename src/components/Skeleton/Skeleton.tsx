import { skeleton } from './Skeleton.css';

interface Props {
  width?: number;
  height?: number;
}

const Skeleton = ({ width, height }: Props) => {
  return <div className={skeleton} style={{ width, height }} />;
};

export default Skeleton;
