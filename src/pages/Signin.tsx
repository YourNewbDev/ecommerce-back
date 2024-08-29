import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import ISignIn from "../interfaces/FormSignin";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const Signin = () => {
  const { register, handleSubmit } = useForm<ISignIn>()

  const mutation = useMutation({
    mutationFn: async(data: ISignIn) => {
      const response = await axios.post("http://localhost:3000/auth/admin/signin", data)
      return response
    },
    onError: (error: any) => {
      console.error(error.response)
    },
    onSuccess: (data) => {
      console.log(data)
  
    }
  })

  const onSubmit: SubmitHandler<ISignIn> = (data) => {
    mutation.mutate(data)
    console.log(data)
  }



  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-800">
        <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md">
          <h2 className="mb-6 text-2xl font-bold text-center text-gray-700">
            Sign In
          </h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label
                className="block mb-2 text-sm font-medium text-gray-600"
              >
                Email Address or Username
              </label>
              <input
                {...register("email")}
                {...register("username")}
                type="text"
                id="emailOrUsername"
                className="w-full px-4 py-2 text-gray-700 bg-gray-200 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
                placeholder="Enter your email or username"
              />
            </div>
            <div className="mb-6">
              <label
                className="block mb-2 text-sm font-medium text-gray-600"
              >
                Password
              </label>
              <input
                {...register("password", {required: true})}
                type="password"
                id="password"
                className="w-full px-4 py-2 text-gray-700 bg-gray-200 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
                placeholder="Enter your password"
              />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-indigo-500 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-300"
            >
              Sign In
            </button>
          </form>
          <div className="mt-4 text-center">
            <a href="#" className="text-sm text-indigo-500 hover:underline">
              Forgot Password?
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signin;
