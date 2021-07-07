import React, { ChangeEvent, FC } from "react";

interface InputProps {
  label: string;
  inputType: string;
  inputValue?: string;
  onInputChange: (e: string) => void;
}

const Input: FC<InputProps> = ({
  label,
  inputType,
  inputValue,
  onInputChange,
}: InputProps) => {
  return (
    <>
      <div>
        <label>{label}</label>
        <input
          type={inputType}
          value={inputValue}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            onInputChange(e.target.value);
          }}
        ></input>
      </div>
    </>
  );
};

export default Input;
