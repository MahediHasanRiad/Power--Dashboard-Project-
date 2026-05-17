import type { getAllUserType } from "../redux/user-manager.slice";
import { ActionBtn } from "./action-btn";
import { StatusBadgeField } from "./statusBadge";

export function UserTable({ users }: { users: getAllUserType | null }) {
  const status = ["ACTIVE", "PENDING", "REJECTED"];
  const userList = users?.users ?? [];

  return (
    <div className="w-full mt-4">

      {/* ── MOBILE ── */}
      <div className="flex flex-col gap-3 md:hidden">
        {userList.map((user) => (
          <div
            key={user.id}
            className="bg-card-bg-0 rounded-xl p-4 border border-card-bg-0"
          >
            {/* Top row: avatar + name + actions */}
            <div className="flex items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-3">
                <img
                  src={user.profile_image ?? "../../../../public/profile.png"}
                  alt=""
                  className="size-10 rounded-full object-cover"
                />
                <div>
                  <p className="text-white font-bold text-sm leading-tight">
                    {user.fullname}
                  </p>
                  <p className="text-[#525252] text-[10px] font-mono uppercase mt-0.5">
                    ID: {user.id}
                  </p>
                </div>
              </div>
              <ActionBtn
                userId={user.id}
                status={status}
                initialUserStatus={user.accountStatus}
              />
            </div>

            {/* Detail grid */}
            <div className="grid grid-cols-2 gap-y-3 text-xs">
              <div>
                <p className="text-[#525252] uppercase tracking-widest text-[9px] mb-1">
                  Contact
                </p>
                <p className="text-[#A3A3A3] font-medium truncate max-w-[140px]">
                  {user.email}
                </p>
              </div>

              <div>
                <p className="text-[#525252] uppercase tracking-widest text-[9px] mb-1">
                  Role
                </p>
                <span className="px-2.5 py-1 rounded-full bg-[#111] text-[#A3A3A3] text-[10px] font-semibold border border-[#262626]">
                  {user.roles}
                </span>
              </div>

              <div>
                <p className="text-[#525252] uppercase tracking-widest text-[9px] mb-1">
                  Status
                </p>
                <StatusBadgeField status={user.accountStatus} />
              </div>

              <div>
                <p className="text-[#525252] uppercase tracking-widest text-[9px] mb-1">
                  Trust
                </p>
                <span
                  className={`text-lg font-bold ${
                    user.trust_score < 20 ? "text-[#F87171]" : "text-white"
                  }`}
                >
                  {user.trust_score}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── DESKTOP: full table (hidden below md) ── */}
      <div className="hidden md:block bg-card-bg-0 rounded-xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#1A1A1A]">
              {["User", "Contact", "Role", "Status", "Trust", "Actions"].map(
                (col, i) => (
                  <th
                    key={col}
                    className={`p-6 text-[10px] font-bold tracking-[0.2em] text-[#525252] uppercase ${
                      i >= 2 && i < 5 ? "text-center" : i === 5 ? "text-right" : ""
                    }`}
                  >
                    {col}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1A1A1A]">
            {userList.map((user) => (
              <tr
                key={user.id}
                className="hover:bg-[#111111b4] transition-colors group"
              >
                {/* User */}
                <td className="p-6">
                  <div className="flex items-center gap-4">
                    <img
                      src={user.profile_image ?? "/profile.png"}
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

                {/* Contact */}
                <td className="p-6 text-[#A3A3A3] font-medium max-w-[180px]">
                  <span className="block truncate">{user.email}</span>
                </td>

                {/* Role */}
                <td className="p-6 text-center">
                  <span className="px-4 py-1.5 rounded-full bg-card-bg-0 text-[#A3A3A3] text-xs font-semibold border border-[#262626]">
                    {user.roles}
                  </span>
                </td>

                {/* Status */}
                <td className="p-6">
                  <div className="flex justify-center">
                    <StatusBadgeField status={user.accountStatus} />
                  </div>
                </td>

                {/* Trust */}
                <td className="p-6 text-center">
                  <span
                    className={`text-2xl font-bold ${
                      user.trust_score < 20 ? "text-[#F87171]" : "text-white"
                    }`}
                  >
                    {user.trust_score}
                  </span>
                </td>

                {/* Actions */}
                <td className="p-6">
                  <div className="flex justify-end">
                    <ActionBtn
                      userId={user.id}
                      status={status}
                      initialUserStatus={user.accountStatus}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}