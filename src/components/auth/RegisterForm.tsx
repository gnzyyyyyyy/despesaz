"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerUser } from "@/src/lib/api";

export default function RegisterForm() {
    const router = useRouter();

    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setError("");

        if (
            !form.username ||
            !form.email ||
            !form.password ||
            !form.confirmPassword
        ) {
            return setError("All fields are required");
        }

        if (form.password !== form.confirmPassword) {
            return setError("Passwords do not match");
        }

        setLoading(true);

        try {
            await registerUser({
                username: form.username,
                email: form.email,
                password: form.password,
            });

            router.push("/login");
        } catch (err: any) {
            setError(err.message || "Register failed");
        }

        setLoading(false);
    };

    return (
        <div className="w-full max-w-md">
            <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">

                <h2 className="text-2xl font-bold text-center mb-6">
                    Create Account
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">

                    <input
                        type="text"
                        placeholder="Username"
                        value={form.username}
                        onChange={(e) =>
                            setForm({ ...form, username: e.target.value })
                        }
                        className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-[#1e6f9f]/30 outline-none"
                    />

                    <input
                        type="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={(e) =>
                            setForm({ ...form, email: e.target.value })
                        }
                        className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-[#1e6f9f]/30 outline-none"
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={(e) =>
                            setForm({ ...form, password: e.target.value })
                        }
                        className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-[#1e6f9f]/30 outline-none"
                    />

                    <input
                        type="password"
                        placeholder="Confirm Password"
                        value={form.confirmPassword}
                        onChange={(e) =>
                            setForm({ ...form, confirmPassword: e.target.value })
                        }
                        className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-[#1e6f9f]/30 outline-none"
                    />

                    {error && (
                        <p className="text-red-500 text-sm">{error}</p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#1e6f9f] text-white py-3 rounded-lg font-medium hover:bg-[#155d85] transition"
                    >
                        {loading ? "Creating..." : "Register"}
                    </button>
                </form>

                <p className="text-sm text-center mt-4 text-gray-500">
                    Already have an account?{" "}
                    <span
                        onClick={() => router.push("/login")}
                        className="text-[#1e6f9f] cursor-pointer hover:underline"
                    >
                        Login here
                    </span>
                </p>
            </div>
        </div>
    );
}