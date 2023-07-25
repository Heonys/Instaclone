import { SmileIcon } from "@/components/ui/icons";
import { FormEvent, useState } from "react";

type Props = {
  onPostComent: (comment: string) => void;
};

const CommentForm = ({ onPostComent }: Props) => {
  const [comment, setComment] = useState("");
  const buttonDisabled = comment.length === 0;

  const onSubmit = async (evet: FormEvent) => {
    evet.preventDefault();
    onPostComent(comment);
    setComment("");
  };

  return (
    <form onSubmit={onSubmit} className="flex items-center border-t border-neutral-300 px-3">
      <SmileIcon />
      <input
        className="w-full border-none ml-2 p-3 outline-none"
        type="text"
        placeholder="Add a comment ... "
        required
        value={comment}
        onChange={({ target }) => setComment(target.value)}
      />
      <button
        disabled={buttonDisabled}
        className={`font-bold ml-2 ${buttonDisabled ? "text-sky-300" : "text-sky-500"} `}
      >
        Post
      </button>
    </form>
  );
};

export default CommentForm;
