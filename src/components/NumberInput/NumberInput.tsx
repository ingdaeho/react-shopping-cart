import { ComponentPropsWithoutRef, Dispatch, SetStateAction } from 'react';
import {
  numberInputContainer,
  numberInput,
  numberInputButton,
} from './NumberInput.css';

interface Props extends ComponentPropsWithoutRef<'input'> {
  value: number;
  setValue: Dispatch<SetStateAction<number>>;
}

const NumberInput = ({ value, setValue }: Props) => {
  const handlePlus = () => {
    setValue((prev) => prev + 1);
  };

  const handleMinus = () => {
    if (value <= 0) return;
    setValue((prev) => prev - 1);
  };

  return (
    <div className={numberInputContainer}>
      <input type='number' className={numberInput} value={value} />
      <div>
        <button className={numberInputButton} onClick={handlePlus}>
          ▲
        </button>
        <button className={numberInputButton} onClick={handleMinus}>
          ▼
        </button>
      </div>
    </div>
  );
};

export default NumberInput;
