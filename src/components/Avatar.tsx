import React from "react";
import classNames from "classnames";

type Props = {
  image?: string | null;
  highlight?: boolean;
  size?: "sm" | "md" | "lg" | "xl";
};

const Avatar = ({ image, highlight = false, size = "lg" }: Props) => {
  const avatarStyle = classNames({
    "w-9 h-9": size === "sm",
    "w-11 h-11": size === "md",
    "w-[68px] h-[68px]": size === "lg",
    "w-[142px] h-[142px]": size === "xl",
    "rounded-full flex items-center justify-center": true,
    "bg-gradient-to-bl from-fuchsia-600 via-rose-500 to-amber-300": highlight,
  });

  const imageSizeStyle = classNames({
    "rounded-full bg-white object-cover ": true,
    "w-[34px] h-[34px] p-[0.1rem] ": size === "sm",
    "w-[42px] h-[42px] p-[0.1rem] ": size === "md",
    "w-16 h-16 p-[0.2rem] ": size === "lg",
    "w-[138px] h-[138px] p-[0.3rem]": size === "xl",
  });

  return (
    <div className={avatarStyle}>
      {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
      <img src={image ?? undefined} className={imageSizeStyle} referrerPolicy="no-referrer" />
    </div>
  );
};

export default Avatar;
