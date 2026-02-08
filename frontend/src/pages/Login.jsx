import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api";
import google from "../assets/google.png";
import meditate from "../assets/loginHero.png";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const { data } = await loginUser({
        email: formData.email,
        password: formData.password,
      });

      // 1. Save token and user info to Local Storage
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // 2. REDIRECT TO DASHBOARD (Changed from "/" to "/dashboard")
      navigate("/dashboard");

      // Optional: Refresh page to update Header state immediately
      window.location.reload();
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Login failed. Please check your credentials.",
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
                Sign In
              </h1>
              <p className="text-sm lg:text-base font-medium mt-2">
                Don't have an account yet?{" "}
                <button
                  type="button"
                  className="text-[#1e4a42] font-semibold hover:underline"
                  onClick={() => navigate("/signup")}
                >
                  Sign up here
                </button>
              </p>
            </header>

            {/* Error Message Display */}
            {error && (
              <div className="p-3 text-sm text-red-600 bg-red-50 rounded-lg border border-red-200">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
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
                <div className="flex justify-between items-center">
                  <label htmlFor="password" className="font-medium text-sm">
                    Password
                  </label>
                  <button
                    type="button"
                    className="text-[#1e4a42] text-sm font-semibold hover:underline"
                  >
                    Forgot password?
                  </button>
                </div>
                <input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  placeholder="Enter password"
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
                Sign In
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
                  Sign in with Google
                </span>
              </button>

              <p className="text-xs text-center text-gray-500 pt-4 leading-relaxed">
                By signing in or creating new account, you are agreeing to our{" "}
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
            <h2 className="text-4xl font-bold">Welcome To SeekAyurveda</h2>
            <p className="max-w-md mx-auto text-gray-100 opacity-80">
              Discover the ancient wisdom of healing and balance for your modern
              lifestyle.
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

export default Login;
