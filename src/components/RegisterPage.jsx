import React from "react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

const RegisterPage = () => {
  return (
    <div className="min-h-screen flex">
      {/* Left Side - Register Form */}
      <div className="w-1/2 flex items-center justify-center bg-white p-8">
        <div className="max-w-md w-full">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Create Account</h2>
          
          {/* Full Name */}
          <input
            type="text"
            placeholder="Full Name"
            className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          {/* Email */}
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          
          {/* Password */}
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          {/* Confirm Password */}
          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          {/* Register Button */}
          <button className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition">
            Register
          </button>

          {/* Divider */}
          <div className="flex items-center my-6">
            <hr className="flex-grow border-gray-300" />
            <span className="px-4 text-gray-500">OR</span>
            <hr className="flex-grow border-gray-300" />
          </div>

          {/* Google & GitHub */}
          <div className="flex gap-4">
            <button className="flex items-center justify-center gap-2 w-1/2 border py-2 rounded-lg hover:bg-gray-100 transition">
              <FcGoogle className="text-xl" /> Google
            </button>
            <button className="flex items-center justify-center gap-2 w-1/2 border py-2 rounded-lg hover:bg-gray-100 transition">
              <FaGithub className="text-xl" /> GitHub
            </button>
          </div>

          {/* Already have account */}
          <p className="mt-6 text-sm text-gray-600 text-center">
            Already have an account?{" "}
            <a href="/login" className="text-indigo-600 font-medium hover:underline">
              Login
            </a>
          </p>
        </div>
      </div>

      {/* Right Side - Pattern */}
      <div className="w-1/2 bg-indigo-600 relative flex items-center justify-center">
        <div className="absolute inset-0 bg-indigo-700 opacity-40"></div>
        <div className="relative text-white text-center px-8">
          <h1 className="text-4xl font-bold mb-4">Join Us Today!</h1>
          <p className="text-lg">
            Create your free account and start exploring endless opportunities 🚀
          </p>
        </div>

        {/* Pattern effect */}
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_20%_20%,white,transparent_25%),radial-gradient(circle_at_80%_80%,white,transparent_25%)]"></div>
      </div>
    </div>
  );
};

export default RegisterPage;
