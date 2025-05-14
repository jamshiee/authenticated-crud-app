import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { BiLoader } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";

import api from "../lib/axios.js";
import useStore from "../store/useStore.js";

const registerSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email("Please enter a valid email"),
  password: z.string().min(8, "Password must be atleast 8 characters long"),
});

const Signup = () => {
    const { token,setCredentials } = useStore((state) => state);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(registerSchema) });

    const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
        const { data: res } = await api.post("/auth/signin", data);
      console.log(data);
      if (res?.user) {
        console.log(res?.message);
        const userInfo =  res.token ;
        localStorage.setItem("token", JSON.stringify(userInfo));
        setCredentials(userInfo);
          navigate("/dashboard");
    }

    } catch (error) {
      console.log(error);
    }
  };

    useEffect(() => {
      token && navigate("/");
    }, [token]);

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                disabled={isSubmitting}
                id="email"
                name="email"
                type="email"
                required
                {...register("email")}
                autoComplete="email"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
                disabled={isSubmitting}
                id="password"
                name="password"
                type="password"
                required
                {...register("password")}
                autoComplete="current-password"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {isSubmitting ? (
                <BiLoader className="text-2xl text-white animate-spin" />
              ) : (
                " Sign in"
              )}
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm/6 text-gray-500">
          Create a new account?
          <a
            href="#"
            className="font-semibold text-indigo-600 hover:text-indigo-500"
          >
            <Link  to={'/signup'}>Sign up</Link>
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
