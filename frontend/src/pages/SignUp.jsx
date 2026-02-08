import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api";  
import google from "../assets/google.png";
import meditate from "../assets/loginHero.png";  

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Call the register endpoint
      await registerUser({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      // On success, alert user and redirect to login
      alert("Account created successfully! Please log in.");
      navigate("/login");
    } catch (err) {
      alert(
        err.response?.data?.message || "Registration failed. Please try again.",
      );
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="grid md:grid-cols-2 w-full min-h-screen">
        <div className="flex flex-col justify-center items-center p-8 lg:p-16">
          <div className="w-full max-w-md space-y-6">
            <header>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">
                Create Account
              </h1>
              <p className="text-sm lg:text-base font-medium mt-2">
                Already have an account?{" "}
                <button
                  type="button"
                  className="text-[#1e4a42] font-semibold hover:underline"
                  onClick={() => navigate("/login")}
                >
                  Sign in here
                </button>
              </p>
            </header>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name Input - Added for Signup */}
              <div className="space-y-2">
                <label htmlFor="name" className="block font-medium text-sm">
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  className="w-full p-3 rounded-lg ring-1 ring-black/10 focus:ring-2 focus:ring-[#1e4a42] outline-none transition-all"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="block font-medium text-sm">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="Enter email address"
                  className="w-full p-3 rounded-lg ring-1 ring-black/10 focus:ring-2 focus:ring-[#1e4a42] outline-none transition-all"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="font-medium text-sm">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  autoComplete="new-password"
                  placeholder="Create a password"
                  className="w-full p-3 rounded-lg ring-1 ring-black/10 focus:ring-2 focus:ring-[#1e4a42] outline-none transition-all"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 mt-4 text-white bg-[#1e4a42] rounded-lg font-medium hover:opacity-90 transition-opacity"
              >
                Sign Up
              </button>

              <div className="flex justify-center items-center gap-4 my-6">
                <hr className="flex-grow border-t border-gray-200" />
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Or continue with
                </p>
                <hr className="flex-grow border-t border-gray-200" />
              </div>

              <button
                type="button"
                className="w-full flex items-center justify-center gap-3 bg-white hover:bg-gray-50 py-3 rounded-lg ring-1 ring-gray-300 transition-colors"
              >
                <img src={google} alt="Google" className="h-5 w-auto" />
                <span className="text-sm font-semibold">
                  Sign up with Google
                </span>
              </button>

              <p className="text-xs text-center text-gray-500 pt-4 leading-relaxed">
                By creating an account, you agree to our{" "}
                <button
                  type="button"
                  className="text-[#2c60d1] hover:underline font-semibold"
                >
                  Terms & Conditions
                </button>{" "}
                and{" "}
                <button
                  type="button"
                  className="text-[#2c60d1] hover:underline font-semibold"
                >
                  Privacy Policy
                </button>
                .
              </p>
            </form>
          </div>
        </div>

        <div className="hidden md:flex flex-col items-center justify-center bg-[#1e4a42] text-white p-12 w-full h-full">
          <div className="text-center space-y-6">
            <h2 className="text-4xl font-bold">Join SeekAyurveda</h2>
            <p className="max-w-md mx-auto text-gray-100 opacity-80">
              Start your journey to holistic wellness today.
            </p>
            <img
              src={meditate}
              alt="Hero"
              className="max-w-md w-full mx-auto rounded-3xl drop-shadow-2xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
