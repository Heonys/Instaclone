import React from "react";

type Props = {
  image?: string | null;
};

const Avatar = ({ image }: Props) => {
  return (
    <div className="w-9 h-9 rounded-full bg-gradient-to-bl from-fuchsia-600 via-rose-500 to-amber-300">
      {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
      <img src={image ?? undefined} className="rounded-full p-[0.1rem]" referrerPolicy="no-referrer" />
    </div>
  );
};

export default Avatar;
