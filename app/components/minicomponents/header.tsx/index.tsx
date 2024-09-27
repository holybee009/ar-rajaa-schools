"use client"
// components/Header.tsx
import { useState } from 'react';
import Navbar from '../navbar';
import Image from 'next/image';
import Logo from "../../images/ar-rajaa logo1.png"
import Home from "../../icons/home.svg"
import Link from 'next/link';
import Menu from "../../icons/menu.svg"
interface HeaderProps {
    handleScroll?: (_: string) => void
    home:boolean
    status?: string
    about?: string
}


const Header: React.FC<HeaderProps> = ({ handleScroll, home, status, about }) => {
    const [nav, setShowNav] = useState<boolean>(false)
    const showNav = () => {
     setShowNav(true)
    }
    const hideNav = () =>{
      setShowNav(false)
    }

  return (
    <>
    <nav className="bg-[#0D3C1D] p-2 px-6 md:px-16 flex items-center justify-between fixed w-full z-50">
      <div className="flex items-center justify-center gap-3">
        <Image src={Logo} alt='logo' width={35} height={35} className='w-8 h-8 md:w-auto md:h-auto'/>
        <p className="capitalize text-white font-bold text-xs sm:text-auto">ar-rajaa schools</p>
      </div>
      <div className='text-md md:text-xl text-white capitalize'>{status}</div> 
      { home ? <div>
        <Image src={Menu} alt='menu' width={24} height={24} className='block md:hidden' onClick={showNav}/>
          <Navbar closeNav={hideNav} handleScroll={handleScroll} about={about} classNames={nav ? "block md:block h-full shadow shadow-xl z-30" : "hidden md:block"} className="text-end mt-5 mb-3 self-end mr-4"  hideNav={hideNav}/>
           </div>
         : <Link href="/" className='flex items-center gap-1 justify-center'>
        <Image src={Home} alt='hoome' width={24} height={24} />
        <p className='capitalize cursor-pointer text-white'>home</p>
        </Link> }
    </nav>
    </>
  );
};

export default Header;
