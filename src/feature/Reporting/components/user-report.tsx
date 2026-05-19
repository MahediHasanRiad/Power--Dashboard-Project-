import {
  REASON_STYLES,
  STATUS_STYLES,
} from "@/feature/user-manager/utils/button-style";
import { Eye } from "lucide-react";
import { useState } from "react";
import { UserReportDetails } from "./user-report-details";
import type { getUserReportType, userReportType } from "../report-type";
import ReporterId from "../utils/reporter-id";
import Reason from "../utils/reason";
import StatusBadge from "../utils/status-badge";
import ReportField from "../utils/reporter";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/store/store";
import { updateUserReportThunk } from "../redux/update-user-report-status.thunk";


function UserReportField({ userReportData }: {userReportData: getUserReportType}) {
  const [selectedReport, setSelectedReport] = useState<userReportType | null>(
    null,
  );
  const dispatch = useDispatch<AppDispatch>();

  // update status
  const updateUserReportStatus = async (status: string) => {
    try {
      const id = selectedReport?.id!;
      await dispatch(updateUserReportThunk({ id, status })).unwrap();
      toast.success("Status Updated !!!");
    } catch (error) {
      console.log(error);
      toast.error("Failed to update Report Status");
    }
  };

  return (
    <>
      {/* ── MOBILE: Card View (hidden on md+) ── */}
      <div className="flex flex-col gap-4 md:hidden">
        {userReportData?.reports?.map((report: userReportType) => {
          const reasonClass =
            REASON_STYLES[report.reason] || REASON_STYLES.default;
          const statusInfo =
            STATUS_STYLES[report.status] || STATUS_STYLES.default;

          // Safely map individual text properties depending on how your child sub-components parse objects
          const reporterName = (report.reporter as any)?.fullname || "User";
          const reportedName = (report.reportedUser as any)?.fullname || "User";

          return (
            <div
              key={report.reporterId}
              className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 flex flex-col gap-4 shadow-xl"
            >
              {/* Header block: Ticket Info & Action */}
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                <div className="flex flex-col gap-0.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                    Report ID
                  </span>
                  <span className="text-white text-sm font-mono font-bold">
                    #{report.reporterId}
                  </span>
                </div>
                {/* description  */}
                <button
                  type="button"
                  onClick={() => setSelectedReport(report)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 border border-zinc-700/60 text-sm text-zinc-200 transition-all"
                  aria-label={`View report ${report.reporterId}`}
                >
                  <Eye className="w-4 h-4" />
                  <span className="text-xs font-medium">Description</span>
                </button>
              </div>

              {/* Profiles Row: Grid layout for sender & violator paths */}
              <div className="grid grid-cols-2 gap-4 bg-zinc-950/40 p-3 rounded-xl border border-zinc-800/40">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                    Reporter
                  </span>
                  <div className="text-zinc-200 text-xs font-semibold truncate">
                    {reporterName}
                  </div>
                </div>

                <div className="flex flex-col gap-1 border-l border-zinc-800/80 pl-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400/80">
                    Reported Against
                  </span>
                  <div className="text-zinc-200 text-xs font-semibold truncate">
                    {reportedName}
                  </div>
                </div>
              </div>

              {/* Footer Block: Classification badges */}
              <div className="flex items-center justify-between pt-1">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                    Reason
                  </span>
                  <span
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wide ${reasonClass}`}
                  >
                    {report.reason?.replace("_", " ")}
                  </span>
                </div>

                <div className="flex flex-col gap-1 items-end">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                    State
                  </span>
                  <span
                    className={`text-xs text-white font-bold uppercase ${statusInfo}`}
                  >
                    • {report.status}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── DESKTOP: Table View (hidden below md) ── */}
      <div className="hidden md:block bg-card-bg-0 rounded-2xl border border-card-bg-0 shadow-2xl overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-card-bg-0/30 text-[10px] font-bold uppercase tracking-[0.15em] text-secondary-0/70">
            <tr>
              <th className="px-8 py-6">Report ID</th>
              <th className="px-4 py-6">Reporter</th>
              <th className="px-4 py-6 text-secondary-0">Reported User</th>
              <th className="px-4 py-6">Reason</th>
              <th className="px-4 py-6">Status</th>
              <th className="px-8 py-6 text-right">Description</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-card-bg-0">
            {userReportData?.reports?.map((report: userReportType) => {
              const reasonClass =
                REASON_STYLES[report.reason] || REASON_STYLES.default;
              const statusInfo =
                STATUS_STYLES[report.status] || STATUS_STYLES.default;

              return (
                <tr
                  key={report.reporterId}
                  className="hover:bg-card-bg-0/20 transition-colors group"
                >
                  <ReporterId id={report.reporterId} />
                  <ReportField image={report.reporter} />
                  <ReportField image={report.reportedUser} />
                  <Reason reason={report} reasonClass={reasonClass} />
                  <StatusBadge status={report} statusInfo={statusInfo} />
                  <td className="px-8 py-6 text-right">
                    <button
                      type="button"
                      onClick={() => setSelectedReport(report)}
                      className="px-4 py-2 rounded-lg text-secondary-0/70 hover:text-white transition-all inline-flex items-center justify-center"
                      aria-label={`View report details for ${report.reporterId}`}
                    >
                      <Eye className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Single dialog instance */}
      {selectedReport && (
        <UserReportDetails
          open={!!selectedReport}
          onClose={() => setSelectedReport(null)}
          description={selectedReport.description}
          reason={selectedReport.reason}
          updateStatus={updateUserReportStatus}
        />
      )}
    </>
  );
}

export default UserReportField;
