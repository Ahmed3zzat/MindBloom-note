"use client";
import { useFormik } from "formik";
import Link from "next/link";
import Image from "next/image";
import * as Yup from "yup";
import loginImage from "@/assets/images/HomePage.jpg";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/hooks/store.hook";
import { setLogin } from "@/store/user.slice";

export default function Login() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const validationSchema = Yup.object().shape({
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
  });

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema,
    onSubmit: (values) => {
      dispatch(setLogin(values))
        .then((response) => {
          console.log(response);
          
          if (response.payload.msg == "done") {
            setTimeout(() => {
              router.push("/");
            }, 3000);
          }
        })
        .catch(() => {
          // console.log(error);
        });
    },
  });

  return (
    <div className="min-h-screen flex bg-[#F8E9E9]">
      <div className="lg:w-1/2 w-full flex flex-col items-center justify-center p-12 bg-white shadow-2xl">
        <h1 className="text-5xl font-extrabold text-[#394648] mb-8">
          MindBloom
        </h1>

        <form
          className="w-full max-w-md space-y-5"
          onSubmit={formik.handleSubmit}
        >
          <div className="relative">
            <input
              type="email"
              name="email"
              id="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter your email"
              required
              className="w-full px-4 py-4 text-lg bg-[#F8E9E9] border border-[#EDB6A3] rounded-lg focus:ring-2 focus:ring-[#CBAC88] focus:bg-white"
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
            )}
          </div>

          <div className="relative mt-7">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter your password"
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

          <button
            type="submit"
            disabled={!formik.isValid || !formik.dirty}
            className={`cursor-pointer w-full bg-[#69995D] text-white py-4 rounded-xl text-lg font-semibold shadow-lg transition duration-300 ${
              !formik.isValid || !formik.dirty
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-[#394648]"
            }`}
          >
            Log in
          </button>
        </form>

        <p className="mt-6 text-sm text-[#394648]">
          Don’t have an account?{" "}
          <Link
            href="/signup"
            className="text-[#69995D] font-semibold hover:underline"
          >
            Signup
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
