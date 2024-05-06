import { ChangeEvent } from 'react';
import {
  numberInputContainer,
  numberInput,
  numberInputButton,
} from './NumberInput.css';

interface Props {
  value: number;
  onChange: (value: number) => void;
}

const NumberInput = ({ value, onChange }: Props) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(event.target.value, 10);
    onChange(newValue);
  };

  const handlePlus = () => {
    const newValue = value + 1;
    onChange(newValue);
  };

  const handleMinus = () => {
    const newValue = value - 1;
    if (newValue <= 0) return;
    onChange(newValue);
  };

  return (
    <div className={numberInputContainer}>
      <input
        type='number'
        className={numberInput}
        value={value}
        onChange={handleChange}
      />
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
