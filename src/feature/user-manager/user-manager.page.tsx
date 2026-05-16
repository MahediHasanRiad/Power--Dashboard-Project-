import { useEffect, useState } from "react";
import TopbarPart from "../dashboard/components/top-bar-part";
import { SearchFilterBar } from "./components/filter-section";
import { UserTable } from "./components/user-table";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/store/store";
import { userManagerThunk, type roleType } from "./redux/user-manager.thunk";
import { PaginationField } from "@/shared/pagination";

export interface UserType {
  id: string;
  name: string;
  email: string;
  role: "ALL" | "ADMIN" | "USER" | "SELLER" | "Courier" | "SERVICE_PROVIDER";
  status: "VERIFIED" | "PENDING" | "REJECTED";
  trust: number;
  img: string;
}

function UserManagerPage() {
  const [role, setRole] = useState<roleType>("ALL");
  const { isLoading, data } = useSelector(
    (state: RootState) => state.userManager,
  );
  const dispatch = useDispatch<AppDispatch>();

  //====================== pagination start ========================

  // pagination
  const [currentPage, setCurrentPage] = useState<number>(1);
  useEffect(() => {
    dispatch(userManagerThunk(role));
  }, [role, currentPage, dispatch]);

  const totalPages = data ? Math.ceil(data.total / data.page_size) : 0;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  //=================== pagination end ================================

  // console.log("user-manager", data);

  useEffect(() => {
    dispatch(userManagerThunk(role));
  }, [role, dispatch]);

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
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </section>
  );
}

export default UserManagerPage;
