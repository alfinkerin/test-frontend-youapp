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
};

export default function Login() {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm<IFormInput>();
  const [isSubmit, setIsSubmit] = useState(false);
  const [typePassword, setTypePassword] = useState(true);

  const router = useRouter();
  const { toast } = useToast();

  // submit form
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    setIsSubmit(true);
    const response = await fetch("https://techtest.youapp.ai/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: data.email || "",
        username: data.username || "",
        password: data.password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        // save token to localStorage or you can save to cookies
        localStorage.setItem("token", data.access_token);
        router.push("/pages/profile");
        setIsSubmit(false);
        reset({
          username: "",
          password: "",
        });
        toast({
          description: "Login Succes",
        });
      })
      .catch((error) => {
        // enter your logic for when there is an error (ex. error toast)
        setIsSubmit(false);
        toast({
          variant: "destructive",
          description: "Login Failed",
        });
      });
    reset({
      username: "",
      password: "",
    });
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
          <span className="text-xl text-white">Login</span>
          <div className="mt-6">
            <Controller
              name="username"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <TextInput
                  customCss=""
                  type="text"
                  placeholder="Enter Username/Email"
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
                  placeholder="password"
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
            <Buttons disable={isSubmit} title="Login" />
            <p className="mt-12 text-white text-xs text-center">
              No account?{" "}
              <Link
                className="text-[#e4bf85] underline"
                href={"/pages/auth/register"}
              >
                {" "}
                Register here
              </Link>
            </p>
          </div>
        </div>
      </form>
    </>
  );
}
