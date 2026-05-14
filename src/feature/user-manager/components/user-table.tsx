import type { UserType } from "../user-manager.page";

export function UserTable({ users }: { users: UserType[] }) {
  return (
    <div className="w-full bg-card-bg-0 rounded-xl overflow-x-auto md:overflow-visible mt-4">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-[#1A1A1A]">
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
        <tbody className="divide-y divide-[#1A1A1A] overflow-scroll">
          {users.map((user) => (
            <tr
              key={user.id}
              className="hover:bg-[#111111b4] transition-colors group"
            >
              {/* User Column */}
              <td className="p-6">
                <div className="flex items-center gap-4">
                  <img
                    src={user.img}
                    alt=""
                    className="size-12 rounded-full object-cover grayscale group-hover:grayscale-0 transition-all"
                  />
                  <div>
                    <p className="text-white font-bold text-lg leading-tight">
                      {user.name}
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
                <span className="px-4 py-1.5 rounded-full bg-[#1A1A1A] text-[#A3A3A3] text-xs font-semibold border border-[#262626]">
                  {user.role}
                </span>
              </td>

              {/* Status Column */}
              <td className="p-6">
                <div className="flex justify-center">
                  <StatusBadge status={user.status} />
                </div>
              </td>

              {/* Trust Column */}
              <td className="p-6 text-center">
                <span
                  className={`text-2xl font-bold ${user.trust < 20 ? "text-[#F87171]" : "text-white"}`}
                >
                  {user.trust}
                </span>
              </td>

              {/* Actions placeholder */}
              <td className="p-6" />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    VERIFIED:
      "bg-[#2C2616] text-[#D4A017] border-[#D4A017]/30 shadow-[0_0_8px_rgba(212,160,23,0.1)]",
    PENDING: "bg-[#1A1A1A] text-[#A3A3A3] border-[#262626]",
    REJECTED: "bg-[#2A1A1A] text-[#F87171] border-[#F87171]/30",
  };

  return (
    <div
      className={`flex items-center gap-2 px-3 py-1 rounded-full border text-[10px] font-bold tracking-wider ${styles[status]}`}
    >
      <div
        className={`size-1.5 rounded-full ${status === "VERIFIED" ? "bg-[#D4A017]" : status === "REJECTED" ? "bg-[#F87171]" : "bg-[#A3A3A3]"}`}
      />
      {status}
    </div>
  );
}
