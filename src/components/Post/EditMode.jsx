import { doc, updateDoc } from "firebase/firestore";
import { FaRegSave } from "react-icons/fa";
import { MdOutlineCancelPresentation } from "react-icons/md";
import { db } from "../../firebase/config";
import { BsTrashFill } from "react-icons/bs";
import { BsArrow90DegLeft } from "react-icons/bs";
import { useState } from "react";

const EditMode = ({ tweet, close }) => {

    const [isPicDeleting,setIsPicDeleting]=useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const tweetRef = doc(db, "tweets", tweet.id);
    const newTitle = e.target[0].value;
    if(isPicDeleting){
        await updateDoc(tweetRef, {
            textContent: newTitle,
            imageContent:null,
            isEdited: true,
          });
    }else{
        await updateDoc(tweetRef, {
            textContent: newTitle,
            isEdited: true,
          });
    }
   close();
  };
  return (
    <form className="my-4" onSubmit={handleSubmit}>
      <input
        defaultValue={tweet.textContent}
        className="rounded p-1 px-2 text-black"
        type="text"
      />
      <button
        type="submit"
        
        className="mx-5 p-2 borer border-zinc-500 text-green-400 rounded-lg shadow hover:bg-zinc-700"
      >
        <FaRegSave />
      </button>
      <button
        type="button"
        className="mx-5 p-2 borer border-zinc-500 text-red-400 rounded-lg shadow hover:bg-zinc-700"
        onClick={close}
      >
        <MdOutlineCancelPresentation />
      </button>

      {tweet.imageContent && (
        <div className="relative" >
          <img
            className={`${isPicDeleting ? 'blur' : ''} my-2 rounded-lg object-cover max-h-[400px] w-full`}
            src={tweet.imageContent}
          />
          <button type="button" onClick={()=>setIsPicDeleting(!isPicDeleting)} className="absolute top-0 right-0 text-xl p-2 bg-white transition text-red-600 hover:scale-90 rounded-full">{isPicDeleting ? <BsArrow90DegLeft /> : <BsTrashFill/> }</button>
        </div>


      )}
    </form>
  );
};

export default EditMode;


