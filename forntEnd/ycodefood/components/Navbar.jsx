import { useState } from 'react'
import Link from 'next/link'
import { useContext } from "react";
import { Context } from "../context/Context";
import { useRouter } from "next/router";
import FinalModal from "../components/finalModal"


function MobileNav({ open, setOpen }) {


    return (
        <div className={`fixed top-0 left-0 h-screen w-screen bg-white transform ${open ? "-translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out filter drop-shadow-md `}>
            <div className="flex items-center justify-center filter drop-shadow-md bg-white h-20"> {/*logo container*/}
                <Link href="/">
                    <a className="text-xl font-semibold">YouCode <span className="text-sky-700">Food</span></a>
                </Link>
            </div>
            <div className="flex flex-col ml-4">
                <Link href="/about">
                    <a className='text-xl font-normal my-4 hover:text-sky-700 cursor-pointer'>
                        About
                    </a>
                </Link>
                <Link href="/contact" >
                    <a className="text-xl font-normal my-4 hover:text-sky-700 cursor-pointer">
                        Contact
                    </a>
                </Link>
                <Link href="/">
                    <a className="text-xl font-normal my-4 hover:text-sky-700 cursor-pointer">
                        Home
                    </a>
                </Link>
                <Link href="/Login">
                    <a className="text-xl font-normal my-4 hover:text-sky-700 cursor-pointer">
                        Login
                    </a>
                </Link>
                <Link href="/register">
                    <a className="text-xl font-normal my-4 hover:text-sky-700 cursor-pointer">
                        register
                    </a>
                </Link>

                <Link href="/Dashboard">
                    <a className="text-xl font-normal my-4 hover:text-sky-700 cursor-pointer">
                        DASHBOARD
                    </a>
                </Link>
            </div>
        </div>
    )
}

export default function Navbar() {


    const { user, dispatch } = useContext(Context);
    const [open, setOpen] = useState(false)
    const router = useRouter();

    const handleLogout = () => {
        dispatch({ type: "LOGOUT" });
        router.push("/");
    }
    return (
        <nav className="flex filter drop-shadow-md bg-white px-4 py-4 h-20 items-center">
            <MobileNav open={open} setOpen={setOpen} />
            <div className="w-3/12 flex items-center">
                <Link href="/">
                    <a className="text-xl font-semibold">YouCode <span className="text-sky-700">Food</span></a>
                </Link>
            </div>
            <div className="w-9/12 flex justify-end items-center">

                <div className="z-50 flex relative w-8 h-8 flex-col justify-between items-center md:hidden" onClick={() => {
                    setOpen(!open)
                }}>
                    {/* hamburger button */}
                    <span className={`h-1 w-full bg-black rounded-lg transform transition duration-300 ease-in-out ${open ? "rotate-45 translate-y-3.5" : ""}`} />
                    <span className={`h-1 w-full bg-black rounded-lg transition-all duration-300 ease-in-out ${open ? "w-0" : "w-full"}`} />
                    <span className={`h-1 w-full bg-black rounded-lg transform transition duration-300 ease-in-out ${open ? "-rotate-45 -translate-y-3.5" : ""}`} />
                </div>

                <div className="hidden md:flex">
                    <Link href="/contact">
                        <a className="hover:text-sky-700 mr-2.5 cursor-pointer" >
                            ABOUT
                        </a>
                    </Link>
                    {(user?.user?.role._id == "62a64f623c198132787d053a") && (
                        <Link href="/Reservation">
                            <a className="hover:text-sky-700 mr-2.5 cursor-pointer" >
                                RESERVATION
                            </a>
                        </Link>
                    )
                    }

                    <Link href="/">
                        <a className="hover:text-sky-700 mr-2.5 cursor-pointer" >
                            HOME
                        </a>
                    </Link>
                    {!user?.token &&

                        <>
                            <Link href="/Login">
                                <a className="hover:text-sky-700 mr-2.5 cursor-pointer" >
                                    LOGIN
                                </a>
                            </Link>
                        </>

                    }



                    {(user?.user?.role._id == "62a6533d639864025cc74418") && (
                        <>
                            <Link href="/Dashboard">
                                <a className="hover:text-sky-700 mr-2.5 cursor-pointer" >
                                    DASHBOARD
                                </a>
                            </Link>
                            <Link href="/Register">
                                <a className="hover:text-sky-700 mr-2.5 cursor-pointer" >
                                    REGISTER
                                </a>
                            </Link>
                        </>
                    )

                    }
                    <>
                        {user?.token &&
                            (
                                <>
                                    <div onClick={handleLogout}>
                                        <a className="hover:text-sky-700 cursor-pointer" >LOGOUT</a>
                                    </div>
                                </>
                            )

                        }

                        {user?.token && (

                            <Link href="/Card">
                                <a className="hover:text-sky-700 ml-2.5 cursor-pointer" >
                                    CARD
                                </a>
                            </Link>
                        )

                        }
                    </>






                </div>
            </div>
        </nav>
    )
}