import {
  REASON_STYLES,
  STATUS_STYLES,
} from "@/feature/user-manager/utils/button-style";
import { Eye } from "lucide-react";
import { useState } from "react";
import { ReportDialog } from "./messeging-history-by-user";
import type { userReportType } from "../report-type";
import ReporterId from "../utils/reporter-id";
import Reason from "../utils/reason";
import StatusBadge from "../utils/status-badge";
import ReportField from "../utils/reporter";

interface UserReportFieldProps {
  ArticleData: userReportType[];
}

function UserReportField({ ArticleData }: UserReportFieldProps) {
  // Store the active report object instead of a boolean
  const [selectedReport, setSelectedReport] = useState<userReportType | null>(
    null,
  );

  return (
    <div className="bg-card-bg-0 rounded-2xl border border-card-bg-0 shadow-2xl overflow-x-auto md:overflow-visible">
      <table className="w-full text-left border-collapse">
        <thead className="bg-card-bg-0/30 text-[10px] font-bold uppercase tracking-[0.15em] text-secondary-0/70">
          <tr>
            <th className="px-8 py-6">Report ID</th>
            <th className="px-4 py-6">Reporter</th>
            <th className="px-4 py-6 text-secondary-0">Reported User</th>
            <th className="px-4 py-6">Reason</th>
            <th className="px-4 py-6">Status</th>
            <th className="px-8 py-6 text-right">Action</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-card-bg-0">
          {ArticleData?.map((report: userReportType) => {
            const reasonClass =
              REASON_STYLES[report.reason] || REASON_STYLES.default;
            const statusInfo =
              STATUS_STYLES[report.status] || STATUS_STYLES.default;

            return (
              <tr
                key={report.reporterId} // Note: Ensure this ID is unique per row. If one reporter makes multiple reports, use report.id instead.
                className="hover:bg-card-bg-0/20 transition-colors group"
              >
                {/* 1. REPORT ID */}
                <ReporterId id={report.reporterId} />

                {/* 2. REPORTER */}
                <ReportField image={report.reporter} />

                {/* 3. REPORTED USER */}
                <ReportField image={report.reportedUser} />

                {/* 4. REASON BADGE */}
                <Reason reason={report} reasonClass={reasonClass} />

                {/* 5. STATUS BADGE */}
                <StatusBadge status={report} statusInfo={statusInfo} />

                {/* 6. ACTIONS */}
                <td className="px-8 py-6 text-right">
                  <button
                    type="button"
                    onClick={() => setSelectedReport(report)}
                    className="px-4 py-2 rounded-lg text-secondary-0/70 hover:text-white transition-all inline-flex items-center justify-center"
                    aria-label={`View report details for ${report.reporterId}`} // <--- Fixed here
                  >
                    <Eye className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Render only ONE dialog instance outside the table loop */}
      {selectedReport && (
        <ReportDialog
          open={!!selectedReport}
          onClose={() => setSelectedReport(null)}
          report={selectedReport} // Dynamic data based on what row was clicked!
          onBlock={() => console.log("blocked", selectedReport.reporterId)}
          onResolve={() => console.log("resolved", selectedReport.reporterId)}
          onEscalate={() => console.log("escalated", selectedReport.reporterId)}
        />
      )}
    </div>
  );
}

export default UserReportField;
