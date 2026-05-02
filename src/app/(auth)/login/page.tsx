import LoginBanner from "@/src/components/auth/LoginBanner";
import LoginForm from "@/src/components/auth/LoginForm";

export default function LoginPage() {
    return (
        <div className="flex w-screen h-screen overflow-hidden">
            <LoginBanner />
            <div className="w-full md:w-[70%] flex items-center justify-center bg-[#eef5f9] px-10">
                <LoginForm />
            </div>
        </div>
    )
}