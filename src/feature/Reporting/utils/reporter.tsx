import React from "react";

function ReportField({image}: {image: any}) {
  return (
    <td className="px-4 py-6">
      <div className="flex items-center gap-3">
        {image?.profile_image ? (
          <img
            src={image.profile_image}
            alt={image.fullname}
            className="size-8 rounded-lg object-cover"
          />
        ) : (
          <div className="size-8 rounded-lg bg-[#262626] flex items-center justify-center text-[#A3A3A3] text-[10px] font-bold uppercase">
            {image?.fullname?.slice(0, 2) || "UR"}
          </div>
        )}
        <div className="flex flex-col">
          <span className="text-white text-sm font-medium">
            {image?.fullname}
          </span>
          <span className="text-[#A3A3A3] text-xs">
            @{image?.displayname}
          </span>
        </div>
      </div>
    </td>
  );
}

export default ReportField;
