// "use client";
// import Link from "next/link";
// import { FC, useState } from "react";
// import Image from "next/image";
// import { usePathname } from "next/navigation";
// import logo from "./header-img/header-logo.png";
// import world from "./header-img/world.svg";
// import ham from "./header-img/ham.svg";
// import cross from "./header-img/cross.svg";
// import Container from "@/components/Container/Container";
// import Typography from "@/components/Typography/Typograpghy";
// import Button from "../Button/Button";
// import useScrollTo from "@/hooks/useScrollTo";
// import SigninIcon from "@/assets/svgs/Signin"

// const Header: FC = () => {
//     const [isOpen, setIsOpen] = useState(false);
//     const scrollTo = useScrollTo();
//     const pathname = usePathname();
//     const isLanding = pathname === "/";

//     return (
//         <header className="w-full bg-[#EEF6FFB2] fixed top-0 z-1000 backdrop-blur-[20px]">
//             <Container>
//                 <nav>
//                     {/* Desktop Header */}
//                     <div className="hidden lg:flex items-center justify-between py-4">
//                         <Link href="/" className="flex items-center gap-2 relative w-[166px] h-[50px]">
//                             <Image src={logo} alt="Parkly Logo" fill className="object-contain" sizes="100%" priority />
//                         </Link>

//                         <div className="flex gap-10">
//                             <div className="flex gap-3 items-center">
//                                 <div className="px-2.5 py-4" onClick={() => scrollTo("how-it-works", 80)}>
//                                     <Typography variant="para" className="text-black-700 custom-underline hover:text-blue-500">
//                                         How it Works
//                                     </Typography>
//                                 </div>

//                                 <div className="px-2.5 py-4" onClick={() => scrollTo("features-view")}>
//                                     <Typography variant="para" className="text-black-700 custom-underline hover:text-blue-500">
//                                         Features
//                                     </Typography>
//                                 </div>

//                                 <div className="px-2.5 py-4" onClick={() => scrollTo("faq-view")}>
//                                     <Typography variant="para" className="text-black-700 custom-underline hover:text-blue-500">
//                                         FAQ
//                                     </Typography>
//                                 </div>
//                             </div>

//                             <div className="flex gap-3 items-center">
//                                 <Link href="" className="px-[19px] py-[9px] border border-[#2C7FFF33] rounded-lg">
//                                     <div className="flex gap-2 items-center">
//                                         <div className="relative w-4 h-4">
//                                             <Image src={world} alt="world" fill className="object-contain" sizes="100%" priority />
//                                         </div>
//                                         <Typography variant="para" weight={500} className="text-black-700">
//                                             EN
//                                         </Typography>
//                                     </div>
//                                 </Link>

//                                 {/* Dynamic Desktop Button */}
//                                 <Button
//                                     text={isLanding ? "Sign in" : "Join"}
//                                     icon={isLanding ? <SigninIcon /> : undefined}
//                                     iconPosition="left"
//                                     bg="#2C7FFF33"
//                                     color="#101010"
//                                     variant="sm"
//                                     onClick={() => scrollTo("waitlist-form", 130)}
//                                 />
//                             </div>
//                         </div>
//                     </div>

//                     {/* Mobile Header */}
//                     <div className="flex lg:hidden items-center justify-between py-4">
//                         <Link href="/" className="flex items-center gap-2 relative w-[126px] h-[38px]">
//                             <Image src={logo} alt="Parkly Logo" fill className="object-contain" sizes="100%" priority />
//                         </Link>

//                         <button onClick={() => setIsOpen(true)}>
//                             <div className="p-3 bg-[#2C7FFF33] rounded-lg overflow-hidden">
//                                 <div className="relative w-5 h-4">
//                                     <Image src={ham} alt="menu" fill className="object-contain" sizes="100%" priority />
//                                 </div>
//                             </div>
//                         </button>
//                     </div>

//                     {/* Offcanvas */}
//                     <div
//                         className={`fixed top-0 right-0 h-screen w-full bg-white shadow-lg z-50 transform transition-transform duration-500 ease-in-out ${isOpen ? "translate-x-0" : "translate-x-full"
//                             }`}
//                     >
//                         <div className="flex justify-between p-4 bg-[#EEF6FFB2] backdrop-blur-[20px]">
//                             <Link href="/" className="flex items-center gap-2 relative w-[126px] h-[38px]">
//                                 <Image src={logo} alt="Parkly Logo" fill className="object-contain" sizes="100%" priority />
//                             </Link>

