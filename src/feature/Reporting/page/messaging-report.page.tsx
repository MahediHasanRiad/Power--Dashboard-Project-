import { useEffect, useState } from "react";
import {
  REASON_STYLES,
  STATUS_STYLES,
} from "@/feature/user-manager/utils/button-style";
import { Eye } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/store/store";
import { GetAllMessageReportThunk } from "../redux/get-all-message-report.thunk";
import { toast } from "sonner";
import {
  MessagingReportDetailsDialog,
  type resolvedType,
} from "../components/messaging-report-details-bialog";
import { ResolvedMessageReportThunk } from "../redux/resolve-message-reports.thunk";

type ReportItemType = any;

function MessagingReport() {
  const [selectedReport, setSelectedReport] = useState<ReportItemType | null>(null);

  const { isError, isLoading, messageReport } = useSelector(
    (state: RootState) => state.report,
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    (async () => {
      try {
        await dispatch(GetAllMessageReportThunk()).unwrap();
      } catch (error) {
        toast.error("Failed to load Messaging report !!!");
      }
    })();
  }, [dispatch]);

  const handleSuspend = (data: number) => {
    console.log("suspend", data);
  };

  const handleResolve = async (actionType: resolvedType) => {
    if (!selectedReport) return;

    try {
      await dispatch(
        ResolvedMessageReportThunk({
          id: selectedReport.id,
          selectedResolve: actionType,
        }),
      ).unwrap();

      toast.success("Successfully Resolved !!!");
      setSelectedReport(null);
      
      // Re-fetch list to sync UI with state updates automatically
      await dispatch(GetAllMessageReportThunk()).unwrap();
    } catch (error: any) {
      console.error(error);
      toast.error("Failed to resolve message report");
    }
  };

  return (
    <div className="w-full space-y-4">
      
      {/* ── MOBILE: Card View (Visible below md) ── */}
      <div className="flex flex-col gap-4 md:hidden p-1">
        {messageReport?.reports?.map((report: ReportItemType) => {
          const reasonClass = REASON_STYLES[report.reason] || REASON_STYLES.default;
          const statusInfo = STATUS_STYLES[report.status] || STATUS_STYLES.default;

          return (
            <div
              key={report.id || report.reporterId}
              className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 flex flex-col gap-4 shadow-lg"
            >
              {/* Header: ID & Review Action */}
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Report ID</span>
                  <span className="text-white text-sm font-mono font-bold">#{report.reporterId}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedReport(report)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-xs text-zinc-200 transition-all"
                  aria-label={`View report details for #${report.reporterId}`}
                >
                  <Eye className="size-3.5" />
                  <span>Details</span>
                </button>
              </div>

              {/* Grid Body: Parties Involved */}
              <div className="grid grid-cols-2 gap-4 bg-zinc-950/40 p-3 rounded-xl border border-zinc-800/40">
                {/* Reporter */}
                <div className="flex flex-col gap-1.5 min-w-0">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Reporter</span>
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="size-6 rounded bg-[#262626] flex items-center justify-center text-zinc-400 text-[9px] font-bold flex-shrink-0">
                      {report.reporter?.fullname?.slice(0, 2) || "UR"}
                    </div>
                    <span className="text-white text-xs font-medium truncate">{report.reporter?.fullname}</span>
                  </div>
                </div>

                {/* Accused/Reported */}
                <div className="flex flex-col gap-1.5 border-l border-zinc-800 pl-3 min-w-0">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Reported User</span>
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="size-6 rounded bg-[#262626] flex items-center justify-center text-zinc-400 text-[9px] font-bold flex-shrink-0">
                      {report.reportedUser?.fullname?.slice(0, 2) || "UR"}
                    </div>
                    <span className="text-white text-xs font-medium truncate">{report.reportedUser?.fullname}</span>
                  </div>
                </div>
              </div>

              {/* Description Snippet */}
              {report.description && (
                <div className="flex flex-col gap-1 bg-zinc-950/20 p-2.5 rounded-lg border border-zinc-800/30">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Context Statement</span>
                  <p className="text-zinc-400 text-xs line-clamp-2 leading-relaxed">
                    {report.description}
                  </p>
                </div>
              )}

              {/* Footer: Meta Flags */}
              <div className="flex items-center justify-between pt-1 border-t border-zinc-800/50">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Reason</span>
                  <span className={`px-2.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wide inline-block ${reasonClass}`}>
                    {report.reason?.replace("_", " ")}
                  </span>
                </div>
                <div className="flex flex-col gap-1 items-end">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Status</span>
                  <span className={`text-xs font-bold uppercase ${statusInfo}`}>
                    {report?.status}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── DESKTOP: Table View (Visible on md+ screens) ── */}
      <div className="hidden md:block bg-card-bg-0 rounded-2xl border border-card-bg-0 shadow-2xl overflow-x-auto md:overflow-visible">
        <table className="w-full text-left border-collapse">
          <thead className="bg-card-bg-0/30 text-[10px] font-bold uppercase tracking-[0.15em] text-secondary-0/70">
            <tr>
              <th className="px-8 py-6">Report ID</th>
              <th className="px-4 py-6">Reporter</th>
              <th className="px-4 py-6 text-secondary-0">Reported User</th>
              <th className="px-4 py-6">Reason</th>
              <th className="px-4 py-6">Description</th>
              <th className="px-8 py-6 text-right">STATUS</th>
              <th className="px-8 py-6 text-right">DETAILS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-card-bg-0">
            {messageReport?.reports?.map((report: ReportItemType) => {
              const reasonClass = REASON_STYLES[report.reason] || REASON_STYLES.default;
              const statusInfo = STATUS_STYLES[report.status] || STATUS_STYLES.default;

              return (
                <tr
                  key={report.id || report.reporterId}
                  className="hover:bg-card-bg-0/20 transition-colors group"
                >
                  {/* 1. REPORT ID */}
                  <td className="px-8 py-6 text-white font-medium text-sm">
                    #{report.reporterId}
                  </td>

                  {/* 2. REPORTER */}
                  <td className="px-4 py-6">
                    <div className="flex items-center gap-3">
                      {report.reporter?.profile_image ? (
                        <img
                          src={report.reporter.profile_image}
                          alt={report.reporter.fullname}
                          className="size-8 rounded-lg object-cover"
                        />
                      ) : (
                        <div className="size-8 rounded-lg bg-[#262626] flex items-center justify-center text-[#A3A3A3] text-[10px] font-bold uppercase">
                          {report.reporter?.fullname?.slice(0, 2) || "UR"}
                        </div>
                      )}
                      <div className="flex flex-col">
                        <span className="text-white text-sm font-medium">
                          {report.reporter?.fullname}
                        </span>
                        <span className="text-[#A3A3A3] text-xs">
                          @{report.reporter?.displayname}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* 3. REPORTED USER */}
                  <td className="px-4 py-6">
                    <div className="flex items-center gap-3">
                      {report.reportedUser?.profile_image ? (
                        <img
                          src={report?.reportedUser?.profile_image}
                          alt={report?.reportedUser?.fullname}
                          className="size-8 rounded-lg object-cover"
                        />
                      ) : (
                        <div className="size-8 rounded-lg bg-[#262626] flex items-center justify-center text-[#A3A3A3] text-[10px] font-bold uppercase">
                          {report.reportedUser?.fullname?.slice(0, 2) || "UR"}
                        </div>
                      )}
                      <div className="flex flex-col">
                        <span className="text-white text-sm font-medium">
                          {report.reportedUser?.fullname}
                        </span>
                        <span className="text-[#A3A3A3] text-xs">
                          @{report.reportedUser?.displayname}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* 4. REASON BADGE */}
                  <td className="px-4 py-6">
                    <span
                      className={`px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${reasonClass}`}
                    >
                      {report.reason?.replace("_", " ")}
                    </span>
                  </td>

                  {/* 5. DESCRIPTION */}
                  <td className="px-4 py-6 text-sm text-secondary-0/80">
                    {report.description?.split(" ").length > 3
                      ? report.description.split(" ").slice(0, 3).join(" ") + "..."
                      : report.description}
                  </td>

                  {/* 6. STATUS BADGE */}
                  <td className="px-8 py-6 text-right">
                    <span className={`text-sm font-medium ${statusInfo}`}>
                      {report?.status}
                    </span>
                  </td>

                  {/* 7. ACTIONS */}
                  <td className="px-8 py-6 text-right">
                    <button
                      type="button"
                      onClick={() => setSelectedReport(report)}
                      className="px-4 py-2 rounded-lg text-secondary-0/70 hover:text-white transition-all inline-flex items-center justify-center"
                      aria-label={`View report details for #${report.reporterId}`}
                    >
                      <Eye className="size-5" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* ── SINGLE MODAL TRIGGER INSTANCE ── */}
      {selectedReport && (
        <MessagingReportDetailsDialog
          open={!!selectedReport}
          onClose={() => setSelectedReport(null)}
          details={{
            reason: selectedReport.reason,
            description: selectedReport.description,
            image: selectedReport.image_url!,
            reportedUserId: selectedReport.reportedUserId,
          }}
          onSuspend={() => handleSuspend(selectedReport.id)}
          onResolve={(actionType) => handleResolve(actionType)}
        />
      )}
    </div>
  );
}

export default MessagingReport;