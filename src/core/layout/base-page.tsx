import React from "react";
import clsx from "clsx";

interface BasePageProps {
  children: React.ReactNode;
  className?: string;
}

export default function BasePage({ children, className }: BasePageProps) {
  return (
    <main
      className={clsx(
        "container flex  min-w-full flex-col items-center space-y-5 py-3 text-center",
        className,
      )}
    >
      {children}
    </main>
  );
}
