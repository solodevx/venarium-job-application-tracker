import ImageTabs from "@/components/image-tabs";
import CountUp from "@/components/count-up";
import HeroCta from "@/components/hero-cta";
import HeroSlideshow from "@/components/hero-slideshow";
import { ArrowRight, Briefcase, CheckCircle2, TrendingUp } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        {/* Hero Section — 50/50 split */}
        <section className="flex flex-col md:flex-row min-h-[calc(100vh-4rem)]">
          {/* Left — Content */}
          <div className="flex w-full md:w-1/2 flex-col justify-center px-6 py-12 md:px-16">
            <div className="max-w-lg">
              <p className="text-xs uppercase tracking-widest text-muted-foreground mb-4">
                Job Application Tracker
              </p>
              <h1 className="font-display text-foreground mb-6 text-4xl md:text-5xl font-bold leading-tight">
                Track Every Opportunity <br />
                <span className="font-cursive text-primary">Stay Ahead.</span>
              </h1>
              <p className="mb-10 text-base md:text-lg leading-relaxed text-muted-foreground">
                Keep track of applications, interviews, and offers in one
                focused workspace built for modern job seekers.
              </p>
              <HeroCta />
              <p className="text-xs mt-4 text-muted-foreground">
                Free forever. No credit card. No clutter.
              </p>
            </div>
          </div>

          {/* Right — Slideshow */}
          <div className="w-full h-64 md:h-auto md:w-1/2 relative">
            <HeroSlideshow />
          </div>
        </section>

        {/* Stats Bar */}
        <section className="py-8 border-y">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 text-center">
              <div>
                <p className="text-3xl font-bold text-primary">
                  <CountUp target={50} />+
                </p>
                <p className="text-sm text-muted-foreground uppercase tracking-widest">
                  Job Seekers
                </p>
              </div>
              <div className="hidden md:block w-px h-10 bg-border" />
              <div>
                <p className="text-3xl font-bold text-primary">
                  <CountUp target={1000} />+
                </p>
                <p className="text-sm text-muted-foreground uppercase tracking-widest">
                  Applications Tracked
                </p>
              </div>
              <div className="hidden md:block w-px h-10 bg-border" />
              <div>
                <p className="text-3xl font-bold text-primary">
                  <CountUp target={5} />
                </p>
                <p className="text-sm text-muted-foreground uppercase tracking-widest">
                  Pipeline Stages
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Hero Images Section with Tabs */}
        <div id="image-tabs">
          <ImageTabs />
        </div>

        {/* Features Section */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3">
                Why Venarium
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                Everything you need to land the job
              </h2>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="flex flex-col bg-card rounded-2xl p-6 shadow-md">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Briefcase className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-display mb-3 text-xl font-semibold text-foreground">
                  Organize Your Workflow
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Create custom boards and columns for every stage of your job
                  search — from saved opportunities to final offers.
                </p>
              </div>

              <div className="flex flex-col bg-card rounded-2xl p-6 shadow-md">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-display mb-3 text-xl font-semibold text-foreground">
                  Track Progress
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Monitor your application status from &quot;Applied&quot; to
                  &quot;Interview&quot; to &quot;Offer&quot; with visual Kanban
                  boards that make it easy to see where each application stands.
                </p>
              </div>

              <div className="flex flex-col bg-card rounded-2xl p-6 shadow-md">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <CheckCircle2 className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-display mb-3 text-xl font-semibold text-foreground">
                  Stay Fully Organized
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Keep all your job search information in one central hub —
                  never lose track of an opportunity or important detail again.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-primary">
          <div className="container mx-auto px-4 text-center">
            <p className="text-xs uppercase tracking-widest text-primary-foreground/60 mb-4">
              Get started today
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              Ready to take control of <br />
              your job search?
            </h2>
            <p className="text-primary-foreground/70 text-sm mb-8 max-w-md mx-auto leading-relaxed">
              Join hundreds of job seekers who use Venarium to stay organized
              and land their dream job.
            </p>
            <Link href="/sign-up">
              <button
                type="button"
                className="h-11 bg-primary-foreground px-8 text-xs font-medium uppercase tracking-[0.12em] text-primary transition hover:bg-accent hover:text-white flex items-center gap-2 mx-auto"
              >
                Start for free
                <ArrowRight className="h-4 w-4" />
              </button>
            </Link>
            <p className="text-xs text-primary-foreground/50 mt-4">
              Free forever. No credit card required.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
