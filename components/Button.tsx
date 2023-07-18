import Image from "next/image";
import React, { MouseEventHandler } from "react";

type Props = {
  title: string;
  leftIcon?: string | null;
  rightIcon?: string | null;
  handleClick?: MouseEventHandler;
  isSubmitting?: boolean;
  type?: "button" | "submit";
  bgColor?: string;
  textColor?: string;
};
function Button({
  title,
  leftIcon,
  rightIcon,
  handleClick,
  isSubmitting,
  type,
  bgColor,
  textColor,
}: Props) {
  return (
    <button
      type={type || "button"}
      disabled={isSubmitting}
      className={`flexCenter gap-3 px-4 py-3
      ${textColor || "text-white"}
      ${
        isSubmitting ? "bg-black/50" : bgColor || "bg-primary-purple"
      } rounded-xl text-sm font-medium max-md:w-full
      `}
      onClick={handleClick}
    >
      {leftIcon && <Image src={leftIcon} width={14} height={14} alt="Icon" />}
      {title}
      {rightIcon && <Image src={rightIcon} width={14} height={14} alt="Icon" />}
    </button>
  );
}

export default Button;
