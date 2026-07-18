"use client";

import { Button } from "@base-ui/react";
import { SignInButton, SignUpButton, Show, UserButton } from "@clerk/nextjs";
import { ArrowRight } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import Link from 'next/link';
export default function Home() {
  const { isLoaded, isSignedIn, user } = useUser();

  if (!isLoaded || !isSignedIn) {
    return null;
  }
  return (
    <main className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(168,85,247,0.22)_0%,transparent_30%),radial-gradient(circle_at_top_right,rgba(37,99,235,0.18)_0%,transparent_28%),linear-gradient(180deg,#09090f_0%,#0f1020_45%,#07070d_100%)] px-4 py-8 text-white sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0 opacity-60 " />
      <div className="pointer-events-none absolute -left-24 top-24 h-72 w-72 rounded-full " />
      <div className="pointer-events-none absolute -right-16 top-40 h-96 w-96 rounded-full " />

      <section className="relative mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-5xl items-center justify-center">
        <div className="w-full overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 shadow-[0_30px_120px_rgba(2,6,23,0.55)] backdrop-blur-2xl">
          <div className="p-4 sm:p-6 lg:p-8">
            <div className="mb-6 flex items-center justify-between gap-1 border-b border-white/10 pb-6 ">
              <h1 className="max-w-lg  text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                Hello{" "}
                <span className="bg-linear-to-r from-violet-300 via-blue-400 to-blue-500 bg-clip-text text-transparent">
                  {user.fullName}
                </span>
              </h1>
              <div className="flex items-center gap-3">
                <img
                  src={user.imageUrl}
                  alt="Profile"
                  className="w-10 h-10 rounded-full"
                />
                <div></div>
              </div>
            </div>

            <div className="rounded-[1.5rem] border bg-slate-950/50 border-white/10  p-4 sm:p-6">
            <div className="flex justify-center items-center gap-7">
              <Button   className="h-12 w-24 rounded-2xl bg-linear-to-r from-violet-600 via-blue-400 to-blue-600 text-base font-semibold text-white shadow-[0_20px_60px_rgba(99,102,241,0.35)] transition hover:from-violet-500 hover:via-blue-600 hover:to-blue-500">
             <Link href="/tutor/shift/sign-in">Sign In</Link>
              </Button>
              <Button className="h-12 w-24 rounded-2xl bg-linear-to-r from-violet-600 via-blue-400 to-blue-600 text-base font-semibold text-white shadow-[0_20px_60px_rgba(99,102,241,0.35)] transition hover:from-violet-500 hover:via-blue-600 hover:to-blue-500">
                 <Link href="/tutor/shift/sign-out">Sign Out</Link>

              </Button>
              </div>
              <div className="mt-6 flex items-center justify-center gap-2 text-sm text-slate-400">
                <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_0_4px_rgba(52,211,153,0.12)]" />
                Your Status : Currently Clocked In
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
