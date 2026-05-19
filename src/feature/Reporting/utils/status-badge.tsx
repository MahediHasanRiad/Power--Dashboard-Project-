

function StatusBadge({status, statusInfo}: {status: any, statusInfo: any}) {
  return (
    <td className="px-4 py-6">
      <div className="flex items-center gap-2">
        <span className={`text-sm text-gray-300 font-medium ${statusInfo}`}>
          {status.status}
        </span>
      </div>
    </td>
  );
}

export default StatusBadge;
