"use client";
import Multiselect from "@/components/customUi/MultiSelect";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";

type IFormInput = {
  name: string;
  birthday: string;
  height: any;
  weight: any;
  interests: any;
  gender: any;
  horoscope: any;
  zodiac: any;
};
export default function Interest() {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm<IFormInput>();
  const [items, setItems] = useState([
    "Music",
    "Basketball",
    "Fitness",
    "Game",
    "Hangout",
  ]);
  const [selectedItems, setSelected] = useState([]);
  const [datas, setDatas] = useState<any>({});
  const router = useRouter();
  useEffect(() => {
    fetch("https://techtest.youapp.ai/api/getProfile", {
      headers: {
        "x-access-token": `${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setDatas(data.data);
      });
  }, []);
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    await fetch("https://techtest.youapp.ai/api/updateProfile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": `${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        name: datas.name,
        birthday: datas.birthday,
        height: parseInt(datas.height),
        weight: parseInt(datas.weight),
        interests: selectedItems,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        router.push("/pages/profile");
      })
      .catch((error) => {});
  };

  return (
    <>
      <div className="flex justify-between items-center  text-white">
        <div className="flex items-center w-1/2 justify-start">
          <IoIosArrowBack size={20} color="white" />
          <Link href={"/pages/profile"}>
            <span className="ml-1 text-white">Back</span>
          </Link>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <span className="w-1/2 flex justify-end">
            <button className="text-[#ABFFFD]">Save </button>
          </span>
        </form>
      </div>
      <div className="mt-24  ml-8">
        <p className="bg-gradient-to-r from-[#D5BE88] via-[#FFE2BE] to-[#F3EDA6] text-transparent bg-clip-text inline-block font-semibold">
          Tell everyone about yourself
        </p>
        <p className="text-2xl font-bold text-white mt-4">What interest you?</p>
      </div>
      <div className="mt-10">
        <Multiselect
          items={items}
          selectedItems={selectedItems}
          setSelected={setSelected}
        />
      </div>
    </>
  );
}
