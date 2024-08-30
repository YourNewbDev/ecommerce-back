import React, { ChangeEvent, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import ISignIn from "../interfaces/FormSignin";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

type InputFieldName = 'email' | 'username'

const Signin = () => {
  const navigate = useNavigate()
  const [inputType, setInputType] = useState('text')
  const [inputName, setInputName] = useState<InputFieldName>('username')
  const [cookies, setCookie, removeCookie] = useCookies(['token'])
  const { register, handleSubmit } = useForm<ISignIn>()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailRegex.test(value)) {
      setInputType('email')
      setInputName('email')
    } else {
      setInputType('text')
      setInputName('username')
    }
  }

  const mutation = useMutation({
    mutationFn: async (data: ISignIn) => {
      return await axios.post("http://localhost:3000/auth/admin/signin", data)
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.message || 'An error occurred'
      console.error(errorMessage)
      toast.error(errorMessage)
    },
    onSuccess: (data) => {
      console.log(data)
      setCookie('token', data.data.token)
      toast.success(`${data.data.message}!`)

      setTimeout(() => {
        navigate('/')
      },
        2000)

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
                {...register(inputName)}
                type={inputType}
                id="identifier"
                className="w-full px-4 py-2 text-gray-700 bg-gray-200 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
                placeholder="Enter your email or username"
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-6">
              <label
                className="block mb-2 text-sm font-medium text-gray-600"
              >
                Password
              </label>
              <input
                {...register("password", { required: true })}
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
      <ToastContainer />
    </>
  );
};

export default Signin;
