import { getSession } from "@/lib/auth/auth";
import connectDB from "@/lib/db";
import { Board } from "@/lib/models";
import { redirect } from "next/navigation";
import KanbanBoard from "@/components/kanban-board";
import { Suspense } from "react";

async function getBoard(userId: string) {
  await connectDB();

  const boardDoc = await Board.findOne({
    userId: userId,
    name: "Job Hunt",
  }).populate({
    path: "columns",
    populate: {
      path: "jobApplications",
    },
  });

  if (!boardDoc) return null;

  const board = JSON.parse(JSON.stringify(boardDoc));

  return board;
}

async function DashboardPage() {
  const session = await getSession();
  const board = await getBoard(session?.user.id ?? "");

  if (!session?.user) {
    redirect("/sign-in");
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-6 md:px-8 md:py-8">
        <div className="mb-6">
          <h1 className="font-display text-xl md:text-2xl font-semibold text-black">
            Welcome back,{" "}
            <span className="font-cursive text-primary text-2xl md:text-3xl lowercase">
              {session?.user.name}.
            </span>
          </h1>
          <p className="font-display text-md text-gray-600">Career Pipeline</p>
        </div>
        <div className="shadow-[-4px_0px_12px_-4px_rgba(0,0,0,0.1),4px_0px_12px_-4px_rgba(0,0,0,0.1)] rounded-4xl px-10 pt-6 pb-6 bg-white border-0">
          <KanbanBoard board={board} userId={session.user.id} />
        </div>
      </div>
    </div>
  );
}

export default async function Dashboard() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <DashboardPage />
    </Suspense>
  );
}
