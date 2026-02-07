const Button = ({className, onClick, children}) => {
  return (
    <button className={`${className} py-2 px-4 bg-[#A1B7AC] border w-full border-[#286459] rounded-xl text-xl font-semibold`} onClick= {onClick}>
      {children}
    </button>
  )
}

export default Button