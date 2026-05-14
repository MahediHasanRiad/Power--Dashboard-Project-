import DashboardPage from "./feature/dashboard/dashboard.page";
import UserManagerPage from "./feature/user-manager/user-manager.page";
import MainLayout from "./layout/main.layout";




function App() {
  return (
    <>
      <MainLayout>
        {/* <DashboardPage /> */}
        <UserManagerPage />
      </MainLayout>
    </>
  );
}

export default App;
