import type { AppDispatch, RootState } from "@/store/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userReportThunk } from "./redux/user-report.thunk";
import { Loading } from "@/shared/isLoading";
import Error from "@/shared/isError";
import { PaginationField } from "@/shared/pagination";
import { ArticleData } from "../Reporting/reporting-data";
import UserReportField from "./components/user-report";
import type { userReportType } from "./report-type";
import MessagingReport from "./components/messaging-report";

const initialValue = {
  page: 1,
  page_size: 10, // Increased page size to a standard default value
};

interface UserReportFieldProps {
  ArticleData: userReportType[];
}
type currentTabType = "user-report" | "message-history"
export function UserReports() {
  const [currentPage, setCurrentPage] = useState(initialValue);
  const [currentTab, setCurrentTab] = useState<currentTabType>("user-report");

  const { isLoading, isError, data } = useSelector(
    (state: RootState) => state.userReport,
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(
      userReportThunk({
        page: currentPage.page,
        page_size: currentPage.page_size,
      }),
    );
  }, [currentPage.page, currentPage.page_size, dispatch]);

  const totalPages = data ? Math.ceil(data.total / data.page_size) : 0;

  const handlePageChange = (page: number) => {
    setCurrentPage((prev) => ({
      ...prev,
      page: page,
    }));
  };

  const userTabHandler = (data:currentTabType ) => {
    setCurrentTab(data);
  };

  if (isLoading) return <Loading />;
  if (isError) return <Error isError={isError} />;

  // Safely fallback to an empty array if data isn't loaded yet
  const reportList = data?.reports || [];

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
        <button
          onClick={() => userTabHandler("user-report")}
          className={`${currentTab === "user-report" ? "text-secondary-0 border-b-2 border-secondary-0" : "text-white"} text-xs font-bold uppercase tracking-widest pb-4`}
        >
          User Reports ({data?.total || 0})
        </button>
        <button
          onClick={() => userTabHandler("message-history")}
          className={`${currentTab === "message-history" ? "text-secondary-0 border-b-2 border-secondary-0" : "text-white"} text-xs font-bold uppercase tracking-widest pb-4`}
        >
          Messaging Reports ({data?.total || 0})
        </button>
      </div>

      {/* Main Table */}
      {currentTab === 'user-report' && <UserReportField ArticleData={ArticleData} />}
      {currentTab === 'message-history' && <MessagingReport />}

      {/* Pagination */}
      <div className="mt-6">
        <PaginationField
          currentPage={currentPage.page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </section>
  );
}
