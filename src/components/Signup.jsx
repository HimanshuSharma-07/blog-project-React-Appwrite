import React, {useState} from 'react'
import authService from '../appwrite/auth'
import {Link ,useNavigate} from 'react-router-dom'
import {login} from '../store/authSlice'
import {Button, Input, Logo} from './index.js'
import {useDispatch} from 'react-redux'
import {useForm} from 'react-hook-form'

function Signup() {
    const navigate = useNavigate()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const {register, handleSubmit} = useForm()

    const create = async(data) => {
        setError("")
        setLoading(true)
        try {
            const user = await authService.createAccount(data)
            if (user) {
                const userData = await authService.getCurrentUser()
                if(userData) dispatch(login({userData}));
                navigate("/")
            }
        } catch (error) {
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }

  return (
    <div className="flex items-center justify-center w-full min-h-screen bg-gray-50 px-4">

      <div className="w-full max-w-sm bg-white border border-gray-300 px-6 py-8 rounded-3xl">

        {/* Logo */}
        <div className="mb-6 flex justify-center">
          <span className="inline-block w-full max-w-22.5">
            <Logo width="100%" />
          </span>
        </div>

        {/* Title */}
        <h2 className="text-center text-lg font-semibold text-gray-800">
          Sign up to create account
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit(create)} className="mt-6">
          <div className="space-y-4">

            <Input
              label="Full Name:"
              placeholder="Enter your full name"
              {...register("name", {
                required: true,
              })}
            />

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
              {loading ? "Creating Account..." : "Create Account"}
            </Button>

          </div>
        </form>

        {/* Login link */}
        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?&nbsp;
          <Link
            to="/login"
            className="text-background-color hover:underline font-medium"
          >
            Sign In
          </Link>
        </p>

        {/* Error */}
        {error && (
          <p className="text-red-600 mt-4 text-center text-sm">
            {error}
          </p>
        )}

      </div>
    </div>
  )
}

export default Signup