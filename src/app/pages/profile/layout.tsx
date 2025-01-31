"use client";
import React, { ReactNode, useEffect, useState } from "react";
import { Inter } from "next/font/google";
import { useRouter } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

type LayoutAbout = {
  children: ReactNode | ReactNode[];
};

function LayoutAdmin({ children }: LayoutAbout) {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const tokens = localStorage.getItem("token") as any;
      if (tokens === null) {
        router.push("/pages/auth/login");
      }
    }
  }, []);

  return (
    <>
      <div
        className={`${inter.className}w-full h-screen bg-gradient-to-tr bg-bg-primary  py-10 px-4`}
      >
        {children}
      </div>
    </>
  );
}

export default LayoutAdmin;
