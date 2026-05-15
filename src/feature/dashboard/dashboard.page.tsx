import { List, TriangleAlert, Users } from "lucide-react";
import { DashboardStatsCard } from "./components/dashboard-card";
import { UserGrowthChart } from "./components/growth-cart";
import TopbarPart from "./components/top-bar-part";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/store/store";
import { adminStatusThunk } from "./redux/admin-status.thunk";
import { userGrowthThunk } from "./redux/user-growth.thunk";
import { Loading } from "@/shared/isLoading";
import Error from "@/shared/isError";

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
      <Loading />
    );
  }

  if (isError) {
    return (
      <Error isError={isError} />
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
