import type { UserType } from "../redux/user-manager.slice";
import { ActionBtn } from "./action-btn";
import { StatusBadgeField } from "./statusBadge";

export function UserTable({ users }: { users: UserType[] }) {
  const safeUsers = users ?? [];
  const status = ["ACTIVE", "PENDING", "REJECTED"];

  return (
    <div className="w-full bg-card-bg-0 rounded-xl overflow-x-auto md:overflow-visible mt-4">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-card-bg-0">
            <th className="p-6 text-[10px] font-bold tracking-[0.2em] text-[#525252] uppercase">
              User
            </th>
            <th className="p-6 text-[10px] font-bold tracking-[0.2em] text-[#525252] uppercase">
              Contact
            </th>
            <th className="p-6 text-[10px] font-bold tracking-[0.2em] text-[#525252] uppercase text-center">
              Role
            </th>
            <th className="p-6 text-[10px] font-bold tracking-[0.2em] text-[#525252] uppercase text-center">
              Status
            </th>
            <th className="p-6 text-[10px] font-bold tracking-[0.2em] text-[#525252] uppercase text-center">
              Trust
            </th>
            <th className="p-6 text-[10px] font-bold tracking-[0.2em] text-[#525252] uppercase text-right">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#1A1A1A]">
          {safeUsers.map((user) => (
            <tr
              key={user.id}
              className="hover:bg-[#111111b4] transition-colors group"
            >
              {/* User Column */}
              <td className="p-6">
                <div className="flex items-center gap-4">
                  <img
                    src={user.profile_image ?? "../../../../public/profile.png"}
                    alt=""
                    className="size-12 rounded-full object-cover grayscale group-hover:grayscale-0 transition-all"
                  />
                  <div>
                    <p className="text-white font-bold text-lg leading-tight">
                      {user.fullname}
                    </p>
                    <p className="text-[#525252] text-xs font-mono uppercase mt-1">
                      ID: {user.id}
                    </p>
                  </div>
                </div>
              </td>

              {/* Contact Column */}
              <td className="p-6 text-[#A3A3A3] font-medium">{user.email}</td>

              {/* Role Column */}
              <td className="p-6 text-center">
                <span className="px-4 py-1.5 rounded-full bg-card-bg-0 text-[#A3A3A3] text-xs font-semibold border border-[#262626]">
                  {user.roles}
                </span>
              </td>

              {/* Status Column */}
              <td className="p-6">
                <div className="flex justify-center">
                  <StatusBadgeField status={user.accountStatus} />
                </div>
              </td>

              {/* Trust Column */}
              <td className="p-6 text-center">
                <span
                  className={`text-2xl font-bold ${user.latitude < 20 ? "text-[#F87171]" : "text-white"}`}
                >
                  {user.latitude}
                </span>
              </td>

              {/* Actions placeholder */}
              <td>
                <ActionBtn
                  userId={user.id}
                  status={status}
                  initialUserStatus={user.accountStatus}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
