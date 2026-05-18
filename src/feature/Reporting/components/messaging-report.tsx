import { useEffect, useState } from "react";
import { messagingData } from "../messaging-data";
import {
  REASON_STYLES,
  STATUS_STYLES,
} from "@/feature/user-manager/utils/button-style";
import { Eye } from "lucide-react";
import { ReportDialog } from "./messeging-history-by-user";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/store/store";
import { GetAllMessageReportThunk } from "../redux/get-all-message-report.thunk";

function MessagingReport() {
  const [open, setOpen] = useState(false);
  const { isError, isLoading, messageReport } = useSelector(
    (state: RootState) => state.userReport,
  );
  const dispatch = useDispatch<AppDispatch>();

  console.log('m', messageReport);

  useEffect(() => {
    (async () => {
      await dispatch(GetAllMessageReportThunk()).unwrap();
    })();
  }, [dispatch]);

  return (
    <div className='bg-card-bg-0 rounded-2xl border border-card-bg-0 shadow-2xl overflow-x-auto md:overflow-visible"'>
      <table className="w-full text-left border-collapse">
        <thead className="bg-card-bg-0/30 text-[10px] font-bold uppercase tracking-[0.15em] text-secondary-0/70">
          <tr>
            <th className="px-8 py-6">Report ID</th>
            <th className="px-4 py-6">Reporter</th>
            <th className="px-4 py-6 text-secondary-0">Reported User</th>
            <th className="px-4 py-6">Reason</th>
            <th className="px-4 py-6">Message</th>
            <th className="px-8 py-6 text-right">STATUS</th>
            <th className="px-8 py-6 text-right">ACTION</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-card-bg-0">
          {messagingData?.map((report) => {
            const reasonClass =
              REASON_STYLES[report.reason] || REASON_STYLES.default;
            const statusInfo =
              STATUS_STYLES[report.status] || STATUS_STYLES.default;

            return (
              <tr
                key={report.reporterId}
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
                    {report.reporter?.profile_image ? (
                      <img
                        src={report.reportedUser.profile_image ?? ""}
                        alt={report.reporter.fullname}
                        className="size-8 rounded-lg object-cover"
                      />
                    ) : (
                      <div className="size-8 rounded-lg bg-[#262626] flex items-center justify-center text-[#A3A3A3] text-[10px] font-bold uppercase">
                        {report.reportedUser.fullname.slice(0, 2) || "UR"}
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
                    {report.reason.replace("_", " ")}
                  </span>
                </td>

                {/* 5. STATUS BADGE */}
                <td className="px-4 py-6">
                  <div className="flex items-center gap-2">
                    <span className={`text-sm font-medium ${statusInfo}`}>
                      {report.status}
                    </span>
                  </div>
                </td>

                {/* 6. ACTIONS */}
                <td className="px-8 py-6 text-right">
                  <span
                    // type="button"
                    onClick={() => setOpen(true)}
                    className="px-4 py-2 rounded-lg hover:text-white transition-all"
                  >
                    <Eye />
                  </span>

                  {/* open the history box  */}
                  <ReportDialog
                    open={open}
                    onClose={() => setOpen(false)}
                    report={{
                      id: 4821,
                      reason: "FRAUD_ATTEMPT",
                      description:
                        "This user has been sending fake payment confirmations to multiple sellers. I have screenshots as evidence.",
                      adminAction:
                        "User has been warned previously for similar behavior.",
                      status: "PENDING",
                      reporter: {
                        fullname: "Sarah Ahmed",
                        displayname: "@sarah_a",
                        profile_image: "",
                      },
                      reportedUser: {
                        fullname: "John Doe",
                        displayname: "@johndoe",
                        profile_image: "",
                      },
                    }}
                    onBlock={() => console.log("blocked")}
                    onResolve={() => console.log("resolved")}
                    onEscalate={() => console.log("escalated")}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default MessagingReport;
