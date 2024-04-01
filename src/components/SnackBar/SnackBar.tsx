import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { snackbarContainer, snackbarShow } from './SnackBar.css';

interface Props {
  open: boolean;
  onClose: () => void;
  message: string;
}

export const SnackBar = ({ open, onClose, message }: Props) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (open) {
      setShow(true);

      const timer = setTimeout(() => {
        setShow(false);
        onClose();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [open]);

  return (
    <div className={classNames(snackbarContainer, { [snackbarShow]: show })}>
      {message}
    </div>
  );
};

export default SnackBar;
