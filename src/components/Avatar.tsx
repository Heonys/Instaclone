import React from "react";
import classNames from "classnames";

type Props = {
  image?: string | null;
  highlight?: boolean;
  size?: "sm" | "md";
};

const Avatar = ({ image, highlight = false, size = "md" }: Props) => {
  const avatarStyle = classNames({
    "w-9 h-9": size === "sm",
    "w-[68px] h-[68px]": size === "md",
    "rounded-full flex items-center justify-center": true,
    "bg-gradient-to-bl from-fuchsia-600 via-rose-500 to-amber-300": highlight,
  });

  const imageSizeStyle = classNames({
    "rounded-full bg-white ": true,
    "w-[34px] h-[34px] p-[0.1rem] ": size === "sm",
    "w-16 h-16 p-[0.2rem] ": size === "md",
  });

  return (
    <div className={avatarStyle}>
      {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
      <img src={image ?? undefined} className={imageSizeStyle} referrerPolicy="no-referrer" />
    </div>
  );
};

export default Avatar;
