import { Loader2 } from "lucide-react";

export default function LoadingSpinner({
  message = "Loading...",
}: {
  message?: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center p-8 w-full min-h-[200px] text-gray-500 space-y-3">
      <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      <p className="text-sm font-medium text-gray-600 animate-pulse">{message}</p>
    </div>
  );
}
