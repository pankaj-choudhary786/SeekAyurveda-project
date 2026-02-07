import meditate from "../assets/loginHero.png";

const ContactUs = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen bg-[#F5F1EE] flex items-center justify-center p-6 md:p-12 font-sans pt-17 md:pt-20 pb-7">
      <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-[0.7fr_1fr] gap-12 items-stretch">
        <div className="hidden md:block w-full overflow-hidden rounded-2xl shadow-xl">
          <img
            src={meditate}
            alt="Ayurveda Wellness"
            className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-1000 ease-in-out scale-105 hover:scale-100"
          />
        </div>

        <div className="flex flex-col justify-between">
          <header className="space-y-2 mb-8">
            <h1 className="text-6xl md:text-7xl font-black text-black tracking-tighter uppercase leading-none">
              Get In <br /> Touch
            </h1>
            <p className="text-gray-500 font-medium tracking-wide text-sm md:text-base uppercase ml-1">
              Seek balance. Start your journey with us.
            </p>
          </header>

          <div className="flex-grow border-t border-l border-black p-8 md:p-14 bg-white/20 backdrop-blur-sm flex flex-col justify-center">
            <form onSubmit={handleSubmit} className="space-y-10">
              <div className="group relative">
                <label className="block text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400 group-focus-within:text-black transition-colors mb-1">
                  Full Name
                </label>
                <input
                  required
                  type="text"
                  placeholder="Enter your name"
                  className="w-full bg-transparent border-b border-black/20 py-3 outline-none focus:border-black transition-all placeholder:text-gray-300 text-base"
                />
              </div>

              <div className="group relative">
                <label className="block text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400 group-focus-within:text-black transition-colors mb-1">
                  E-mail Address
                </label>
                <input
                  required
                  type="email"
                  placeholder="email@example.com"
                  className="w-full bg-transparent border-b border-black/20 py-3 outline-none focus:border-black transition-all placeholder:text-gray-300 text-base"
                />
              </div>

              <div className="group relative">
                <label className="block text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400 group-focus-within:text-black transition-colors mb-1">
                  Message
                </label>
                <textarea
                  required
                  rows="2"
                  placeholder="How can we assist you?"
                  className="w-full bg-transparent border-b border-black/20 py-3 outline-none focus:border-black transition-all resize-none placeholder:text-gray-300 text-base"
                />
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-8">
                <button
                  type="submit"
                  className="bg-black text-white px-16 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-gray-800 transition-all hover:shadow-lg active:scale-95 w-full sm:w-auto"
                >
                  Send Message
                </button>
                
                <div className="hidden lg:flex flex-col">
                  <span className="text-[10px] font-bold uppercase text-gray-400 tracking-widest">Inquiries</span>
                  <span className="text-xs font-bold">hi@seekayurveda.com</span>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;