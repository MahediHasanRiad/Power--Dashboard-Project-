import { useEffect, useState } from "react";
import TopbarPart from "../dashboard/components/top-bar-part";
import { SearchFilterBar } from "./components/filter-section";
import { UserTable } from "./components/user-table";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/store/store";
import { userManagerThunk, type roleType } from "./redux/user-manager.thunk";

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

  const { isLoading, data } = useSelector((state: RootState) => state.userManager);
  const dispatch = useDispatch<AppDispatch>();

  // console.log("user-manager", data);

  useEffect(() => {
    dispatch(userManagerThunk(role));
  }, [role, dispatch]);

  const setRoleHandler = (selectedRole: roleType) => {
    setRole(selectedRole);
  };

  // loading
  if(isLoading) <div>Loading...</div>
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
      <UserTable users={data!} />
    </section>
  );
}

export default UserManagerPage;
