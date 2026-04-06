import React, {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { login as authLogin } from '../store/authSlice'
import {Button, Input, Logo} from "./index"
import {useDispatch} from "react-redux"
import authService from "../appwrite/auth"
import {useForm} from "react-hook-form"

function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {register, handleSubmit} = useForm()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const login = async(data) => {
        setError("")
        setLoading(true)
        try {
          await authService.logout();
            const session = await authService.login(data)
            if (session) {
                const userData = await authService.getCurrentUser()
                if(userData) dispatch(authLogin({userData}));
                navigate("/")
            }
        } catch (error) {
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }

  return (
    <div className="flex items-center justify-center w-full min-h-screen bg-gray-50 px-4 rounded-3xl">
      
      <div className="w-full max-w-sm bg-white border border-gray-300 px-6 py-8 rounded-3xl">

        {/* Logo */}
        <div className="mb-6 flex justify-center">
          <span className="inline-block w-full max-w-22.5">
            <Logo width="100%" />
          </span>
        </div>

        {/* Title */}
        <h2 className="text-center text-lg font-semibold text-gray-800">
          Sign in to your account
        </h2>

        {/* Error */}
        {error && (
          <p className="text-red-600 mt-4 text-center text-sm">
            {error}
          </p>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit(login)} className="mt-6">
          <div className="space-y-4">
            
            <Input
              label="Email:"
              placeholder="Enter your email"
              type="email"
              {...register("email", {
                required: true,
                validate: {
                  matchPatern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address",
                }
              })}
            />

            <Input
              label="Password:"
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: true,
              })}
            />

            <Button
              type="submit"
              className="w-full h-10 bg-background-color text-white"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign in"}
            </Button>

          </div>
        </form>

        {/* Signup link */}
        <p className="mt-4 text-center text-sm text-gray-600">
          Don&apos;t have any account?&nbsp;
          <Link
            to="/signup"
            className="text-background-color hover:underline font-medium"
          >
            Sign Up
          </Link>
        </p>

      </div>
    </div>
  )
}

export default Login