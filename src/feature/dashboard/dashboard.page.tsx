import { List, TriangleAlert, Users } from "lucide-react";
import { DashboardStatsCard } from "./components/dashboard-card";
import { UserGrowthChart } from "./components/growth-cart";
import TopbarPart from "./components/top-bar-part";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/store/store";
import { adminStatusThunk } from "./redux/admin-status.thunk";

function DashboardPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, isError, data } = useSelector((state: RootState) => state.dashboard);

  useEffect(() => {
    (async () => {
      await dispatch(adminStatusThunk()).unwrap();
    })();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-card-bg-0">
        <h1 className="text-[#D4A017] animate-pulse font-bold">
          Loading Dashboard...
        </h1>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-10 bg-red-900/20 text-red-500 rounded-lg">
        <p>Error loading dashboard: {isError}</p>
        <button
          onClick={() => window.location.reload()}
          className="underline mt-2"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <section>
      {/* top part  */}
      <TopbarPart
        status="System Status: Operational"
        title="Platform Health"
        description="All core services performing at optimal latency."
      />

      {/* report  */}
      <section className="grid md:grid-cols-2 lg:grid-cols-3">
        <DashboardStatsCard
          title="Total Users"
          Icon={Users}
          users={"12.4"}
          data={"14.2"}
        />
        <DashboardStatsCard
          title="Active Listening"
          Icon={List}
          users={"8.2"}
          data={"14.2"}
        />
        <DashboardStatsCard
          title="Pending Disputes"
          Icon={TriangleAlert}
          users={"12.4"}
          data={"14.2"}
          down={true}
        />
      </section>

      {/* user growth  */}
      <section>
        <UserGrowthChart />
      </section>
    </section>
  );
}

export default DashboardPage;
