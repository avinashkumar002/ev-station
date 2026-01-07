"use client";
import Container from "@/components/Container/Container";
import Typography from "@/components/Typography/Typograpghy";
import { FC, useState, Suspense } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import device from "@/assets/images/device.png"
import Image from "next/image";
import Button from "@/components/Button/Button";
import glass from "@/assets/svgs/glass.svg"
import book from "@/assets/svgs/book.svg"
import paid from "@/assets/svgs/paid.svg"
import car from "@/assets/svgs/feature-car.svg"
import realtime from "@/assets/svgs/real-time.svg"
import tick from "@/assets/svgs/tick.svg"
import verified from "@/assets/svgs/verifid.svg"
import arrow from "@/assets/svgs/arrow.svg"
import calender from "@/assets/svgs/calender.svg"
import dots from "@/assets/svgs/dots.svg"
import star from "@/assets/svgs/star.svg"
import BackgroundWave from "@/assets/svgs/BackgroundWave";
import FaqCar from "@/assets/svgs/FaqCar";
import ProfileIcon from "@/assets/svgs/ProfileIcon";
import parkedCar from "@/assets/svgs/parked-car.svg"
import EffortCard from "@/components/molecules/EffortCard";
import FeatureCard from "@/components/molecules/FeatureCards"
import FaqList from "@/components/molecules/Faq/FaqList";
import InputGroup from "@/components/InputGroup/InputGroup";
import EmailIcon from "@/assets/svgs/EmailIcon";
import PhoneIcon from "@/assets/svgs/PhoneIcon";
import AnimatedCarSection from "@/components/molecules/AnimatedCarSection";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useScrollTo from "@/hooks/useScrollTo";
import toast from 'react-hot-toast';
import { useRouter } from "next/navigation";

import { contactSchema, ContactFormValues } from "@/schemas/contactSchema";
import ScrollHandler from "@/components/molecules/ScrollHandle";

