type Props = {
  toggled: boolean;
  onToggle: (toggled: boolean) => void;
  onIcon: React.ReactNode;
  ofIcon: React.ReactNode;
  title: string;
};
export default function ToggleButton({ toggled, onToggle, onIcon, ofIcon, title }: Props) {
  return (
    <button aria-label={title} onClick={() => onToggle(!toggled)}>
      {toggled ? onIcon : ofIcon}
    </button>
  );
}
