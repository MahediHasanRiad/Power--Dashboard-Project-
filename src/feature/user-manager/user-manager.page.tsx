import { useEffect, useState } from "react";
import TopbarPart from "../dashboard/components/top-bar-part";
import { SearchFilterBar } from "./components/filter-section";
import { UserTable } from "./components/user-table";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/store/store";
import { userManagerThunk } from "./redux/user-manager.thunk";
import { PaginationField } from "@/shared/pagination";
import {
  initialPaginationValue,
  type paginationType,
  type roleType,
} from "./utils/user-management-type";

function UserManagerPage() {
  const [role, setRole] = useState<roleType>("ALL");
  const { isLoading, data } = useSelector(
    (state: RootState) => state.userManager,
  );
  const dispatch = useDispatch<AppDispatch>();

  //====================== pagination start ========================

  // pagination
  const [currentPage, setCurrentPage] = useState<paginationType>(
    initialPaginationValue,
  );

  useEffect(() => {
    dispatch(
      userManagerThunk({
        role: role,
        page: currentPage.page,
        page_size: currentPage.page_size,
      }),
    );
  }, [role, currentPage, dispatch]);

  const totalPages = data ? Math.ceil(data.total / data.page_size) : 0;

  const handlePageChange = (page: number) => {
    setCurrentPage((prev) => ({
      ...prev,
      page: page,
    }));
  };

  //=================== pagination end ================================

  const setRoleHandler = (selectedRole: roleType) => {
    setRole(selectedRole);
  };

  // loading
  if (isLoading) <div>Loading...</div>;

  
  return (
    <section>
      {/* Top part  */}
      <TopbarPart
        status="System Status: Operational"
        title="Platform Health"
        description="All core services performing at optimal latency."
      />

      {/* filter part / input data  */}
      <SearchFilterBar setRoleHandler={setRoleHandler} />

      {/* user data table  */}
      <UserTable users={data ?? null} />

      {/* pagination  */}
      <PaginationField
        currentPage={currentPage.page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </section>
  );
}

export default UserManagerPage;
