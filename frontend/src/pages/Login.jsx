import google from "../assets/google.png";
import meditate from "../assets/loginHero.png";

const Login = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="grid md:grid-cols-2 w-full min-h-screen">
        <div className="flex flex-col justify-center items-center p-8 lg:p-16">
          <div className="w-full max-w-md space-y-6">
            <header>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">Sign In</h1>
              <p className="text-sm lg:text-base font-medium mt-2">
                Don't have an account yet?{" "}
                <button
                  type="button"
                  className="text-[#1e4a42] font-semibold hover:underline"
                >
                  Sign up here
                </button>
              </p>
            </header>

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
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label htmlFor="pwd" className="font-medium text-sm">
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
                  id="pwd"
                  type="password"
                  autoComplete="current-password"
                  placeholder="Enter password"
                  className="w-full p-3 rounded-lg ring-1 ring-black/10 focus:ring-2 focus:ring-[#1e4a42] outline-none transition-all"
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
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Or continue with</p>
                <hr className="flex-grow border-t border-gray-200" />
              </div>

              <button
                type="button"
                className="w-full flex items-center justify-center gap-3 bg-white hover:bg-gray-50 py-3 rounded-lg ring-1 ring-gray-300 transition-colors"
              >
                <img src={google} alt="Google" className="h-5 w-auto" />
                <span className="text-sm font-semibold">Sign in with Google</span>
              </button>

              <p className="text-xs text-center text-gray-500 pt-4 leading-relaxed">
                By signing in or creating new account, you are agreeing to our{" "}
                <button type="button" className="text-[#2c60d1] hover:underline font-semibold">
                  Terms & Conditions
                </button>{" "}
                and{" "}
                <button type="button" className="text-[#2c60d1] hover:underline font-semibold">
                  Privacy Policy
                </button>.
              </p>
            </form>
          </div>
        </div>

        <div className="hidden md:flex flex-col items-center justify-center bg-[#1e4a42] text-white p-12 w-full h-full">
          <div className="text-center space-y-6">
            <h2 className="text-4xl font-bold">Welcome To SeekAyurveda</h2>
            <p className="max-w-md mx-auto text-gray-100 opacity-80">
              Discover the ancient wisdom of healing and balance for your modern lifestyle.
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