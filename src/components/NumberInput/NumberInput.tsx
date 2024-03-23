import { ChangeEvent, useEffect, useState } from 'react';
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
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(event.target.value, 10);
    setInputValue(newValue);
    onChange(newValue);
  };

  const handlePlus = () => {
    const newValue = inputValue + 1;
    setInputValue(newValue);
    onChange(newValue);
  };

  const handleMinus = () => {
    const newValue = inputValue - 1;
    if (newValue <= 0) return;
    setInputValue(newValue);
    onChange(newValue);
  };

  return (
    <div className={numberInputContainer}>
      <input
        type='number'
        className={numberInput}
        value={inputValue}
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
