"use client";

import { useEffect, useState } from "react";
import { getCurrentUser, updateUser } from "@/src/lib/api";
import { useRouter } from "next/navigation";

export default function SettingsPage() {
    const [form, setForm] = useState({
        username: "",
        email: "",
    });

    const [original, setOriginal] = useState({
        username: "",
        email: "",
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const router = useRouter();

    useEffect(() => {
        const fetchUser = async () => {
            const data = await getCurrentUser();

            setForm({
                username: data.username || "",
                email: data.email || "",
            });

            setOriginal({
                username: data.username || "",
                email: data.email || "",
            });
        };

        fetchUser();
    }, []);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        try {
            await updateUser(form);
            setMessage("Profile updated successfully ✅");
            setOriginal(form);
        } catch {
            setMessage("Failed to update ❌");
        }

        setLoading(false);
    };

    const isChanged =
        form.username !== original.username ||
        form.email !== original.email;

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">Settings</h1>

            {/* MAIN CARD */}
            <div className="max-w-2xl space-y-6">

                {/* CURRENT INFO */}
                <div className="bg-white rounded-2xl shadow-sm p-6 border">
                    <h2 className="text-lg font-semibold mb-4">
                        Current Account Info
                    </h2>

                    <div className="space-y-2 text-sm text-gray-600">
                        <p>
                            <span className="font-medium text-gray-800">
                                Username:
                            </span>{" "}
                            {original.username || "-"}
                        </p>
                        <p>
                            <span className="font-medium text-gray-800">
                                Email:
                            </span>{" "}
                            {original.email || "-"}
                        </p>
                    </div>
                </div>

                {/* EDIT FORM */}
                <div className="bg-white rounded-2xl shadow-sm p-6 border">
                    <h2 className="text-lg font-semibold mb-4">
                        Edit Profile
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-4">

                        <div>
                            <label className="text-sm text-gray-500">
                                Username
                            </label>
                            <input
                                value={form.username}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        username: e.target.value,
                                    })
                                }
                                className="w-full mt-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1e6f9f]/30"
                            />
                        </div>

                        <div>
                            <label className="text-sm text-gray-500">
                                Email
                            </label>
                            <input
                                value={form.email}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        email: e.target.value,
                                    })
                                }
                                className="w-full mt-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1e6f9f]/30"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={!isChanged || loading}
                            className={`w-full py-2 rounded-lg text-white font-medium transition
                                ${isChanged
                                    ? "bg-[#1e6f9f] hover:bg-[#155d85]"
                                    : "bg-gray-300 cursor-not-allowed"}
                            `}
                        >
                            {loading ? "Saving..." : "Save Changes"}
                        </button>
                    </form>

                    {message && (
                        <p className="text-sm mt-3 text-gray-600">
                            {message}
                        </p>
                    )}
                </div>

                {/* LOGOUT */}
                <div className="bg-white rounded-2xl shadow-sm p-6 border flex justify-between items-center">
                    <div>
                        <h2 className="font-semibold">Session</h2>
                        <p className="text-sm text-gray-500">
                            Log out from your account
                        </p>
                    </div>

                    <button
                        onClick={async () => {
                            await fetch("/api/auth/logout", {
                                method: "POST",
                                credentials: "include",
                            });

                            router.replace("/login");
                            router.refresh();
                        }}
                        className="px-4 py-2 rounded-lg border text-red-500 hover:bg-red-50 transition"
                    >
                        Logout
                    </button>
                </div>

            </div>
        </div>
    );
}