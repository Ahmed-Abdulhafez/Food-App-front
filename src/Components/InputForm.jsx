import React, { useState } from "react";
import axios from "axios";

const InputForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // 🔹 Helper function to validate email format
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // 🔹 Validation
    if (isSignUp) {
      if (firstName.trim().length < 3) {
        return setError("First name must be at least 3 characters long");
      }
      if (lastName.trim().length < 3) {
        return setError("Last name must be at least 3 characters long");
      }
    }

    if (!validateEmail(email)) {
      return setError("Please enter a valid email address");
    }

    if (password.trim().length < 6) {
      return setError("Password must be at least 6 characters long");
    }

    try {
      let res;
      if (isSignUp) {
        res = await axios.post("http://localhost:5000/user/register", {
          firstName,
          lastName,
          email,
          password,
        });
      } else {
        res = await axios.post("http://localhost:5000/user/signin", {
          email,
          password,
        });
      }

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      setSuccess(isSignUp ? "Sign Up Successful" : "Sign In Successful");
      console.log(success, res.data);
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 bg-white rounded-2xl shadow-md w-full max-w-sm mx-auto"
    >
      <h3 className="text-2xl font-semibold mb-6 text-center text-gray-800">
        {isSignUp ? "Sign Up" : "Sign In"}
      </h3>

      {/* First Name + Last Name (Only in Sign Up) */}
      {isSignUp && (
        <>
          <div className="mb-4">
            <label
              htmlFor="firstName"
              className="block text-sm font-medium mb-1 text-gray-700"
            >
              First Name
            </label>
            <input
              onChange={(e) => setFirstName(e.target.value)}
              id="firstName"
              type="text"
              placeholder="Enter your first name"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff5500]"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="lastName"
              className="block text-sm font-medium mb-1 text-gray-700"
            >
              Last Name
            </label>
            <input
              onChange={(e) => setLastName(e.target.value)}
              id="lastName"
              type="text"
              placeholder="Enter your last name"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff5500]"
              required
            />
          </div>
        </>
      )}

      {/* Email */}
      <div className="mb-4">
        <label
          htmlFor="email"
          className="block text-sm font-medium mb-1 text-gray-700"
        >
          Email
        </label>
        <input
          onChange={(e) => setEmail(e.target.value)}
          id="email"
          type="email"
          placeholder="Enter your email"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff5500]"
          required
        />
      </div>

      {/* Password */}
      <div className="mb-4">
        <label
          htmlFor="password"
          className="block text-sm font-medium mb-1 text-gray-700"
        >
          Password
        </label>
        <input
          onChange={(e) => setPassword(e.target.value)}
          id="password"
          type="password"
          placeholder="Enter your password"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff5500]"
          required
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-gradient-to-r from-[#ff5500] to-[#ff8800] text-white py-2 rounded-lg hover:from-[#e64a00] hover:to-[#ff6600] transition duration-200"
      >
        {isSignUp ? "Sign Up" : "Sign In"}
      </button>

      {/* Error & Success Messages */}
      {error && (
        <p className="mt-4 text-center text-sm text-red-600 font-medium">
          {error}
        </p>
      )}
      {success && (
        <p className="mt-4 text-center text-sm text-green-600 font-medium">
          {success}
        </p>
      )}

      {/* Footer */}
      <p className="mt-4 text-center text-sm text-gray-600">
        {isSignUp ? "Already have an account? " : "Don't have an account? "}
        <span
          onClick={() => {
            setIsSignUp(!isSignUp);
            setError("");
            setSuccess("");
          }}
          className="text-[#ff5500] hover:underline cursor-pointer"
        >
          {isSignUp ? "Sign In" : "Sign Up"}
        </span>
      </p>
    </form>
  );
};

export default InputForm;
