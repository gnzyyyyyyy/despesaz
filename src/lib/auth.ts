import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export function getUserFromToken(token: string) {
    try {
        const decoded = jwt.verify(token, JWT_SECRET) as { userID: string };
        return decoded.userID;
    } catch (error) {
        return null;
    }
}