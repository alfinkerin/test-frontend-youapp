"use client";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import TextInput from "@/components/customUi/TextInput";
import Buttons from "@/components/customUi/Buttons";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

import { IoIosArrowBack } from "react-icons/io";
import { PiEyeSlashLight } from "react-icons/pi";
import { PiEyeLight } from "react-icons/pi";
import Link from "next/link";

type IFormInput = {
  email: string;
  username: string;
  password: string;
  confirm_password: string;
};

export default function Register() {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm<IFormInput>();
  const [isSubmit, setIsSubmit] = useState(false);
  const [typePassword, setTypePassword] = useState(true);
  const [confPassword, setConfPassword] = useState(true);

  const router = useRouter();
  const { toast } = useToast();

  // submit form
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    setIsSubmit(true);
    if (data.password !== data.confirm_password) {
      toast({
        variant: "destructive",
        description: "Password and Confirm Password not match",
      });
      setIsSubmit(false);
    } else {
      const response = await fetch("https://techtest.youapp.ai/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: data.email,
          username: data.username,
          password: data.password,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          // save token to localStorage or you can save to cookies

          router.push("/pages/auth/login");
          setIsSubmit(false);

          toast({
            description: "Register Succes",
          });
        })
        .catch((error) => {
          // enter your logic for when there is an error (ex. error toast)
          setIsSubmit(false);
          toast({
            variant: "destructive",
            description: "Register Failed",
          });
        });
    }
  };

  return (
    <>
      <div className="flex  items-center">
        <IoIosArrowBack size={20} color="white" />
        <span className="ml-1 text-white">Back</span>
      </div>

      {/* login form */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-14 mx-6">
          <span className="text-xl text-white">Register</span>
          <div className="mt-6">
            <Controller
              name="email"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <TextInput
                  customCss=""
                  type="text"
                  placeholder="Enter Email"
                  {...field}
                />
              )}
            />
            {errors.username && (
              <p className="text-red-500">Username is required</p>
            )}

            <Controller
              name="username"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <TextInput
                  customCss=""
                  type="text"
                  placeholder="Create Username"
                  {...field}
                />
              )}
            />
            {errors.username && (
              <p className="text-red-500">Username is required</p>
            )}

            <Controller
              name="password"
              control={control}
              rules={{ required: true, minLength: 6 }}
              render={({ field }) => (
                <TextInput
                  type={typePassword ? "password" : "text"}
                  placeholder="Create Password"
                  customCss="pr-12"
                  Icon={
                    typePassword ? (
                      <PiEyeSlashLight size="20" color="black" />
                    ) : (
                      <PiEyeLight size="20" color="black" />
                    )
                  }
                  onClick={() => setTypePassword(!typePassword)}
                  {...field}
                />
              )}
            />
            {errors.password && (
              <p className="text-red-500">Password is required</p>
            )}

            <Controller
              name="confirm_password"
              control={control}
              rules={{ required: true, minLength: 6 }}
              render={({ field }) => (
                <TextInput
                  type={confPassword ? "password" : "text"}
                  placeholder="confirm Password"
                  customCss="pr-12"
                  Icon={
                    confPassword ? (
                      <PiEyeSlashLight size="20" color="black" />
                    ) : (
                      <PiEyeLight size="20" color="black" />
                    )
                  }
                  onClick={() => setConfPassword(!confPassword)}
                  {...field}
                />
              )}
            />
            {errors.password && (
              <p className="text-red-500">Password is required</p>
            )}
            <Buttons disable={isSubmit} title="Register" />
            <p className="mt-12 text-white text-xs text-center">
              Have an account?{" "}
              <Link
                className="text-[#e4bf85] underline"
                href={"/pages/auth/login"}
              >
                Login here
              </Link>
            </p>
          </div>
        </div>
      </form>
    </>
  );
}
