"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import logo from "@/assets/images/logo.png";
import { motion } from "framer-motion";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-900 to-indigo-900 text-white">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center space-y-6"
      >
        <Image
          src={logo}
          alt="Mindbloom Logo"
          width={200}
          height={200}
          className="mb-8"
        />
        <h1 className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">
          404
        </h1>
        <h2 className="text-4xl font-semibold">Oops! Page Not Found</h2>
        <p className="text-lg text-gray-300">
          The page you`re looking for doesn`t exist or has been moved.
        </p>
        <div className="flex gap-4 justify-center">
        <Link href="/notes">
          <button
            onClick={() => router.back()}
            className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition-all duration-300"
          >
            Go Back
          </button>
          </Link>
          <Link href="/">
            <button className="bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition-all duration-300">
              Return Home
            </button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}