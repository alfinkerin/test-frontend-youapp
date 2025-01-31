import React, { ReactNode } from "react";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

type LayoutAuth = {
  children: ReactNode | ReactNode[];
};

function LayoutAdmin({ children }: LayoutAuth) {
  return (
    <>
      <div
        className={`${inter.className}w-full h-screen bg-gradient-to-tr from-bg-primary via-bg-secondary to-bg-tertiary py-10 px-4`}
      >
        {children}
      </div>
    </>
  );
}

export default LayoutAdmin;
