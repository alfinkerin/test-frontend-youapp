import React, { MouseEventHandler, ReactElement } from "react";
import { Button } from "@/components/ui/button";

type ButtonProps = {
  disable?: boolean;
  title: string;
  customCss?: string;
};

export default function Buttons({
  disable,
  title,
  customCss,
  ...props
}: ButtonProps) {
  return (
    <div className="group relative mt-8">
      <div
        className={`${
          disable === false &&
          "absolute -inset-1  top-[6px] mx-[4px] rounded-lg bg-gradient-to-r from-[#62cdcb]  to-[#4599db] opacity-75 blur transition duration-500 group-hover:opacity-100"
        }`}
      />
      <Button
        disabled={disable}
        className={`${customCss} w-full h-14 text-lg text-white relative ${
          disable === true
            ? " bg-[#265255] opacity-70   hover:cursor-not-allowed "
            : " bg-gradient-to-r from-[#62cdcb] hover:cursor-pointer to-[#4599db]   "
        }  `}
        {...props}
      >
        {title}
      </Button>
    </div>
  );
}
