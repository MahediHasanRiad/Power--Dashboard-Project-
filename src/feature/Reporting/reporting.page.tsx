import type { AppDispatch, RootState } from "@/store/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userReportThunk } from "./redux/user-report.thunk";
import { Loading } from "@/shared/isLoading";
import Error from "@/shared/isError";
import { PaginationField } from "@/shared/pagination";
import {
  REASON_STYLES,
  STATUS_STYLES,
} from "../user-manager/utils/button-style";

const reports = [
  {
    id: "#UR-9421",
    reporter: "Julianne Devis",
    reporterInitials: "JD",
    subject: "Black Diamond Logistics",
    reason: "FRAUD ATTEMPT",
    status: "Pending Review",

    action: "INVESTIGATE",
  },
  {
    id: "#UR-9420",
    reporter: "Marcus King",
    reporterInitials: "MK",
    subject: "Aesthetic Interiors",
    reason: "HARASSMENT",
    status: "In Progress",
    action: "INVESTIGATE",
  },
  {
    id: "#UR-9398",
    reporter: "Sarah Rain",
    reporterInitials: "SR",
    subject: "Velocity Rentals",
    reason: "POLICY VIOLATION",
    status: "Resolved",
    action: "VIEW LOGS",
  },
];

const initialValue = {
  page: 1,
  page_size: 1,
};

export function UserReports() {

  const [currentPage, setCurrentPage] = useState(initialValue);

  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, isError, data } = useSelector(
    (state: RootState) => state.userReport,
  );

  console.log("get data", data);

  useEffect(() => {
    (async () => {
      await dispatch(
        userReportThunk({
          page: currentPage.page,
          page_size: currentPage.page_size,
        }),
      ).unwrap();
    })();
  }, []);

  const totalPages = data ? Math.ceil(data?.total / data?.page_size) : 0;

  const handlePageChange = (page: number) => {
    setCurrentPage((prev) => ({
      ...prev,
      page: page,
    }));
  };

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <Error isError={isError} />;
  }

  return (
    <section className="w-full p-8 font-sans">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-white text-4xl font-bold tracking-tight mb-3">
          Recent User Reports
        </h1>
        <p className="text-[#A3A3A3] max-w-2xl text-sm leading-relaxed">
          Review and manage high-priority concerns submitted by the community.
          Triage reports and maintain ecosystem safety.
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex gap-8 border-b border-card-bg-0 mb-8">
        <button className="text-secondary-0 text-xs font-bold uppercase tracking-widest pb-4 border-b-2 border-secondary-0">
          User Reports
        </button>
      </div>

      {/* Main Table */}
      <div className="bg-card-bg-0 rounded-2xl border border-card-bg-0 shadow-2xl overflow-x-auto md:overflow-visible">
        <table className="w-full text-left border-collapse">
          <thead className="bg-card-bg-0/30 text-[10px] font-bold uppercase tracking-[0.15em] text-secondary-0/70">
            <tr>
              <th className="px-8 py-6">Report ID</th>
              <th className="px-4 py-6">Reporter</th>
              <th className="px-4 py-6 text-secondary-0">
                Subject <br />{" "}
                <span className="opacity-60 lowercase font-medium">
                  (provider)
                </span>
              </th>
              <th className="px-4 py-6">Reason</th>
              <th className="px-4 py-6">Status</th>
              <th className="px-8 py-6 text-right">Action</th>
            </tr>
          </thead>
          {/* all data with mapping  */}
          <tbody className="divide-y divide-card-bg-0">
            {reports.map((report) => {
              const reasonClass =
                REASON_STYLES[report.reason] || REASON_STYLES.default;
              const statusInfo =
                STATUS_STYLES[report.status] || STATUS_STYLES.default;

              return (
                <tr
                  key={report.id}
                  className="hover:bg-card-bg-0/20 transition-colors group"
                >
                  <td className="px-8 py-6 text-white font-medium text-sm">
                    {report.id}
                  </td>
                  <td className="px-4 py-6">
                    <div className="flex items-center gap-3">
                      {/* Inline Avatar Fallback */}
                      <div className="size-8 rounded-lg bg-[#262626] flex items-center justify-center text-[#A3A3A3] text-[10px] font-bold">
                        {report.reporterInitials}
                      </div>
                      <span className="text-[#A3A3A3] text-sm leading-tight max-w-[80px]">
                        {report.reporter}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-6 text-[#A3A3A3] text-sm">
                    {report.subject}
                  </td>
                  <td className="px-4 py-6">
                    <span
                      className={`px-4 py-1.5 rounded-full text-[8px] md:text-[10px] font-bold border tracking-wider bg-red-900/20 text-red-400 border-red-900/30 ${reasonClass}`}
                    >
                      {report.reason}
                    </span>
                  </td>
                  <td className="px-4 py-6">
                    <div className="flex items-center gap-2">
                      <span className={`size-1.5 rounded-full `} />
                      <span className={`text-[#A3A3A3] text-sm ${statusInfo}`}>
                        {report.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <button
                      className={`text-[10px] font-black tracking-widest transition-colors ${report.action === "INVESTIGATE" ? "text-[#D4A017] hover:text-white" : "text-[#525252] hover:text-white"}`}
                    >
                      {report.action}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* pagination  */}
      <div>
        <PaginationField
          currentPage={currentPage.page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </section>
  );
}
