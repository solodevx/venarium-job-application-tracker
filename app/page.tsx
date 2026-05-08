import ImageTabs from "@/components/image-tabs";
import { Button } from "@/components/ui/button";
import { ArrowRight, Briefcase, CheckCircle2, TrendingUp } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-32">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="font-display text-black mb-6 text-4xl md:text-6xl font-bold">
              Track Every Opportunity <br />
              Stay Ahead
            </h1>
            <p className="text-muted-foreground mb-10 text-base md:text-xl">
              Track applications, manage progress, and never lose sight of an
              opportunity again-all in one simple dashboard.
            </p>
            <div className="flex flex-col items-center gap-4">
              <Link href="/sign-up">
                <Button size="lg" className="h-12 px-8 text-lg font-medium ">
                  Start for free <ArrowRight className="ml-2" />
                </Button>
              </Link>
              <p className="text-sm text-muted-foreground">
                Free forever. No credit card required.
              </p>
            </div>
          </div>
        </section>

        {/* Hero Images Section with Tabs */}
        <ImageTabs />

        {/* Stats Bar */}
        <section className="py-8 border-y">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 text-center">
              <div>
                <p className="text-3xl font-bold text-primary">500+</p>
                <p className="text-sm text-muted-foreground uppercase tracking-widest">
                  Job Seekers
                </p>
              </div>
              <div className="hidden md:block w-px h-10 bg-border" />
              <div>
                <p className="text-3xl font-bold text-primary">10,000+</p>
                <p className="text-sm text-muted-foreground uppercase tracking-widest">
                  Applications Tracked
                </p>
              </div>
              <div className="hidden md:block w-px h-10 bg-border" />
              <div>
                <p className="text-3xl font-bold text-primary">5</p>
                <p className="text-sm text-muted-foreground uppercase tracking-widest">
                  Pipeline Stages
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="border-t bg-white py-24">
          <div className="container mx-auto px-4">
            <div className="grid gap-6 md:grid-cols-3">
              <div className="flex flex-col bg-white rounded-2xl p-6 shadow-md">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Briefcase className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-display mb-3 text-2xl font-semibold text-black">
                  Organize Applications
                </h3>
                <p className="text-muted-foreground">
                  Create personalized boards and columns to manage every stage
                  of your job applications — from initial research to submitted
                  applications.
                </p>
              </div>

              <div className="flex flex-col bg-white rounded-2xl p-6 shadow-md">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-display mb-3 text-2xl font-semibold text-black">
                  Track Progress
                </h3>
                <p className="text-muted-foreground">
                  Monitor your application status from “Applied” to “Interview”
                  to “Offer” with <strong>visual Kanban boards</strong> that
                  make it easy to see where each application stands.
                </p>
              </div>

              <div className="flex flex-col bg-white rounded-2xl p-6 shadow-md">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <CheckCircle2 className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-display mb-3 text-2xl font-semibold text-black">
                  Stay Fully Organized
                </h3>
                <p className="text-muted-foreground">
                  Keep all your job search information in one central hub —
                  never lose track of an opportunity or important detail again.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
