import { List, TriangleAlert, Users } from "lucide-react";
import { DashboardStatsCard } from "./components/dashboard-card";
import { UserGrowthChart } from "./components/growth-cart";
import TopbarPart from "./components/top-bar-part";
import axios from 'axios';

async function DashboardPage() {

  // const data = await axios.get('/api/reports')
  // console.log('data', data)

  return (
    <section>
      {/* top part  */}
      <TopbarPart status="System Status: Operational" title="Platform Health" description="All core services performing at optimal latency." />

      {/* report  */}
      <section className="grid md:grid-cols-2 lg:grid-cols-3">
        <DashboardStatsCard title="Total Users" Icon={Users} users={'12.4'} data={'14.2'}/>
        <DashboardStatsCard title="Active Listening" Icon={List } users={'8.2'} data={'14.2'}/>
        <DashboardStatsCard title="Pending Disputes" Icon={TriangleAlert} users={'12.4'} data={'14.2'} down={true}/>
      </section>

      {/* user growth  */}
      <section>
        <UserGrowthChart />
      </section>
    </section>
  );
}

export default DashboardPage;
