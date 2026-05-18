import React from "react";

function Reason({reason, reasonClass}: {reason: any, reasonClass: any}) {
  return (
    <td className="px-4 py-6">
      <span
        className={`px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${reasonClass}`}
      >
        {reason.reason.replace("_", " ")}
      </span>
    </td>
  );
}

export default Reason;
