import { NextResponse } from "next/server";
import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
import connectDB from "@/lib/db";
import mongoose from "mongoose";

export async function DELETE() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const db = mongoose.connection.db;
    const userId = session.user.id;

    const boards = await db?.collection("boards").find({ userId }).toArray();
    const boardIds = boards?.map(b => b._id.toString()) || [];
    const boardObjectIds = boardIds.map(id => new mongoose.Types.ObjectId(id));

    await db?.collection("columns").deleteMany({ boardId: { $in: boardObjectIds } });
    await db?.collection("boards").deleteMany({ userId });
    await db?.collection("jobapplications").deleteMany({ userId });

    let userResult;
    try {
      userResult = await db?.collection("user").deleteOne({
        _id: new mongoose.Types.ObjectId(userId) as unknown as mongoose.Types.ObjectId,
      });
    } catch {
      userResult = await db?.collection("user").deleteOne({ id: userId });
    }

    await db?.collection("account").deleteMany({
      $or: [{ userId }, { userId: new mongoose.Types.ObjectId(userId) }],
    });

    await db?.collection("session").deleteMany({
      $or: [{ userId }, { userId: new mongoose.Types.ObjectId(userId) }],
    });

    await db?.collection("verification").deleteMany({
      $or: [{ userId }, { userId: new mongoose.Types.ObjectId(userId) }],
    });

    console.log("Account deleted for user:", userId, "| User doc deleted:", userResult?.deletedCount);

    const response = NextResponse.json({ success: true });
    response.cookies.set("better-auth.session_token", "", {
      expires: new Date(0),
      path: "/",
    });
    response.cookies.set("__Secure-better-auth.session_token", "", {
      expires: new Date(0),
      path: "/",
    });
    return response;
  } catch (err) {
    console.error("Delete account error:", err);
    return NextResponse.json(
      { error: "Failed to delete account" },
      { status: 500 },
    );
  }
}