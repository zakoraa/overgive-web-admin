import AppLayout from "@/core/layout/app-layout";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={null}>
      <AppLayout />
    </Suspense>
  );
}
