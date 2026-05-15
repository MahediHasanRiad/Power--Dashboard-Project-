import CMSpage from "./feature/CMS/CMS.page";
import DashboardPage from "./feature/dashboard/dashboard.page";
import { UserReports } from "./feature/Reporting/reporting.page";
import { UpdateProfile } from "./feature/Setting/profile.page";
import ResetPassword from "./feature/Setting/reset-password.page";
import UserManagerPage from "./feature/user-manager/user-manager.page";
import MainLayout from "./layout/main.layout";
import { Routes, Route } from "react-router";




function App() {
  return (
    <>
      <MainLayout >
        <Routes>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/user-management" element={<UserManagerPage />} />
          <Route path="/cms" element={<CMSpage />} />
          <Route path="/user-reports" element={<UserReports />} />
          <Route path="/update-profile" element={<UpdateProfile />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
      </MainLayout>
    </>
  );
}

export default App;
