import { ChangeEventHandler, ComponentPropsWithoutRef } from 'react';
import { checkboxContainer, checkbox, checkboxLabel } from './Checkbox.css';

interface Props extends ComponentPropsWithoutRef<'input'> {
  label?: string;
  checked: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

const Checkbox = ({ label, checked, onChange, ...props }: Props) => {
  return (
    <div className={checkboxContainer}>
      <input
        className={checkbox}
        name='checkbox'
        type='checkbox'
        checked={checked}
        onChange={onChange}
        {...props}
      />
      {label && (
        <label className={checkboxLabel} htmlFor='checkbox'>
          {label}
        </label>
      )}
    </div>
  );
};

export default Checkbox;
