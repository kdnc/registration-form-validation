import React, { ChangeEvent, FC } from "react";

interface InputProps {
  label: string;
  inputType: string;
  inputName: string;
  inputValue?: string;
  onInputChange: (inputName: string, inputValue: string) => void;
}

const Input: FC<InputProps> = ({
  label,
  inputType,
  inputName,
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
            onInputChange(inputName, e.target.value);
          }}
        ></input>
      </div>
    </>
  );
};

export default Input;
