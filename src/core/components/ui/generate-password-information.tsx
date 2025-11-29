import { InfoIcon } from "lucide-react";

export default function GeneratedPasswordInformation() {
  return (
    <div className="mt-4 rounded-xl border border-blue-200 bg-blue-50 p-4">
      <div className="flex items-start gap-3">
        <div className="mt-0.5 shrink-0">
          <InfoIcon className="text-blue-700" />
        </div>
        <div>
          <p className="font-bold text-blue-800">Informasi!</p>
          <p className="mt-1 text-sm text-blue-700">
            Password akan digenerate secara otomatis dan dikirimkan ke email
            yang Anda masukkan.
          </p>
        </div>
      </div>
    </div>
  );
}
