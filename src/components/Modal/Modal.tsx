import { ReactNode, forwardRef } from 'react';
import ReactDOM from 'react-dom';
import {
  modalContainer,
  modalContent as modalContentStyle,
  modalDimmed,
  modalFooter,
  modalTitle,
} from './Modal.css';

interface Props {
  open: boolean;
  title: string | ReactNode;
  content: string | ReactNode;
  footer: ReactNode;
}

const Modal = forwardRef<HTMLDivElement, Props>(
  ({ open, title, content, footer }, ref) => {
    if (!open) return null;

    const modalContent = (
      <div className={modalDimmed}>
        <div ref={ref} className={modalContainer}>
          <h2 className={modalTitle}>{title}</h2>
          <div className={modalContentStyle}>{content}</div>
          <footer className={modalFooter}>{footer}</footer>
        </div>
      </div>
    );

    return ReactDOM.createPortal(modalContent, document.body);
  }
);

export default Modal;