const WaitlistPage: FC = () => {
 const isMd = useMediaQuery('(min-width: 768px)');
 const scrollTo = useScrollTo();
 const [showAll, setShowAll] = useState(false);

 const handleScrollAndSelect = (role: "driver" | "host") => {
 setValue("role", role, {
 shouldValidate: false,
 shouldDirty: true,
 shouldTouch: true
 });
 scrollTo("waitlist-form");
 };

 const slides = [
 {
 mainIcon: realtime,
 mainIconAlt: "realtime map",
 title: "Real-Time Charging point Maps",
 subtitle: "Find available EV chargers instantly with our live, dynamic map interface.",
 chipText: "Live Updates",
 chipIcon: undefined,
 chipIconBg: true,
 },
 {
 mainIcon: arrow,
 mainIconAlt: "arrow",
 title: "Simple Booking & Management",
 subtitle: "Book, manage, or cancel charging sessions easily in just a few taps.",
 chipText: "3 Simple Steps",
 chipIcon: dots,
 chipIconBg: false,
 },
 {
 mainIcon: verified,
 mainIconAlt: "verified",
 title: "Verified Secure Chargers",
 subtitle: "All charging points are verified to ensure safe, reliable charging always.",
 chipText: "100% Verified Hosts",
 chipIcon: tick,
 chipIconBg: true,
 },
 {
 mainIcon: calender,
 mainIconAlt: "calendar",
 title: "Event-Friendly Charger Discovery",
 subtitle: "Find chargers near you and compare distance, reviews, and availability.",
 chipText: "Event Optimized",
 chipIcon: star,
 chipIconBg: true,
 },
 ];


 const router = useRouter();
 const {
 register,
 handleSubmit,
 formState: { errors },
 reset,
 setValue
 } = useForm<ContactFormValues>({
 resolver: zodResolver(contactSchema),
 });

 const onSubmit = async (data: ContactFormValues) => {
 const loadingToast = toast.loading("Submitting...");
 try {
 const submissionData = {
 ...data,
 previousURL: window.location.pathname,
 ip: "Unknown",
 browserInfo: navigator.userAgent,
 };
 const [sheetResult, emailResult] = await Promise.allSettled([
 fetch("/api/submit-waitlist", {
 method: "POST",
 headers: { "Content-Type": "application/json" },
 body: JSON.stringify(submissionData),
 }).then(res => res.json()),

 fetch("/api/send-mail", {
 method: "POST",
 headers: { "Content-Type": "application/json" },
 body: JSON.stringify(submissionData),
 }).then(res => res.json())
 ]);
 const sheetSuccess = sheetResult.status === "fulfilled" && sheetResult.value.success;
 if (sheetSuccess) {
 toast.dismiss(loadingToast);
 reset();
 router.push("/thankyou");
 } else {
 const errorMsg = sheetResult.status === "rejected"
 ? sheetResult.reason?.toString()
 : sheetResult.value?.error || "Failed to submit form";
 toast.error(errorMsg, { id: loadingToast });
 }
 } catch (err) {
 toast.error("An error occurred. Please try again.", { id: loadingToast });
 console.error("Submit error:", err);
 }
 };
 const initialCount = 5;
 const handleToggleFaqs = () => {
 setShowAll(prev => !prev);
 };

 return (
 <>
 <Suspense fallback={null}>
 <ScrollHandler />
 </Suspense>

 {/* Hero Section */}
 <section className="relative bg-[url('/find-bg.svg')] md:bg-[url('/find-bg-desk.svg')] bg-cover bg-center bg-no-repeat">
 <Container>
 <div className="find-container flex gap-8 py-8 md:pt-[70px] md:pb-0 ">
 <div className=" w-full flex flex-col justify-center gap-6 md:gap-8">
 <div className="flex flex-col gap-4">
 <Typography variant="h1" weight={700} letterSpacing={0.01} className="text-black-900 text-center md:text-left">
 Find Smart, Reliable EV Charging — Anytime, <span className="text-blue-500"> Anywhere.</span>
 </Typography>
 <Typography variant="body" weight={400} lineHeight={isMd ? 28 : 24} className="text-black-900 text-center md:text-left">
 ChargeMate connects <b> EV Drivers and Charger Hosts</b> with verified, private EV charging points nearby. No more range anxiety. Save time and power.
 </Typography>
 </div>
 <div className="flex flex-col gap-3">
 <div className="flex flex-col md:flex-row gap-3 md:gap-6 items-center ">
 <div className="w-full md:w-auto">
 <Button
 text="Join as a Charger Host"
 onClick={() => handleScrollAndSelect("host")}
 variant="lg"
 bg="#2C7FFF"
 color="#FFFFFF"
 hoverBg="#101010"
 boxShadow="1px 2px 24px 0px #13245733"
 className="w-full md:w-auto"
 />
 </div>
 <div className="w-full md:w-auto">
 <Button
 text="Join as a Driver"
 onClick={() => handleScrollAndSelect("driver")}
 variant="lg"
 bg="#2C7FFF1A"
 color="#1B62F5"
 hoverBg="#2C7FFF1A"
 className="w-full md:w-auto"
 />
 </div>
 </div>
 <Typography variant="para" weight={500} lineHeight={isMd ? 24 : 20} className="text-black-900 italic">
 Launching nationwide soon
 </Typography>
 </div>
 </div>
 <div className="hidden md:block w-full max-w-[524px]">
 <div className="flex justify-center relative w-full h-full min-h-[450px] ">
 <Image
 src={device}
 alt="world"
 fill
 className="object-contain"
 sizes="100%"
 priority
 />
 </div>
 </div>
 </div>
 </Container>
 </section>

 {/* How It Works */}
 <section id="how-it-works" className="scroll-mt-15">
 <Container>
 <div className="flex flex-col gap-8 md:gap-15 pt-8 pb-5 md:py-[70px] ">
 <div className="flex flex-col gap-1 md:gap-2">
 <div className="w-max py-1.5 px-3 bg-[#D9EBFF] backdrop-blur-sm rounded-3xl" >
 <Typography variant="chip" weight={600} lineHeight={isMd ? 20 : 16} className="text-blue-500">
 HOW IT WORKS?
 </Typography>
 </div>
 <Typography variant="h2" weight={600} lineHeight={isMd ? 45 : 36} className="text-[#0A0A0A] ">
 ChargeMate Makes EV Charging Effortless
 </Typography>
 </div>
 <div className="flex flex-col lg:flex-row lg:justify-around gap-7 md:gap-0 lg:gap-8 bg-[url('/bg-net.svg')] bg-contain md:bg-cover bg-center bg-no-repeat">
 <EffortCard
 number="01"
 bgColor="#173EB6"
 icon={glass}
 title="Verify Your Charger"
 />
 <EffortCard
 number="02"
 bgColor="#1B62F5"
 icon={book}
 title="Connect for Charging"
 />
 <EffortCard
 number="03"
 bgColor="#2C7FFF"
 icon={paid}
 title="Earn or Charge Easily"
 />
 </div>
 </div>
 </Container>
 </section>

 {/* Key Features */}
 <section id="features-view" className="bg-[#D9EBFF] scroll-mt-10">
 <Container pl="pl-6" pr="pr-0">
 <div className="feature-content pt-8 md:pt-[70px] flex flex-col gap-8 md:gap-15 ">
 <div className="flex flex-col gap-2 lg:gap-3 items-center pr-6 md:pr-0">
 <div className="flex flex-col gap-1 lg:gap-2 items-center ">
 <div className="w-max py-1.5 px-3 bg-[#C5E3FF] backdrop-blur-sm rounded-3xl">
 <Typography variant="chip" weight={600} lineHeight={isMd ? 20 : 16} className="text-blue-500">
 KEY FEATURES
 </Typography>
 </div>
 <Typography variant="h2" weight={600} lineHeight={isMd ? 45 : 36} className="text-black-900 text-center">
 Smart. Verified. Effortless.
 </Typography>
 </div>
 <Typography variant="body" lineHeight={isMd ? 32 : 20} letterSpacing={0.01} weight={400} className="text-black-700 text-center">
 A platform built to make EV charging safer, simpler, and smarter for everyone.
 </Typography>
 </div>
 <div className="flex flex-col gap-10 lg:gap-[50px] ">
 <div className="flex flex-col gap-8 lg:flex-row justify-center ">
 <div className="hidden xl:flex gap-8">
 <div className="flex flex-col gap-9">
 <FeatureCard
 mainIcon={realtime}
 mainIconAlt="realtime map"
 title="Real-Time Charging point Maps"
 subtitle="Find available EV chargers instantly with our live, dynamic map interface."
 chipText="Live Updates"
 chipIcon={undefined}
 chipIconBg={true}
 />

 <FeatureCard
 mainIcon={arrow}
 mainIconAlt="arrow"
 title="Simple Booking & Management"
 subtitle="Book, manage, or cancel charging sessions easily in just a few taps."
 chipText="3 Simple Steps"
 chipIcon={dots}
 chipIconAlt="dots"
 chipIconBg={false}
 />
 </div>

 <div className="flex flex-col gap-9">
 <FeatureCard
 mainIcon={verified}
 mainIconAlt="verified"
 title="Verified Secure Chargers"
 subtitle="All charging points are verified to ensure safe, reliable charging always."
 chipText="100% Verified Hosts"
 chipIcon={tick}
 chipIconAlt="tick"
 chipIconBg={true}
 />

 <FeatureCard
 mainIcon={calender}
 mainIconAlt="calendar"
 title="Event-Friendly Charger Discovery"
 subtitle="Find chargers near you and compare distance, reviews, and availability."
 chipText="Event Optimized"
 chipIcon={star}
 chipIconAlt="star"
 chipIconBg={true}
 />
 </div>
 </div>



 <div className="flex flex-col gap-4 xl:hidden overflow-hidden justify-end">
 <Swiper
 modules={[Pagination]}
 spaceBetween={12}
 slidesPerView={1.1} // This will show 1.1 cards
 loop={true}
 pagination={{
 clickable: true,
 el: '.custom-pagination',
 }}
 className="w-full"
 breakpoints={{
 // Mobile - shows 1.1 cards
 0: {
 slidesPerView: 1.1,
 spaceBetween: 12,
 },
 // Small tablets - shows 1.5 cards
 640: {
 slidesPerView: 1.5,
 spaceBetween: 16,
 },
 // Medium tablets - shows 2 cards
 768: {
 slidesPerView: 2,
 spaceBetween: 20,
 },
 // Large tablets/laptops - shows 3 cards
 1024: {
 slidesPerView: 3,
 spaceBetween: 24,
 },
 }}
 >
 {slides.map((slide, idx) => (
 <SwiperSlide key={idx} style={{ listStyle: "none" }}>
 <div className="w-full">
 <FeatureCard {...slide} />
 </div>
 </SwiperSlide>
 ))}
 </Swiper>

 <div className="custom-pagination flex justify-center gap-2"></div>
 </div>
 <div className="w-full max-w-[400px] mr-6">
 <div className="flex justify-center relative w-full h-full min-h-[506px] md:min-h-[450px] ">
 <Image
 src={car}
 alt="car"
 fill
 className="object-contain"
 sizes="100%"
 priority
 />
 </div>
 </div>
 </div>
 <div className="flex flex-col gap-4 lg:gap-5 items-center justify-center pr-6">
 <h4 className="font-semibold text-[20px] leading-8 md:text-[30px] md:leading-[37.5px] tracking-[1%] text-center text-black-900">
 Find your next parking spot the smarter way.
 </h4>
 <div onClick={() => scrollTo("waitlist-form")} className="d-flex w-full lg:w-auto cursor-pointer">
 <Button
 text="Join the Waitlist"
 variant="lg"
 bg="#2C7FFF"
 color="#FFFFFF"
 hoverBg="#101010"
 boxShadow="1px 2px 24px 0px #13245733"
 className="w-full"
 />
 </div>
 </div>




 </div>
 </div>
 </Container>
 </section>

 {/* design */}
 <div className="overflow-hidden ">
 <BackgroundWave />
 </div>

 {/* FAQ */}
 <section id="faq-view" className="scroll-mt-10">
 <Container>
 <div className="flex flex-col gap-8 md:gap-[50px] items-center py-8 md:py-[70px] ">
 <div className="flex flex-col gap-1 md:gap-2 items-center">
 <Typography variant="h2" weight={600} lineHeight={isMd ? 45 : 36} className="text-black-900">
 Frequently Asked Questions
 </Typography>
 <Typography variant="body" lineHeight={isMd ? 32 : 22} letterSpacing={0.01} weight={400} className="text-black-700 text-center">
 Have questions about EV charging? Contact our support team via email — we’ll respond quickly.
 </Typography>
 </div>

 <div className="flex gap-5 xl:gap-[90px] items-start h-full w-full ">
 <div className="hidden md:flex flex-col gap-6 w-[80%] sticky top-20 max-h-[calc(100vh-5rem)] overflow-y-auto">
 <FaqCar />
 <div className="">
 <Button
 text={showAll ? "View Less" : "View More Questions"}
 variant="lg"
 bg="#2C7FFF"
 color="#FFFFFF"
 hoverBg="#101010"
 boxShadow="1px 2px 24px 0px #13245733"
 onClick={handleToggleFaqs}
 />
 </div>
 </div>
 <div className="flex flex-col gap-6 max-w-[564px] ">
 <FaqList showCount={showAll ? undefined : initialCount} />
 <div className="flex justify-center md:hidden">
 <Button
 text={showAll ? "View Less" : "View More Questions"}
 variant="lg"
 bg="#2C7FFF"
 color="#FFFFFF"
 hoverBg="#101010"
 boxShadow="1px 2px 24px 0px #13245733"
 onClick={handleToggleFaqs}
 />
 </div>
 </div>
 </div>
 </div>
 </Container>
 </section>



 {/* Waitlist Form */}
 <section id="waitlist-form" className="scroll-mt-[100px]">
 <Container>
 <div className="pb-8 md:pb-[70px]">
 <div className="form-content rounded-3xl border-2 border-[#2C7FFF] py-8 px-6 md:px-[50px] lg:py-[70px] lg:px-[100px] relative bg-[url('/form-bg.svg')] bg-contain bg-center bg-no-repeat flex flex-col gap-8 md:flex-row md:gap-[50px] ">
 <div className="flex flex-col gap-1 md:gap-2 w-full max-w-[426px] ">
 <div className="w-max py-1.5 px-3 bg-[#C5E3FF] backdrop-blur-sm rounded-3xl">
 <Typography variant="chip" weight={600} lineHeight={isMd ? 20 : 16} className="text-blue-500">
 EASY CHARGING, EVERY TIME
 </Typography>
 </div>
 <div className="flex flex-col gap-2 md:gap-3">
 <Typography variant="h2" weight={600} lineHeight={isMd ? 45 : 36} className="text-black-900">
 Reserve Your Charging Spot on the Waitlist
 </Typography>
 <Typography variant="body" lineHeight={isMd ? 32 : 22} letterSpacing={0.01} weight={400} className="text-black-700">
 Connect with nearby hosts and discover hassle-free EV charging before anyone else.
 </Typography>
 </div>
 </div>
 {/* Form Inputs & Button logic unchanged */}
 <div className="w-full">
 <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 md:gap-5">
 <div className="flex flex-col gap-4">
 <InputGroup
 placeholder="Your name"
 type="text"
 Icon={ProfileIcon}
 error={errors.name?.message}
 register={register("name")}
 />

 <InputGroup
 placeholder="Your email"
 type="email"
 Icon={EmailIcon}
 error={errors.email?.message}
 register={register("email")}
 />
 <InputGroup
 placeholder="Your phone number (optional)"
 type="tel"
 Icon={PhoneIcon}
 error={errors.phone?.message}
 register={register("phone")}
 />
 <div className="flex flex-col gap-0.5">
 <Typography variant="chip" weight={500} lineHeight={isMd ? 20 : 16} className="text-black-900">
 User Type
 </Typography>
 <div className="flex gap-3">
 <label className="flex items-center gap-2 py-3.5 px-4 bg-[#F9F9F9] hover:bg-[#ECF5FF] border border-[#F9F9F9] hover:border-[#8EC7FF] has-[:checked]:bg-[#ECF5FF] has-[:checked]:border-[#2C7FFF] w-full rounded-lg cursor-pointer group">
 <input
 type="radio"
 {...register("role")}
 value="driver"
 className="w-4 h-4 p-1 appearance-none rounded-full border border-[#D0D0D0] bg-clip-content 
 checked:bg-[#2C7FFF] checked:border-[#2C7FFF] 
 group-hover:border-[#59A6FF] group-hover:bg-[#59A6FF] 
 relative before:content-[''] before:absolute before:rounded-full before:w-2 before:h-2 before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 
 before:bg-[#8EC7FF] before:opacity-0 
 checked:before:bg-[#2C7FFF] checked:before:opacity-100 
 group-hover:before:opacity-100"
 />
 <span className="font-poppins font-medium text-[14px] leading-5 tracking-normal text-black-800">
 Driver
 </span>
 </label>
 <label className="flex items-center gap-2 py-3.5 px-4 bg-[#F9F9F9] hover:bg-[#ECF5FF] border border-[#F9F9F9] hover:border-[#8EC7FF] has-[:checked]:bg-[#ECF5FF] has-[:checked]:border-[#2C7FFF] w-full rounded-lg cursor-pointer group">
 <input
 type="radio"
 {...register("role")}
 value="host"
 className="w-4 h-4 p-1 appearance-none rounded-full border border-[#D0D0D0] bg-clip-content 
 checked:bg-[#2C7FFF] checked:border-[#2C7FFF] 
 group-hover:border-[#59A6FF] group-hover:bg-[#59A6FF] 
 relative before:content-[''] before:absolute before:rounded-full before:w-2 before:h-2 before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 
 before:bg-[#8EC7FF] before:opacity-0 
 checked:before:bg-[#2C7FFF] checked:before:opacity-100 
 group-hover:before:opacity-100"
 />
 <span className="font-poppins font-medium text-[14px] leading-5 tracking-normal text-black-800">
 Host
 </span>
 </label>
 </div>
 {errors.role?.message && (
 <Typography variant="chip" weight={400} className="text-red-500">
 {errors.role.message}
 </Typography>
 )}
 </div>
 </div>
 <div className="max-w-[180px]">
 <Button
 text="Submit"
 variant="lg"
 bg="#2C7FFF"
 color="#FFFFFF"
 hoverBg="#101010"
 boxShadow="1px 2px 24px 0px #13245733"
 className="w-full"
 type="submit"
 />
 </div>
 </form>
 </div>
 </div>
 </div>
 </Container>
 </section>

 {/* car design */}
 <section className="overflow-hidden ">
 <div className="hidden xl:flex">
 <Container>
 <AnimatedCarSection />
 </Container>
 </div>
 <div className="flex xl:hidden">
 <Container>
 <div className="flex relative w-full h-full min-h-[122px] ">
 <Image
 src={parkedCar}
 alt="parkedCar"
 fill
 className="object-contain"
 sizes="100%"
 priority
 />
 </div>
 </Container>
 </div>
 </section>
 </>
 )
};

export default WaitlistPage;