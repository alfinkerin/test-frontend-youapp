import React, { MouseEventHandler, ReactElement } from "react";

type InputProps = {
  label?: string;
  placeholder?: string;
  customCss?: string;
  spaceCss?: string;
  type: string;
  Icon?: ReactElement;
  onClick?: MouseEventHandler;
  defaultValue?: string;
  onChange?: any;
  disable?: boolean;
};

function TextInput({
  label,
  placeholder,
  type,
  Icon,
  onClick,
  customCss,
  onChange,
  defaultValue,
  spaceCss,
  disable,
  ...props
}: InputProps) {
  return (
    <div className="form-control w-full ">
      {label !== undefined && (
        <label className="label">
          <span className="label-text text-white">{label}</span>
        </label>
      )}

      <div className={`${spaceCss} relative my-2`}>
        <input
          type={type}
          disabled={disable}
          onChange={onChange}
          defaultValue={defaultValue}
          placeholder={placeholder}
          className={`${customCss} h-14 focus:outline-none focus:border-none  focus:ring-1 focus:ring-transparent w-full text-white bg-white/10 py-1 px-2 rounded-lg `}
          {...props}
        />
        <div
          className="absolute right-4 top-[30%] cursor-pointer"
          onClick={onClick}
        >
          {Icon}
        </div>
      </div>
    </div>
  );
}

export default TextInput;
