import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
import connectDB from "@/lib/db";
import mongoose from "mongoose";

export async function DELETE(req: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const db = mongoose.connection.db;

    // Delete all user data
    await db?.collection("boards").deleteMany({ userId: session.user.id });
    await db?.collection("columns").deleteMany({ userId: session.user.id });
    await db
      ?.collection("jobapplications")
      .deleteMany({ userId: session.user.id });

    // Delete the user account via better-auth
    await auth.api.deleteUser({
      headers: await headers(),
      body: {},
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Delete account error:", err);
    return NextResponse.json(
      { error: "Failed to delete account" },
      { status: 500 },
    );
  }
}
