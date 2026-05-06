import RegisterBanner from "@/src/components/auth/LoginBanner";
import RegisterForm from "@/src/components/auth/RegisterForm";

export default function RegisterPage() {
    return (
        <div className="flex w-screen h-screen overflow-hidden">
            <RegisterBanner />
            <div className="w-full md:w-[70%] flex items-center justify-center bg-[#eef5f9] px-10">
                <RegisterForm />
            </div>
        </div>
    );
}