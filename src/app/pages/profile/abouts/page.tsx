"use client";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import UploadImage from "@/components/customUi/UploadImage";
import TextInput from "@/components/customUi/TextInput";
import { useRouter } from "next/navigation";
import Buttons from "@/components/customUi/Buttons";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { zodiacDate } from "@/constant/zodiac";
import { useDebouncedCallback } from "use-debounce";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";

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
export default function Abouts() {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm<IFormInput>();
  const [zodiac, setZodiac] = useState<any>({
    horo: "",
    zod: "",
  });
  const [value, setValue] = useState<any>();
  const [data, setData] = useState<any>({});

  const router = useRouter();

  const debounced = useDebouncedCallback((value: any) => {
    setValue(value);
  }, 2000);

  function handleChange(e: any) {
    debounced(e.target.value);
  }

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

  const filteredDate = () => {
    if (value !== undefined) {
      const cutDate = value?.slice(2, -4);

      const dates = zodiacDate
        .filter((x: any) => x.tanggal === cutDate)
        .map((z: any) => z.bulan);
      fetch("https://techtest.youapp.ai/api/createProfile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": `${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          name: "string",
          birthday: `${value.slice(0, 2)} ${dates} ${value.slice(-4)}`,
          height: 0,
          weight: 0,
          interests: ["string"],
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setZodiac({
            horo: data.data.horoscope,
            zod: data.data.zodiac,
          });
        })
        .catch((error) => {
          // enter your logic for when there is an error (ex. error toast)
        });
    }
  };

  useEffect(() => {
    filteredDate();
  }, [value]);

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    if (data.name !== undefined) {
      await fetch("https://techtest.youapp.ai/api/updateProfile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": `${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          name: data.name,
          birthday: value,
          height: parseInt(data.height),
          weight: parseInt(data.weight),
          interests: ["string"],
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          router.push("/pages/profile");
        })
        .catch((error) => {});
    } else {
      const cutDate = value?.slice(2, -4);

      const dates = zodiacDate
        .filter((x: any) => x.tanggal === cutDate)
        .map((z: any) => z.bulan);
      await fetch("https://techtest.youapp.ai/api/createProfile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": `${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          name: data.name,
          birthday: `${value.slice(0, 2)} ${dates} ${value.slice(-4)}`,
          height: parseInt(data.height),
          weight: parseInt(data.weight),
          interests: ["string"],
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          router.push("/pages/profile");
        })
        .catch((error) => {});
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full flex justify-between text-white">
          <Link href={"/pages/profile"}>
            {" "}
            <div>About</div>{" "}
          </Link>
          <button className="text-[#e4bf85]">Save & Update</button>
        </div>
        <div className="mt-10 flex items-center mb-8 ">
          <UploadImage />
          <span className="text-white ml-4">Add image</span>
        </div>

        <div className="grid grid-cols-3 gap-2 items-center">
          <label className="text-white opacity-70">Display name:</label>
          <div className="col-span-2">
            <Controller
              name="name"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <TextInput
                  spaceCss="my-2"
                  type="text"
                  defaultValue={data?.name || ""}
                  placeholder="Enter Username"
                  {...field}
                />
              )}
            />
            {errors.name && (
              <p className="text-red-500">Username is required</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 items-center">
          <label className="text-white opacity-70">Gender:</label>
          <div className="col-span-2">
            <Controller
              name="gender"
              control={control}
              rules={{ required: false }}
              render={({ field }) => (
                <Select>
                  <SelectTrigger className="h-14 bg-[#222C31] text-white/70 border-none">
                    <SelectValue placeholder="Select Gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Gender</SelectLabel>
                      <SelectItem value="apple">Male</SelectItem>
                      <SelectItem value="banana">Female</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.gender && (
              <p className="text-red-500">Username is required</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 items-center">
          <label className="text-white opacity-70">Birthday:</label>
          <div className="col-span-2">
            <Controller
              name="birthday"
              control={control}
              rules={{ required: false }}
              render={({ field }) => (
                <TextInput
                  spaceCss="my-2"
                  type="text"
                  defaultValue={data?.birthday || ""}
                  placeholder="DD MM YYYY"
                  {...field}
                  onChange={handleChange}
                />
              )}
            />
            {errors.birthday && (
              <p className="text-red-500">Username is required</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 items-center">
          <label className="text-white opacity-70">Horoscope:</label>
          <div className="col-span-2">
            <Controller
              name="horoscope"
              control={control}
              rules={{ required: false }}
              render={({ field }) => (
                <TextInput
                  disable={true}
                  defaultValue={data?.horoscope || zodiac.horo}
                  spaceCss="my-2"
                  type="text"
                  placeholder="-"
                  {...field}
                />
              )}
            />
            {errors.horoscope && (
              <p className="text-red-500">Username is required</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 items-center">
          <label className="text-white opacity-70">Zodiac:</label>
          <div className="col-span-2">
            <Controller
              name="zodiac"
              control={control}
              rules={{ required: false }}
              render={({ field }) => (
                <TextInput
                  disable={true}
                  defaultValue={data?.zodiac || zodiac.zod}
                  spaceCss="my-2"
                  type="text"
                  placeholder="-"
                  {...field}
                />
              )}
            />
            {errors.zodiac && (
              <p className="text-red-500">Username is required</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 items-center">
          <label className="text-white opacity-70">Height:</label>
          <div className="col-span-2">
            <Controller
              name="height"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <TextInput
                  spaceCss="my-2"
                  type="text"
                  defaultValue={data?.height || ""}
                  placeholder="Add height"
                  {...field}
                />
              )}
            />
            {errors.height && (
              <p className="text-red-500">Username is required</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 items-center">
          <label className="text-white opacity-70">Weight:</label>
          <div className="col-span-2">
            <Controller
              name="weight"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <TextInput
                  spaceCss="my-2"
                  type="text"
                  defaultValue={data?.weight || ""}
                  placeholder="Add weight"
                  {...field}
                />
              )}
            />
            {errors.weight && (
              <p className="text-red-500">Username is required</p>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
