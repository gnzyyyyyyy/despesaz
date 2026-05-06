import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/src/lib/mongodb";
import { getUserFromToken } from "@/src/lib/auth";
import { User } from "@/src/models/User";

export async function PUT(req: NextRequest) {
    try {
        await connectDB();

        const token = req.cookies.get("token")?.value;
        if (!token) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const userId = getUserFromToken(token);
        if (!userId) {
            return NextResponse.json({ message: "Invalid token" }, { status: 401 });
        }

        const body = await req.json();

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {
                username: body.username,
                email: body.email,
            },
            { new: true }
        );

        return NextResponse.json(updatedUser);
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { message: "Failed to update user" },
            { status: 500 }
        );
    }
}

export async function GET(req: NextRequest) {
    try {
        await connectDB();

        const token = req.cookies.get("token")?.value;
        const userId = getUserFromToken(token!);

        const user = await User.findById(userId).select("-password");

        return NextResponse.json(user);
    } catch (error) {
        return NextResponse.json({ message: "Error fetching user" }, { status: 500 });
    }
}