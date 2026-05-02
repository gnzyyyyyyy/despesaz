"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser } from "@/src/lib/api";

export default function LoginForm() {
    const router = useRouter();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            await loginUser({ username, password });

            router.replace("/dashboard");
        } catch ( error: any ) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-md">
            <h1 className="text-4xl font-bold text-[#9fd3e8] text-center mb-10">
                Welcome
            </h1>

            <form onSubmit={handleLogin} className="space-y-6">
                <div>
                    <label className="text-sm, text-[#9fd3e8]">Username</label>
                    <input
                        type="text"
                        placeholder="Enter your username..."
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full h-11 px-4 border rounded-md text-[#0e80ad]"
                    />
                </div>
                <div>
                    <label className="text-sm, text-[#9fd3e8]">Password</label>
                    <input
                        type="password"
                        placeholder="Enter your password..."
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full h-11 px-4 border rounded-md text-[#0e80ad]"
                    />
                </div>

                <div className="text-right text-xs text-gray-500">
                    Forgot Password?
                </div>

                {error && (
                    <p className="text-red-500 text-sm text-center">{error}</p>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-36 h-11 bg-[#9fd3e8] text-white rounded-md mx-auto block hover:bg-[#528caa] transition"
                >
                    {loading ? "Logging in..." : "Login"}
                </button>
            </form>

            {/* Divider */}
            <div className="flex items-center my-8 text-gray-400 text-sm">
                <div className="flex-1 h-px bg-gray-300" />
                <span className="px-3">OR</span>
                <div className="flex-1 h-px bg-gray-300" />
            </div>

            {/* Social Oauth */}
            <div className="flex justify-center gap-4 mb-6">
                <img src="/login/apple.png" className="w-20 h-14 p-2 rounded bg-gray-100 hover:scale-110 transition cursor-pointer" />
                <img src="/login/google.png" className="w-20 h-14 p-2 rounded bg-gray-100 hover:scale-110 transition cursor-pointer" />
                <img src="/login/facebook.png" className="w-20 h-14 p-2 rounded bg-gray-100 hover:scale-110 transition cursor-pointer" />
            </div>

            <p className="text-center text-xs text-gray-500">
                Don't have an account?{" "}
                <span className="font-semibold cursor-pointer">
                    Register here!
                </span>
            </p>
        </div>
    );
}