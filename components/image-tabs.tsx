"use client";

import { Button } from "./ui/button";
import Image from "next/image";
import { useState } from "react";

export default function ImageTabs() {
  const [activeTab, setActiveTab] = useState("organize");

  return (
    <section className="border-t bg-background py-16">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          {/* Tabs */}
          <div className="flex flex-wrap gap-2 justify-center mb-8">
            <Button
              onClick={() => setActiveTab("organize")}
              className={`rounded-lg px-4 md:px-6 py-3 text-xs md:text-sm font-medium transition-colors ${
                activeTab === "organize"
                  ? "bg-primary text-white"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              Kanban Boards
            </Button>
            <Button
              onClick={() => setActiveTab("hired")}
              className={`rounded-lg px-4 md:px-6 py-3 text-xs md:text-sm font-medium transition-colors ${
                activeTab === "hired"
                  ? "bg-primary text-white"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              Track Progress
            </Button>
            <Button
              onClick={() => setActiveTab("boards")}
              className={`rounded-lg px-4 md:px-6 py-3 text-xs md:text-sm font-medium transition-colors ${
                activeTab === "boards"
                  ? "bg-primary text-white"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              Stay Organized
            </Button>
          </div>

          <div className="relative mx-auto max-w-5xl overflow-hidden rounded-lg border border-border shadow-xl">
            {activeTab === "organize" && (
              <Image
                src="/images/tab-1.png"
                alt="Kanban Boards"
                width={1200}
                height={800}
                className="w-full h-auto"
              />
            )}
            {activeTab === "hired" && (
              <Image
                src="/images/tab-2.png"
                alt="Track Progress"
                width={1200}
                height={800}
                className="w-full h-auto"
              />
            )}
            {activeTab === "boards" && (
              <Image
                src="/images/tab-3.png"
                alt="Stay Organized"
                width={1200}
                height={800}
                className="w-full h-auto"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}