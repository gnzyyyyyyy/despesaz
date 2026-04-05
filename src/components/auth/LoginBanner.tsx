import Image from "next/image";
import banner from "@/public/login/login-banner.png"
export default function LoginBanner() {
    return (
        <div className="hidden md:flex w-[30%] h-screen bg-[#528caa] items-center justify-center relative">
            <Image 
                src={banner}
                alt="Login Banner"
                fill
                className="object-cover"
                priority
            />
        </div>
    )
}