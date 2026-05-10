"use client";

import { Button } from "./ui/button";
import Image from "next/image";
import { useState } from "react";

export default function ImageTabs() {
  const [activeTab, setActiveTab] = useState("organize"); // organize, hired, boards

  return (
    <section className="border-t bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          {/* Tabs */}
          <div className="flex gap-2 justify-center mb-8">
            <Button
              onClick={() => setActiveTab("organize")}
              className={`rounded-lg px-6 py-3 text-sm font-medium transition-colors ${
                activeTab === "organize"
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Kanban Boards
            </Button>
            <Button
              onClick={() => setActiveTab("hired")}
              className={`rounded-lg px-6 py-3 text-sm font-medium transition-colors ${
                activeTab === "hired"
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Track Progress
            </Button>
            <Button
              onClick={() => setActiveTab("boards")}
              className={`rounded-lg px-6 py-3 text-sm font-medium transition-colors ${
                activeTab === "boards"
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Stay Organized
            </Button>
          </div>
          <div className="relative mx-auto max-w-5xl overflow-hidden rounded-lg border border-gray-200 shadow-xl">
            {activeTab === "organize" && (
              <Image
                src="/images/tab-1.png"
                alt="Organize Applications"
                width={1200}
                height={800}
              />
            )}

            {activeTab === "hired" && (
              <Image
                src="/images/tab-2.png"
                alt="Organize Applications"
                width={1200}
                height={800}
              />
            )}

            {activeTab === "boards" && (
              <Image
                src="/images/tab-3.png"
                alt="Organize Applications"
                width={1200}
                height={800}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}