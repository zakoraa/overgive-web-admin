import clsx from "clsx";
import { AppButton } from "../button/app-button";

type PaginationButtonProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export const PaginationButton = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationButtonProps) => {
  const getPageNumbers = () => {
    if (totalPages <= 3) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const delta = 2;
    const range = [];

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) range.unshift("...");
    if (currentPage + delta < totalPages - 1) range.push("...");

    range.unshift(1);
    if (totalPages > 1) range.push(totalPages);

    return range;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="mt-6 flex w-auto items-center justify-center space-x-1">
      <AppButton
        text="Prev"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        width="auto"
        fontSize="14px"
        height="auto"
        borderRadius="8px"
        className="px-2 py-1"
      />

      {pageNumbers.map((page, index) =>
        page === "..." ? (
          <span key={index} className="px-3 py-1 text-gray-500">
            ...
          </span>
        ) : (
          <AppButton
            text={page.toString()}
            key={index}
            width="auto"
            height="auto"
            fontSize="14px"
            borderRadius="8px"
            onClick={() => typeof page === "number" && onPageChange(page)}
            className={clsx(
              `${currentPage === page ? "bg-primary text-white" : "opacity-60"}`,
              "px-3 py-1",
            )}
          />
        ),
      )}

      <AppButton
        text="Next"
        width="auto"
        height="auto"
        fontSize="14px"
        borderRadius="8px"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="px-2 py-1"
      />
    </div>
  );
};
