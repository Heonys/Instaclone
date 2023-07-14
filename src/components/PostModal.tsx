import { CloseIcon } from "./ui/icons";

type Props = {
  children: React.ReactNode;
  onClose: () => void;
};

const PostModal = ({ children, onClose }: Props) => {
  return (
    <section
      className="fixed top-0 left-0 flex justify-center items-center w-full h-full z-50 bg-neutral-900/70"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <button onClick={() => onClose()} className="fixed top-0 right-0 p-8 text-white">
        <CloseIcon />
      </button>
      <div className="bg-white w-4/5 h-4/5 max-h-7xl">{children}</div>
    </section>
  );
};

export default PostModal;
