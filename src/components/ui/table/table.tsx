// components/table/index.tsx
import { ReactNode } from "react";

interface TableProps {
  children: ReactNode;
  className?: string;
}

interface TableHeaderProps {
  children: ReactNode;
  className?: string;
}

interface TableBodyProps {
  children: ReactNode;
  className?: string;
}

interface TableRowProps {
  children: ReactNode;
  className?: string;
}

interface TableCellProps {
  children: ReactNode;
  isHeader?: boolean;
  className?: string;
}

const Table: React.FC<TableProps> = ({ children, className = "" }) => {
  return (
    <div className="w-full overflow-x-auto">
      <table className={`min-w-full table-auto border-collapse ${className}`}>
        {children}
      </table>
    </div>
  );
};

const TableHeader: React.FC<TableHeaderProps> = ({
  children,
  className = "",
}) => {
  return <thead className={`bg-gray-50 ${className}`}>{children}</thead>;
};

const TableBody: React.FC<TableBodyProps> = ({ children, className = "" }) => {
  return <tbody className={className}>{children}</tbody>;
};

const TableRow: React.FC<TableRowProps> = ({ children, className = "" }) => {
  return <tr className={className}>{children}</tr>;
};

const TableCell: React.FC<TableCellProps> = ({
  children,
  isHeader = false,
  className = "",
}) => {
  const CellTag = isHeader ? "th" : "td";
  return (
    <CellTag
      className={`border border-gray-300 px-4 py-2 text-left text-sm ${className}`}
    >
      {children}
    </CellTag>
  );
};

export { Table, TableHeader, TableBody, TableRow, TableCell };
