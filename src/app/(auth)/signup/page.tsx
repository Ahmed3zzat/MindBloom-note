"use client";
import { useFormik } from "formik";
import Link from "next/link";
import Image from "next/image";
import * as Yup from "yup";
import loginImage from "@/assets/images/HomePage1.jpg";
import toast from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useAppDispatch } from "@/hooks/store.hook";
import { setSignup } from "@/store/user.slice";

export default function Signup() {
  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
        "Must include uppercase, lowercase, number, and special character"
      ),
    age: Yup.string().required("Age is required"),
    phone: Yup.string()
      .matches(/^\d{10,15}$/, "Phone number is not valid")
      .required("Phone number is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      age: "",
      phone: "",
    },
    validationSchema,
    onSubmit: (values) => {
      dispatch(setSignup(values));
      console.log(values);
      toast.success("Signup Successful!");
    },
  });

  return (
    <div className="min-h-screen flex bg-[#F8E9E9]">
      <div className="lg:w-1/2 w-full flex flex-col items-center justify-center p-12 bg-white shadow-2xl">
        <h1 className="text-5xl font-extrabold text-[#394648] mb-8">
          MindBloom{" "}
        </h1>
        <p className="mb-6 text-[#394648] text-lg">Sign up using:</p>

        <form
          className="w-full max-w-md space-y-5"
          onSubmit={formik.handleSubmit}
        >
          <div className="relative">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
              className="w-full px-4 py-4 text-lg bg-[#F8E9E9] border border-[#EDB6A3] rounded-lg focus:ring-2 focus:ring-[#CBAC88] focus:bg-white"
            />
            {formik.touched.name && formik.errors.name && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.name}</p>
            )}
          </div>

          <div className="relative">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
              className="w-full px-4 py-4 text-lg bg-[#F8E9E9] border border-[#EDB6A3] rounded-lg focus:ring-2 focus:ring-[#CBAC88] focus:bg-white"
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
            )}
          </div>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
              className="w-full px-4 py-4 text-lg bg-[#F8E9E9] border border-[#EDB6A3] rounded-lg focus:ring-2 focus:ring-[#CBAC88] focus:bg-white"
            />
            <span
              className="absolute right-4 top-4 cursor-pointer text-[#394648]"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </span>
            {formik.touched.password && formik.errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.password}
              </p>
            )}
          </div>

          <div className="relative">
            <input
              type="text"
              name="age"
              placeholder="Age"
              value={formik.values.age}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
              className="w-full px-4 py-4 text-lg bg-[#F8E9E9] border border-[#EDB6A3] rounded-lg focus:ring-2 focus:ring-[#CBAC88] focus:bg-white"
            />
            {formik.touched.age && formik.errors.age && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.age}</p>
            )}
          </div>

          <div className="relative">
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
              className="w-full px-4 py-4 text-lg bg-[#F8E9E9] border border-[#EDB6A3] rounded-lg focus:ring-2 focus:ring-[#CBAC88] focus:bg-white"
            />
            {formik.touched.phone && formik.errors.phone && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.phone}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={!formik.isValid || !formik.dirty}
            className={`w-full bg-[#69995D] text-white py-4 rounded-xl text-lg font-semibold shadow-lg transition duration-300 cursor-pointer ${
              !formik.isValid || !formik.dirty
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-[#394648]"
            }`}
          >
            Sign up
          </button>
        </form>

        <p className="mt-6 text-sm text-[#394648]">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-[#69995D] font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </div>

      <div className="hidden lg:flex w-1/2 relative items-center justify-center">
        <Image
          priority
          src={loginImage}
          alt="Login Background"
          className="w-full h-full object-cover brightness-75 shadow-xl"
        />
        <div className="absolute bottom-10 left-10 bg-[#394648]/50 backdrop-blur-md p-6 rounded-xl shadow-lg">
          <h2 className="text-3xl font-bold text-white">MindBloom</h2>
          <p className="text-sm text-gray-200">
            MindBloom Notes is your ultimate digital solution for organizing,
            sharing, and growing your knowledge. Whether you`re a student,
            professional, or creative thinker, our platform empowers you to
            capture ideas, create structured notes, and collaborate seamlessly.
            With features like real-time syncing, customizable templates, and
            AI-powered insights, MindBloom Notes ensures that your ideas blossom
            into actionable results. From personal journals to team projects, we
            provide the tools to cultivate your thoughts and transform them into
            meaningful outcomes.
          </p>
        </div>
      </div>
    </div>
  );
}
