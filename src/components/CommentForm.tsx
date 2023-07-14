import { SmileIcon } from "@/components/ui/icons";

const CommentForm = () => {
  return (
    <form className="flex items-center border-t border-neutral-300 px-3">
      <SmileIcon />
      <input className="w-full border-none ml-2 p-3 outline-none" type="text" placeholder="Add a comment ... " />
      <button className="font-bold text-sky-500 ml-2">Post</button>
    </form>
  );
};

export default CommentForm;
