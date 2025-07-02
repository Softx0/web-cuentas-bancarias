import React, {ReactNode} from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  padding?: "sm" | "md" | "lg";
  shadow?: "sm" | "md" | "lg";
  onClick?: () => void;
  hoverable?: boolean;
}

export const Card: React.FC<CardProps> = ({children, className = "", padding = "md", shadow = "md", onClick, hoverable = false}) => {
  const paddingClasses = {
    sm: "p-3",
    md: "p-4",
    lg: "p-6"
  };

  const shadowClasses = {
    sm: "shadow-sm",
    md: "shadow-md",
    lg: "shadow-lg"
  };

  const baseClasses = `bg-white rounded-lg border border-gray-200 ${paddingClasses[padding]} ${shadowClasses[shadow]}`;
  const hoverClasses = hoverable ? "hover:shadow-lg transition-shadow duration-200 cursor-pointer" : "";

  return (
    <div className={`${baseClasses} ${hoverClasses} ${className}`} onClick={onClick}>
      {children}
    </div>
  );
};
