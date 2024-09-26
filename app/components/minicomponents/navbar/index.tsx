"use client";
// components/Navbar.tsx
import { useState } from 'react';
import Modal from '../../atoms/modal';
import Cancel from "../../icons/cancel.svg"
import Image from 'next/image';

interface NavbarProps {
    handleScroll?: (_: string) => void;
    about?: string; // Ensure 'about' can be undefined or a string
    className?:string;
    classNames?: string;
    hideNav: () => void;
    closeNav: () => void
}

const Navbar: React.FC<NavbarProps> = ({ handleScroll, about, className, classNames, hideNav, closeNav }) => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const [show, setShow] = useState<boolean>(false);

    const navItems: string[] = ["about us", "news", "events", "admissions"];

    // Handle multiple actions when an item is clicked
    const handleClick = (index: number, actions: string) => {
        closeNav()
        setActiveIndex(index); // Set the clicked item as active
        if (handleScroll) {
            handleScroll(actions);
        }
        if (actions === "about us") {
            setShow(true);
        }
    };

    return (
        <div>
        <div className={`bg-[#fff] w-1/2 md:w-full h-screen md:h-auto absolute top-0 right-0 md:static ${classNames} flex flex-col`}>
        <Image src={Cancel} alt="cancel" width={24} height={24} className={`${className} cursor-pointer md:hidden`} onClick={hideNav}/>
            <nav className="bg-[#fff] md:bg-[#0D3C1D] p-4">
                <ul className="flex flex-col md:flex-row gap-5 md:space-x-4">
                    {navItems.map((item, index) => (
                        <li key={item}> {/* Use item as the key instead of index */}
                            <button
                                onClick={() => handleClick(index, item)}
                                className={`px-4 py-2 rounded-md text-white focus:outline-none transition-all duration-300 capitalize w-full md:w-auto
                                    ${activeIndex === index ? 'bg-[#48CF76]' : 'bg-green-700 hover:bg-green-600'}
                                `}
                            >
                                {item}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
        {<Modal show={show} onClose={() => setShow(false)}>
            <div className='text-black text-center'>
                    <h1 className='text-center text-2xl uppercase pb-3'>About Us</h1>
                    <p>{about ? about : "No information available."}</p> 
                </div>
            </Modal>}
        </div>
    );
};

export default Navbar;
