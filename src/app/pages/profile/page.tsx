"use client";

import { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { BsThreeDots } from "react-icons/bs";
import { BiEditAlt } from "react-icons/bi";
import { useAtom } from "jotai";
import { imageAtom } from "@/atoms/image-atom";
import Image from "next/image";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function About() {
  const [data, setData] = useState<any>({});
  const [image, setImage] = useAtom(imageAtom);

  useEffect(() => {
    fetch("https://techtest.youapp.ai/api/getProfile", {
      headers: {
        "x-access-token": `${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data.data);
      });
  }, []);

  const d = new Date();
  let year = d.getFullYear();

  return (
    <div>
      <div className="flex justify-between items-center mt-10 text-white">
        <div className="flex items-center w-1/2 justify-start">
          <IoIosArrowBack size={20} color="white" />
          <span className="ml-1 text-white">Back</span>
        </div>
        <span className="w-1/2 flex justify-center">@{data?.username}</span>
        <span className="w-1/2 flex justify-end">
          <BsThreeDots size={20} color="white" />
        </span>
      </div>

      {/* image */}
      {image === null ? (
        <Card className="bg-[#162329] mt-8 h-[13rem] flex flex-col justify-between border-none rounded-2xl">
          <CardHeader>
            <CardTitle className="w-full flex justify-end">
              <BiEditAlt size={20} color="white" />
            </CardTitle>
          </CardHeader>
          <CardFooter>
            {data?.name === undefined ? (
              <p className="text-white">@{data?.username}</p>
            ) : (
              <p className="text-white">@{data?.name}</p>
            )}
          </CardFooter>
        </Card>
      ) : (
        <div className="mt-8 relative flex flex-col justify-between border-none">
          <Image
            className="h-[13rem] rounded-2xl object-cover"
            width={600}
            height={600}
            src={URL.createObjectURL(image)}
            alt=""
          />
          <div className="absolute bottom-[3rem] left-[1rem]">
            {data?.name === undefined ? (
              <p className="text-white">@{data?.username}</p>
            ) : (
              <p className="text-white text-xl font-bold">@{data?.name}</p>
            )}
          </div>
        </div>
      )}

      {/* about */}
      <Card className="bg-[#1e1e1e] mt-8   border-none rounded-2xl">
        <CardHeader>
          <CardTitle className="w-full flex justify-between">
            <h3 className="text-base text-white">About</h3>
            <Link href={"/pages/profile/abouts"}>
              <BiEditAlt size={20} color="white" />
            </Link>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {data?.name === undefined ? (
            <p className="text-white">
              Add in your your to help others know you better
            </p>
          ) : (
            <div className="text-white grid grid-cols gap-2">
              <p>
                Birthday: {data?.birthday}{" "}
                {`(age ${year - data.birthday.slice(-5)})`}
              </p>
              <p>Horoscope: {data.horoscope}</p>
              <p>Zodiac: {data.zodiac}</p>
              <p>Height: {data.height}</p>
              <p>Weight: {data.weight}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* interest */}
      <Card className="bg-[#1e1e1e] mt-8   border-none rounded-2xl">
        <CardHeader>
          <CardTitle className="w-full flex justify-between">
            <h3 className="text-base text-white">Interest</h3>
            <Link href={"/pages/interests"}>
              <BiEditAlt size={20} color="white" />
            </Link>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {data?.name === undefined ? (
            <p className="text-white">
              Add in your interest to find a better match
            </p>
          ) : (
            <div className="text-white flex flex-wrap">
              {data.interests.map((x: any, i: any) => (
                <span
                  className="font-semibold bg-[#1c272c] text-white/70 rounded-full w-auto py-1 px-2 m-1"
                  key={i}
                >
                  {x}
                </span>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
