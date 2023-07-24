type Props = {
  toggled: boolean;
  onToggle: (toggled: boolean) => void;
  onIcon: React.ReactNode;
  ofIcon: React.ReactNode;
};
export default function ToggleButton({ toggled, onToggle, onIcon, ofIcon }: Props) {
  return <button onClick={() => onToggle(!toggled)}>{toggled ? onIcon : ofIcon}</button>;
}
