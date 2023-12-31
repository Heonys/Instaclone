type Props = {
  text: string;
  onClick: () => void;
  size?: "sm" | "lg";
};

const ColorButton = ({ text, onClick, size = "sm" }: Props) => {
  return (
    <div
      className={`rounded-md bg-gradient-to-bl from-fuchsia-600 via-rose-500 to-amber-300 
    ${size === "lg" ? "p-[0.4rem]" : "p-[0.15rem]"} `}
    >
      <button
        className={`bg-white rounded-sm text-base hover:opacity-90 transition-opacity
        ${size === "lg" ? "p-4 text-2xl" : "p-[0.3rem] text-base"} `}
        onClick={onClick}
      >
        {text}
      </button>
    </div>
  );
};

export default ColorButton;
