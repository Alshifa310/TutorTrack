"use client";

import {
  SignInButton,
  SignUpButton,
  Show,
  UserButton,
} from "@clerk/nextjs";

export default function Home() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_top,_#f5f7ff_0%,_#eef2ff_28%,_#f8fafc_60%,_#ffffff_100%)] px-6 py-10 text-slate-950">
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom_right,rgba(15,23,42,0.04),transparent_35%,rgba(15,23,42,0.03)_65%,transparent_100%)]" />
      <div className="relative w-full max-w-5xl rounded-[2rem] border border-white/70 bg-white/80 p-6 shadow-[0_24px_100px_rgba(15,23,42,0.12)] backdrop-blur md:p-10">
        <div className="flex items-center justify-between gap-4 border-b border-slate-200 pb-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
              TutorTrack
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
              Welcome to your tutoring dashboard.
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <Show when="signed-out">
              <SignInButton mode="modal">
                <button className="rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:bg-slate-50">
                  Sign in
                </button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button className="rounded-full bg-slate-950 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800">
                  Sign up
                </button>
              </SignUpButton>
            </Show>
            <Show when="signed-in">
              <div className="rounded-full border border-slate-200 bg-white px-2 py-1 shadow-sm">
                {/* <UserButton afterSignOutUrl="/" /> */}
              </div>
            </Show>
          </div>
        </div>

        <section className="grid gap-8 py-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div className="space-y-6">
            <p className="max-w-2xl text-lg leading-8 text-slate-600">
              Manage your shift logs, time off requests and schedule. Sign in to resume your workspace or create
              a new account to get started.
            </p>
            <Show when="signed-out">
              <div className="flex flex-wrap gap-3">
                <SignInButton mode="modal">
                  <button className="rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
                    Sign in to continue
                  </button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <button className="rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50">
                    Create your account
                  </button>
                </SignUpButton>
              </div>
            </Show>
            <Show when="signed-in">
              <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
                <span className="inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
                You’re signed in. Open your profile menu to manage your account.
              </div>
            </Show>
          </div>

         
        </section>
      </div>
    </main>
  );
}
