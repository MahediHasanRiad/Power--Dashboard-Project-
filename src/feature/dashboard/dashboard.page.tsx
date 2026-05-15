import { List, TriangleAlert, Users } from "lucide-react";
import { DashboardStatsCard } from "./components/dashboard-card";
import { UserGrowthChart } from "./components/growth-cart";
import TopbarPart from "./components/top-bar-part";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/store/store";
import { adminStatusThunk } from "./redux/admin-status.thunk";
import { userGrowthThunk } from "./redux/user-growth.thunk";

function DashboardPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, isError, data } = useSelector((state: RootState) => state.dashboard);
  const {growth} = useSelector((state: RootState) => state.dashboard )

  useEffect(() => {
    (async () => {
      await dispatch(adminStatusThunk()).unwrap();
      await dispatch(userGrowthThunk()).unwrap();
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
          data={data?.total_users.toString() ?? '0'}
          ranking={data?.total_growth_pct.toString() ?? '0'}
        />
        <DashboardStatsCard
          title="Active Listening"
          Icon={List}
          data={data?.active_users.toString() ?? '0'}
          ranking={data?.active_growth_pct.toString() ?? '0'}
        />
        <DashboardStatsCard
          title="Pending Disputes"
          Icon={TriangleAlert}
          data={data?.pending_users.toString() ?? '0'}
          ranking={data?.pending_growth_pct.toString() ?? '0'}
          down={true}
        />
      </section>

      {/* user growth  */}
      <section>
        <UserGrowthChart growth={growth} />
      </section>
    </section>
  );
}

export default DashboardPage;
