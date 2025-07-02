import React, { ReactNode } from "react";

interface TableProps {
  headers: string[];
  children: ReactNode;
  className?: string;
}

interface TableRowProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
}

interface TableCellProps {
  children: ReactNode;
  className?: string;
}

export const Table: React.FC<TableProps> = ({
  headers,
  children,
  className = "",
}) => {
  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {headers.map((header, index) => (
              <th
                key={index}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">{children}</tbody>
      </table>
    </div>
  );
};

export const TableRow: React.FC<TableRowProps> = ({
  children,
  onClick,
  className = "",
}) => {
  return (
    <tr
      className={`hover:bg-gray-50 ${
        onClick ? "cursor-pointer" : ""
      } ${className}`}
      onClick={onClick}
    >
      {children}
    </tr>
  );
};

export const TableCell: React.FC<TableCellProps> = ({
  children,
  className = "",
}) => {
  return (
    <td
      className={`px-6 py-4 whitespace-nowrap text-sm text-gray-900 ${className}`}
    >
      {children}
    </td>
  );
};
