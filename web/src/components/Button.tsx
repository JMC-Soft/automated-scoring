import React from "react";
import clsx from "clsx";

interface Props {
  title: string;
  color: "green" | "gray";
  type?: "button" | "submit" | "reset";
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

function Button({ type = "button", onClick = () => {}, title, color }: Props) {
  return (
    <button
      type={type}
      className={clsx(
        `btn`,
        { "bg-green-600": color === "green" },
        { "bg-gray-500": color === "gray" }
      )}
      onClick={onClick}
    >
      {title}
    </button>
  );
}

export default Button;