//                             <button onClick={() => setIsOpen(false)}>
//                                 <div className="relative w-6 h-6">
//                                     <Image src={cross} alt="close" fill className="object-contain" sizes="100%" priority />
//                                 </div>
//                             </button>
//                         </div>

//                         <nav className="flex flex-col gap-4 mt-8 px-6 bg-white">
//                             <div className="flex flex-col gap-3">
//                                 <div onClick={() => { scrollTo("how-it-works", 80); setIsOpen(false); }}>
//                                     <Typography variant="para" className="text-black-700 custom-underline hover:text-blue-500 pt-1 pb-2 px-2.5">
//                                         How it Works
//                                     </Typography>
//                                 </div>
//                                 <div onClick={() => { scrollTo("features-view"); setIsOpen(false); }}>
//                                     <Typography variant="para" className="text-black-700 custom-underline hover:text-blue-500 pt-1 pb-2 px-2.5">
//                                         Features
//                                     </Typography>
//                                 </div>
//                                 <div onClick={() => { scrollTo("faq-view"); setIsOpen(false); }}>
//                                     <Typography variant="para" className="text-black-700 custom-underline hover:text-blue-500 pt-1 pb-2 px-2.5">
//                                         FAQ
//                                     </Typography>
//                                 </div>
//                             </div>

//                             <div className="flex justify-between gap-4">
//                                 <div className="flex items-center gap-3 w-full justify-center border border-[#2C7FFF33] rounded-lg">
//                                     <div className="relative w-4 h-4">
//                                         <Image src={world} alt="world" fill className="object-contain" sizes="100%" priority />
//                                     </div>
//                                     <Typography variant="body" weight={500} className="text-black-900">
//                                         EN
//                                     </Typography>
//                                 </div>

//                                 {/* Dynamic Mobile Button */}
//                                 <Button
//                                     text={isLanding ? "Sign in" : "Join"}
//                                     icon={isLanding ? <SigninIcon /> : undefined}
//                                     iconPosition="left"
//                                     bg="#2C7FFF33"
//                                     color="#101010"
//                                     variant="sm"
//                                     className="w-full"
//                                     onClick={() => {
//                                         scrollTo("waitlist-form", 130);
//                                         setIsOpen(false);
//                                     }}
//                                 />
//                             </div>
//                         </nav>
//                     </div>

//                     {/* Overlay */}
//                     {isOpen && <div className="fixed inset-0 bg-black/30 z-40" onClick={() => setIsOpen(false)} />}
//                 </nav>
//             </Container>
//         </header>
//     );
// };

// export default Header;







"use client";
import Link from "next/link";
import { FC, useState } from "react";
import Image from "next/image";
import logo from "./header-img/header-logo.png";
import world from "./header-img/world.svg";
import ham from "./header-img/ham.svg";
import cross from "./header-img/cross.svg";
import Container from "@/components/Container/Container";
import Typography from "@/components/Typography/Typograpghy";
import Button from "../Button/Button";
import useScrollTo from "@/hooks/useScrollTo";

