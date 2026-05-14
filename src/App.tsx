import CMSpage from "./feature/CMS/CMS.page";
import DashboardPage from "./feature/dashboard/dashboard.page";
import ReportingPage from "./feature/Reporting/reporting.page";
import UserManagerPage from "./feature/user-manager/user-manager.page";
import MainLayout from "./layout/main.layout";




function App() {
  return (
    <>
      <MainLayout >
        {/* <DashboardPage /> */}
        {/* <UserManagerPage /> */}
        {/* <CMSpage /> */}
        <ReportingPage />
      </MainLayout>
    </>
  );
}

export default App;
