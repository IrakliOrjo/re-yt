import { useEffect, useState } from "react";
import { Button } from "../Button"
import { Navbar } from "./components/Navbar"
import { ChevronRight,  Files, Mail, Menu, PhoneIcon, User, X } from 'lucide-react';
import { LINKS } from "./components/Navbar/const";
import { useNavigate } from "react-router";
import { useAuth } from "../../contexts/AuthContext";
 



export const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [expandIndex, setExpandIndex] = useState<number | null>(null)

  const toggleExpand = (index:number) => {
    setExpandIndex(expandIndex === index ? null : index)
  }

  const { currentUser, isWhitelisted, whitelistLoading, signInWithGoogle } = useAuth();
  const [error, setError] = useState<null | string>(null);
  const navigate = useNavigate();

  // Redirect if user is logged in AND whitelisted


  const handleGoogleSignIn = async () => {
    setError(null);
    try {
      await signInWithGoogle();
      if (currentUser && isWhitelisted) {
        navigate('/dashboard');
      }

      // The redirect will happen automatically if user is whitelisted
    } catch (error) {
      console.error("Error signing in with Google:", error);
      setError("Failed to sign in with Google. Please try again.");
    }
  };
  

  return (
    <header className="flex top-0 bg-white h-[76px] justify-evenly fixed
    items-center gap-12 lg:px-[4rem] px-5  border w-full z-50">
       <div className="flex justify-between w-full items-center gap-4">
        <div className="flex gap-6">
            <h1 className="font-bold">Company Logo</h1>
            <Navbar />
        </div>
        <div className="gap-[16px] flex ">
            <Button onClick={handleGoogleSignIn} className="md:flex hidden" leftIcon={<User />} text="Sign In" transparent />
            <Button className="lg:flex hidden" leftIcon={<Files />} text="Submit Property" />
        </div>
        <button 
        className="md:hidden"
        onClick={() =>setIsOpen(!isOpen)}
        
        >{isOpen ? <X /> : <Menu />}</button>
       </div>
       <div className={`${isOpen ? 'flex' : 'hidden'} fixed md:hidden flex flex-col left-0
       h-screen w-[300px] bg-blue-50 z-50 inset-0 py-8`}>
          <div className="border-b px-8 shadow-lg">
            <h1 className="font-bold mb-3">Company Logo</h1>
          </div>
          <div className="px-8">
            <p className="border-b border-[#bbbbbb] py-8">Login / Register</p>
          </div>
          <div className="p-8">
            <ul className="flex flex-col gap-5 border-b border-[#bbbbbb] pb-8">
            {LINKS.map(({name,subLinks},index) => {
              return (
              <li
                onClick={() => toggleExpand(index)}
                className="flex flex-col"
                key={index}>
                  <div className="flex justify-between cursor-pointer hover:text-blue-500 transition-colors 
                duration-300 font-[500]">
                    {name}             
                    <ChevronRight />
                  </div>
              <div className={`${expandIndex === index ? 'flex' : 'hidden'} bg-blue-100 rounded-2xl mt-2 p-3`}>
                <ul className="flex flex-col gap-2">
                {subLinks.map(({name,url}) => {
                  return (
                    <li>
                      <a href={url}>{name}</a>
                    </li>
                  )
                })}
                </ul>
              </div>
              </li>
              )
            })}
            </ul>
          </div>
          <div className="px-8">
            <Button className="w-full justify-center mb-7 tracking-wider" text="Submit Property" />
            <div className="h-[1px] w-full bg-[#bbbbbb]"></div>
          </div>
          <div className="px-8 py-7 gap-7 flex flex-col">
            <div className="flex gap-3 ">
            <PhoneIcon />
            <p className="text-[14px] ">1-333-345-6868</p>
            </div>
            <div className="h-[1px] w-full bg-[#bbbbbb]"></div>
            <div className="flex gap-3 ">
            <Mail fill="black" stroke="white" /> 
            <p className="text-[14px] mb-7">realestatetest@gmail.com</p>
            </div>
          </div>
       </div>
    </header>
  )
}

export default Header