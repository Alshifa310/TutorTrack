"use client";

import { useAuth } from "@clerk/nextjs";
import { ArrowLeftCircle } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { SignOutButton } from "@clerk/nextjs";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@base-ui/react";

interface Tutor {
  id: string;
  name: string;
  student_id: string;
  program: string;
  faculty: string;
  working_location?: string;
}

interface Schedule {
  id: string;
  day_of_week: string;
  start_time: string;
  end_time: string;
}

interface AttendanceLog {
  id: string;
  log_date: string;
  sign_in_time: string | null;
  sign_out_time: string | null;
  location: string | null;
  signIn_notes: string | null;
  signOut_notes: string | null;
}

interface TimeOffRequest {
  id: string;
  start_date: string;
  end_date: string;
  status: string;
}
const formatCanadianTimeOnly = (timestamp: string) => {
  return new Date(timestamp).toLocaleTimeString("en-CA", {
    timeZone: "America/Toronto",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

const formatCanadianDate = (timestamp: string) => {
  return new Date(timestamp).toLocaleDateString("en-CA", {
    timeZone: "America/Toronto",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export default function TutorProfile() {
  const { getToken } = useAuth();
  const [loading, setLoading] = useState(true);
  const [tutor, setTutor] = useState<Tutor | null>(null);
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [attendanceLogs, setAttendanceLogs] = useState<AttendanceLog[]>([]);
  const [timeOffRequests, setTimeOffRequests] = useState<TimeOffRequest[]>([]);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const token = await getToken();

        const response = await fetch(
          "http://localhost:3000/api/tutor/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const result = await response.json();

        if (result.success) {
          setTutor(result.tutor);
          setSchedules(result.schedules);
          setAttendanceLogs(result.attendanceLogs);
          setTimeOffRequests(result.timeOffRequests);
          console.log(attendanceLogs)
        }
      } catch (error) {
        console.error("Dashboard fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, [getToken]);

  const scheduleText =
    schedules.length > 0
      ? schedules
          .map(
            (schedule: Schedule) =>
              `${schedule.day_of_week} ${schedule.start_time.slice(
                0,
                5,
              )}-${schedule.end_time.slice(0, 5)}`,
          )
          .join(", ")
      : "No Schedule Assigned";

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-white">
        Loading...
      </div>
    );
  }
  return (
    <main className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(168,85,247,0.22)_0%,transparent_30%),radial-gradient(circle_at_top_right,rgba(37,99,235,0.18)_0%,transparent_28%),linear-gradient(180deg,#09090f_0%,#0f1020_45%,#07070d_100%)] px-4 py-8 text-white sm:px-6 lg:px-8">
      <section className="mx-auto max-w-5xl">
        <Card className="border-white/10 bg-white/5 backdrop-blur-2xl shadow-[0_30px_120px_rgba(2,6,23,0.55)]">
          <CardHeader className="flex items-center justify-between gap-1">
            <CardTitle className="bg-gradient-to-r from-violet-300 via-blue-400 to-blue-500 bg-clip-text text-3xl font-bold text-transparent">
              Tutor Profile
            </CardTitle>

            <Link href={"/tutor/dashboard"}>
              <ArrowLeftCircle className="h-10 w-10" />
            </Link>
          </CardHeader>

          <CardContent className="space-y-8">
            {/* Tutor Info */}
            <div className="grid gap-4 rounded-2xl border border-white/10 bg-slate-950/50 p-6 sm:grid-cols-2">
              <InfoRow label="Name" value={tutor?.name || "-"} />
              <InfoRow label="Student ID" value={tutor?.student_id || "-"} />
              <InfoRow label="Program" value={tutor?.program || "-"} />
              <InfoRow label="Faculty" value={tutor?.faculty || "-"} />

              <InfoRow
                label="Schedule"
                value={scheduleText}
                className="sm:col-span-2"
              />
            </div>

            {/* Shift Logs */}
            <div className="rounded-2xl border border-white/10 bg-slate-950/50 p-6">
              <h2 className="mb-4 text-xl font-semibold">Shift Logs</h2>

              <div className="overflow-x-auto rounded-xl border border-white/10">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10 bg-white/5">
                      <th className="px-4 py-3 text-left">Date</th>
                      <th className="px-4 py-3 text-left">Sign In</th>
                      <th className="px-4 py-3 text-left">Sign Out</th>
                      <th className="px-4 py-3 text-left">Location</th>
                      <th className="px-4 py-3 text-left">Notes</th>
                    </tr>
                  </thead>

                  <tbody>
                    {attendanceLogs.length > 0 ? (
                      attendanceLogs.map((log: AttendanceLog) => (
                        <tr
                          key={log.id}
                          className="border-b border-white/10 hover:bg-white/5"
                        >
                          <td className="px-4 py-3">{log.log_date}</td>

                          <td className="px-4 py-3">
                            {log.sign_in_time
                              ? formatCanadianTimeOnly(log.sign_in_time)
                              : "-"}
                          </td>

                          <td className="px-4 py-3">
                            {log.sign_out_time
                              ? formatCanadianTimeOnly(log.sign_out_time)
                              : "-"}
                          </td>

                          <td className="px-4 py-3">{log.location || "-"}</td>

                          <td className="px-4 py-3">
                            {log.signOut_notes || log.signIn_notes || "-"}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={5}
                          className="py-4 text-center text-slate-400"
                        >
                          No shift logs found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Time Off */}
            <div className="rounded-2xl border border-white/10 bg-slate-950/50 p-6">
              <h2 className="mb-4 text-xl font-semibold">Time Off</h2>

              <ul className="space-y-2 text-slate-300">
                {timeOffRequests.length > 0 ? (
                  timeOffRequests.map((request: TimeOffRequest) => (
                    <li key={request.id} className="flex items-center gap-3">
                      <span className="h-2 w-2 rounded-full bg-violet-400" />
                      {request.start_date} - {request.end_date}
                      {" ("}
                      {request.status}
                      {")"}
                    </li>
                  ))
                ) : (
                  <li>No time off requests found.</li>
                )}
              </ul>
            </div>
            <SignOutButton redirectUrl="/">
              <Button className="h-12 w-30 rounded-2xl bg-linear-to-r from-violet-600 via-blue-400 to-blue-600 text-base font-semibold text-white shadow-[0_20px_60px_rgba(99,102,241,0.35)] transition hover:from-violet-500 hover:via-blue-600 hover:to-blue-500">
                Log out
              </Button>
            </SignOutButton>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}

function InfoRow({
  label,
  value,
  className = "",
}: {
  label: string;
  value: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <p className="text-sm text-slate-400">{label}</p>
      <p className="text-lg font-medium text-white">{value}</p>
    </div>
  );
}