const Header: FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const scrollTo = useScrollTo();

    return (
        <header className="w-full bg-[#EEF6FFB2] fixed top-0 z-1000 backdrop-blur-[20px]">
            <Container>
                <nav>
                    {/* Desktop Header */}
                    <div className="hidden lg:flex items-center justify-between py-4">
                        <Link href="/" className="flex items-center gap-2 relative w-[166px] h-[50px]">
                            <Image src={logo} alt="Parkly Logo" fill className="object-contain" sizes="100%" priority />
                        </Link>

                        <div className="flex gap-10">
                            <div className="flex gap-3 items-center">
                                <div className="px-2.5 py-4" onClick={() => scrollTo("how-it-works")}>
                                    <Typography variant="para" className="text-black-700 custom-underline hover:text-blue-500">
                                        How it Works
                                    </Typography>
                                </div>

                                <div className="px-2.5 py-4" onClick={() => scrollTo("features-view")}>
                                    <Typography variant="para" className="text-black-700 custom-underline hover:text-blue-500">
                                        Features
                                    </Typography>
                                </div>

                                <div className="px-2.5 py-4" onClick={() => scrollTo("faq-view")}>
                                    <Typography variant="para" className="text-black-700 custom-underline hover:text-blue-500">
                                        FAQ
                                    </Typography>
                                </div>
                            </div>

                            <div className="flex gap-3 items-center">
                                <div className="px-[19px] py-[9px] border border-[#2C7FFF33] rounded-lg">
                                    <div className="flex gap-2 items-center">
                                        <div className="relative w-4 h-4">
                                            <Image src={world} alt="world" fill className="object-contain" sizes="100%" priority />
                                        </div>
                                        <Typography variant="para" weight={500} className="text-black-700">
                                            EN
                                        </Typography>
                                    </div>
                                </div>

                                {/* Static Desktop Button */}
                                <Button
                                    text="Join"
                                    bg="#2C7FFF33"
                                    color="#101010"
                                    variant="sm"
                                    onClick={() => scrollTo("waitlist-form")}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Mobile Header */}
                    <div className="flex lg:hidden items-center justify-between py-4">
                        <Link href="/" className="flex items-center gap-2 relative w-[126px] h-[38px]">
                            <Image src={logo} alt="Parkly Logo" fill className="object-contain" sizes="100%" priority />
                        </Link>

                        <button onClick={() => setIsOpen(true)}>
                            <div className="p-3 bg-[#2C7FFF33] rounded-lg overflow-hidden">
                                <div className="relative w-5 h-4">
                                    <Image src={ham} alt="menu" fill className="object-contain" sizes="100%" priority />
                                </div>
                            </div>
                        </button>
                    </div>

                    {/* Offcanvas */}
                    <div
                        className={`fixed top-0 right-0 h-screen w-full bg-white shadow-lg z-50 transform transition-transform duration-500 ease-in-out ${isOpen ? "translate-x-0" : "translate-x-full"
                            }`}
                    >
                        <div className="flex justify-between p-4 bg-[#EEF6FFB2] backdrop-blur-[20px]">
                            <Link href="/" className="flex items-center gap-2 relative w-[126px] h-[38px]">
                                <Image src={logo} alt="Parkly Logo" fill className="object-contain" sizes="100%" priority />
                            </Link>

                            <button onClick={() => setIsOpen(false)}>
                                <div className="relative w-6 h-6">
                                    <Image src={cross} alt="close" fill className="object-contain" sizes="100%" priority />
                                </div>
                            </button>
                        </div>

                        <nav className="flex flex-col gap-4 mt-8 px-6 bg-white">
                            <div className="flex flex-col gap-3">
                                <div onClick={() => { scrollTo("how-it-works"); setIsOpen(false); }}>
                                    <Typography variant="para" className="text-black-700 custom-underline hover:text-blue-500 pt-1 pb-2 px-2.5">
                                        How it Works
                                    </Typography>
                                </div>
                                <div onClick={() => { scrollTo("features-view"); setIsOpen(false); }}>
                                    <Typography variant="para" className="text-black-700 custom-underline hover:text-blue-500 pt-1 pb-2 px-2.5">
                                        Features
                                    </Typography>
                                </div>
                                <div onClick={() => { scrollTo("faq-view"); setIsOpen(false); }}>
                                    <Typography variant="para" className="text-black-700 custom-underline hover:text-blue-500 pt-1 pb-2 px-2.5">
                                        FAQ
                                    </Typography>
                                </div>
                            </div>

                            <div className="flex justify-between gap-4">
                                <div className="flex items-center gap-3 w-full justify-center border border-[#2C7FFF33] rounded-lg">
                                    <div className="relative w-4 h-4">
                                        <Image src={world} alt="world" fill className="object-contain" sizes="100%" priority />
                                    </div>
                                    <Typography variant="body" weight={500} className="text-black-900">
                                        EN
                                    </Typography>
                                </div>

                                {/* Static Mobile Button */}
                                <Button
                                    text="Join"
                                    bg="#2C7FFF33"
                                    color="#101010"
                                    variant="sm"
                                    className="w-full"
                                    onClick={() => {
                                        scrollTo("waitlist-form");
                                        setIsOpen(false);
                                    }}
                                />
                            </div>
                        </nav>
                    </div>

                    {/* Overlay */}
                    {isOpen && <div className="fixed inset-0 bg-black/30 z-40" onClick={() => setIsOpen(false)} />}
                </nav>
            </Container>
        </header>
    );
};

export default Header;

