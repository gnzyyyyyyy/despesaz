import { NextResponse } from "next/server";
import { connectDB } from "@/src/lib/mongodb";
import { User } from "@/src/models/User";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
    try {
        const { username, email, password } = await req.json();
        await connectDB();

        // Check Existing User
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json(
                { message: "User already exists" },
                { status: 400 }
            );
        }

        // Password Hashing
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create User
        const user = await User.create({
            username,
            email,
            password: hashedPassword,
        });

        return NextResponse.json({
            message: "User created successfully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
            },
        })
    } catch (error) {
        return NextResponse.json(
            { message: "Error creating user", error },
            { status: 500 }
        );
    }
}
