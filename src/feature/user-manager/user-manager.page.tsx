import TopbarPart from "../dashboard/components/top-bar-part";
import { SearchFilterBar } from "./components/filter-section";
import { UserTable } from "./components/user-table";

export interface UserType {
  id: string;
  name: string;
  email: string;
  role: "Buyer" | "Courier" | "Provider" | "Seller";
  status: "VERIFIED" | "PENDING" | "REJECTED";
  trust: number;
  img: string;
}

// Type the array using the interface
const users: UserType[] = [
  {
    id: "PW-98234",
    name: "Elena Rodriguez",
    email: "elena.r@power.io",
    role: "Buyer",
    status: "REJECTED",
    trust: 98,
    img: "/elena.jpg",
  },
  {
    id: "PW-11456",
    name: "Marcus Thorne",
    email: "m.thorne@logistics.net",
    role: "Courier",
    status: "PENDING",
    trust: 72,
    img: "/marcus.jpg",
  },
  {
    id: "PW-77210",
    name: "Julian Voss",
    email: "j.voss@techvault.com",
    role: "Provider",
    status: "VERIFIED",
    trust: 85,
    img: "/julian.jpg",
  },
  {
    id: "PW-44901",
    name: "Sarah Jenkins",
    email: "Flagged Contact",
    role: "Seller",
    status: "REJECTED",
    trust: 12,
    img: "/sarah.jpg",
  },
];

function UserManagerPage() {
  return (
    <section>
      {/* Top part  */}
      <TopbarPart
        status="System Status: Operational"
        title="Platform Health"
        description="All core services performing at optimal latency."
      />

      {/* filter part / input data  */}
      <SearchFilterBar />

      {/* user data table  */}
      <UserTable users={users} />
    </section>
  );
}

export default UserManagerPage;
