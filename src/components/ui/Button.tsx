type Props = {
  text: string;
  onClick: () => void;
  red?: boolean;
  disabled?: boolean;
};
export default function Button({ disabled = false, text, onClick, red }: Props) {
  return (
    <button
      disabled={disabled}
      onClick={() => onClick()}
      className={`border-none py-2 rounded-md px-8 text-white font-bold leading-4 ${
        red ? "bg-red-500" : "bg-sky-500"
      } ${disabled && "opacity-80"}`}
    >
      {text}
    </button>
  );
}
