export default function Error(isError: any) {
  return (
    <div className="p-10 bg-red-900/20 text-red-500 rounded-lg">
      <p>Error loading: {isError.message}</p>
      <button
        onClick={() => window.location.reload()}
        className="underline mt-2"
      >
        Retry
      </button>
    </div>
  );
}
