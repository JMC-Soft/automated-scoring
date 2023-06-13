import React from "react";
// import BACKGROUND_COLOR_MAP from "@/lib/const/style";
const BACKGROUND_COLOR_MAP = {
  green: "bg-green-600",
  gray: "bg-gray-500",
};
interface Props {
  title: string;
  color: "green" | "gray";
  type?: "button" | "submit" | "reset";
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const BUTTON_STYLE =
  "translate-y-10 rounded-xl border-black px-7 py-2 text-xl text-white";

function Button({ type = "button", onClick = () => {}, title, color }: Props) {
  return (
    <button
      type={type}
      className={`${BUTTON_STYLE} ${BACKGROUND_COLOR_MAP[color]}`}
      onClick={onClick}
    >
      {title}
    </button>
  );
}

export default Button;
export { BUTTON_STYLE };
