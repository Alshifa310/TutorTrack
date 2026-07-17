"use client";

import {
    NumberField,
    NumberFieldDecrement,
    NumberFieldGroup,
    NumberFieldIncrement,
    NumberFieldInput,
} from "@/components/reui/number-field";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    ArrowRight,
    CalendarDays,
    Clock3,
    MapPin,
    NotebookText,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const attendanceFormSchema = z.object({
  log_date: z.string().min(1, {
    message: "Log date is required.",
  }),
  location: z.string().optional(),
  sign_out_time: z.string().min(1, {
    message: "Sign in time is required.",
  }),
  signOut_notes: z.string().optional(),
  appointment_count: z.number().min(0, {
    message: "Make sure you write your total appointment. ",
  }),
});

function getTodayDate() {
  return new Date().toLocaleDateString("en-CA");
}

function getCurrentTimestamp() {
  return new Date().toISOString();
}

function getFormattedCurrentTime() {
  return new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

function getInitialFormValues() {
  return {
    log_date: getTodayDate(),
    location: "",
    sign_out_time: getFormattedCurrentTime(),
    signOut_notes: "",
    appointment_count: 0,
  };
}

export function SignOutShift() {
  const { getToken } = useAuth();
  const form = useForm<z.infer<typeof attendanceFormSchema>>({
    resolver: zodResolver(attendanceFormSchema),
    defaultValues: getInitialFormValues(),
  });

  function printValue(values: z.infer<typeof attendanceFormSchema>) {
    const submission = {
      ...values,
      log_date: getTodayDate(),
      sign_out_time: getCurrentTimestamp(),
    };
    console.log(submission);
  }

  async function onSubmit(values: z.infer<typeof attendanceFormSchema>) {
    printValue(values)
    const submission = {
      ...values,
      log_date: getTodayDate(),
      sign_out_time: getCurrentTimestamp(),
    };

    try {
      const token = await getToken();

      if (!token) {
        toast.error("You need to sign in again before submitting.");
        return;
      }

      const response = await fetch("http://localhost:3000/api/shift/sign-out", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(submission),
      });

      const result = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(result?.error || "Failed to save shift sign-out.");
      }

      toast.success("Shift sign-out logged", {
        description: "Your attendance entry has been saved successfully.",
      });
      form.reset(getInitialFormValues());
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Something went wrong.",
      );
    }
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(168,85,247,0.22)_0%,transparent_30%),radial-gradient(circle_at_top_right,rgba(37,99,235,0.18)_0%,transparent_28%),linear-gradient(180deg,#09090f_0%,#0f1020_45%,#07070d_100%)] px-4 py-8 text-white sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0 opacity-60 " />
      <div className="pointer-events-none absolute -left-24 top-24 h-72 w-72 rounded-full " />
      <div className="pointer-events-none absolute -right-16 top-40 h-96 w-96 rounded-full " />

      <section className="relative mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-5xl items-center justify-center">
        <div className="w-full overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 shadow-[0_30px_120px_rgba(2,6,23,0.55)] backdrop-blur-2xl">
          <div className="p-4 sm:p-6 lg:p-8">
            <div className="mb-6 flex items-center justify-center gap-3 border-b border-white/10 pb-6 ">
              <div className="relative space-y-6">
                <div className="space-y-4">
                  <h1 className="max-w-sm text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                    Shift{" "}
                    <span className="bg-linear-to-r from-violet-300 via-blue-400 to-blue-500 bg-clip-text text-transparent">
                      Sign Out
                    </span>
                  </h1>
                </div>
              </div>
            </div>

            <div className="rounded-[1.5rem] border bg-slate-950/50 border-white/10  p-4 sm:p-6">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-5"
                >
                  <div className="grid gap-5 sm:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="log_date"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2 text-slate-100">
                            <CalendarDays className="size-4 text-violet-300" />
                            Date
                          </FormLabel>
                          <FormControl>
                            <Input
                              readOnly
                              disabled
                              {...field}
                              className="h-12 rounded-2xl border-white/10 bg-white/5 text-white shadow-inner shadow-black/10"
                            />
                          </FormControl>
                          <FormDescription className="text-slate-400">
                            Captured automatically from today.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="sign_out_time"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2 text-slate-100">
                            <Clock3 className="size-4 text-blue-300" />
                            Time
                          </FormLabel>
                          <FormControl>
                            <Input
                              readOnly
                              disabled
                              {...field}
                              className="h-12 rounded-2xl border-white/10 bg-white/5 text-white shadow-inner shadow-black/10"
                            />
                          </FormControl>
                          <FormDescription className="text-slate-400">
                            Automatically refreshed when you submit.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2 text-slate-100">
                          <MapPin className="size-4 text-rose-300" />
                          Location
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter location"
                            {...field}
                            className="h-12 rounded-2xl border-white/10 bg-white/5 text-white placeholder:text-slate-500 shadow-inner shadow-black/10"
                          />
                        </FormControl>
                        <FormDescription className="text-slate-400">
                          Use the room, campus, or branch name.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="appointment_count"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Appointment Count</FormLabel>
                        <FormControl>
                          <NumberField
                            value={field.value}
                            onValueChange={field.onChange}
                            min={0}
                            max={100}
                          >
                            <NumberFieldGroup>
                              <NumberFieldDecrement />
                              <NumberFieldInput />
                              <NumberFieldIncrement />
                            </NumberFieldGroup>
                          </NumberField>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="signOut_notes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2 text-slate-100">
                          <NotebookText className="size-4 text-cyan-300" />
                          Notes
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Add any attendance notes (optional)..."
                            className="min-h-32 resize-none rounded-2xl border-white/10 bg-white/5 text-white placeholder:text-slate-500 shadow-inner shadow-black/10"
                            rows={5}
                            {...field}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="h-12 w-full rounded-2xl bg-linear-to-r from-violet-600 via-blue-400 to-blue-600 text-base font-semibold text-white shadow-[0_20px_60px_rgba(99,102,241,0.35)] transition hover:from-violet-500 hover:via-blue-600 hover:to-blue-500"
                  >
                    <span>Sign Out to Shift</span>
                    <ArrowRight className="size-4" />
                  </Button>
                </form>
              </Form>

              <div className="mt-6 flex items-center justify-center gap-2 text-sm text-slate-400">
                <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_0_4px_rgba(52,211,153,0.12)]" />
                Thank you for being Aweson and making difference! ✨
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default function Page() {
  return <SignOutShift />;
}
