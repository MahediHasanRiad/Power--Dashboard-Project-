import CMSpage from "./feature/CMS/CMS.page";
import DashboardPage from "./feature/dashboard/dashboard.page";
import { UserReports } from "./feature/Reporting/reporting.page";
import UserManagerPage from "./feature/user-manager/user-manager.page";
import MainLayout from "./layout/main.layout";




function App() {
  return (
    <>
      <MainLayout >
        {/* <DashboardPage /> */}
        {/* <UserManagerPage /> */}
        {/* <CMSpage /> */}
        <UserReports />
      </MainLayout>
    </>
  );
}

export default App;
