import { NextResponse } from "next/server";
import { connectDB } from "@/src/lib/mongodb";
import { User } from "@/src/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export async function POST(req: Request) {
    try {
        const { username, password } = await req.json();
        if (!username || !password) {
            return NextResponse.json(
                { message: "Username and password are required" },
                { status: 400 }
            );
        }
        await connectDB();

        // Check Existing User
        const existingUser = await User.findOne({ username });
        if (!existingUser) {
            return NextResponse.json(
                { message: "User does not exist" },
                { status: 400 }
            );
        }

        // Password Validation
        const isPasswordValid = await bcrypt.compare(
            password,
            existingUser.password
        );
        if (!isPasswordValid) {
            return NextResponse.json(
                { message: "Invalid password" },
                { status: 400 }
            );
        }

        // Generate JWT Token
        const token = jwt.sign(
            { userID: existingUser._id },
            JWT_SECRET, {
                expiresIn: "1d",
            }
        );

        const response: NextResponse = NextResponse.json({
            message: "User logged in successfully",
            user: {
                id: existingUser._id,
                username: existingUser.username,
                email: existingUser.email,
            },
            token,
        });

        //Cookie attachement
        response.cookies.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 60 * 60 * 24,
            path: "/",
        });
        return response;

    } catch (error) {
        return NextResponse.json(
            {
                message: "Something went wrong",
                error: (error as Error).message,
            },
            { status: 500 }
        )
    }
}