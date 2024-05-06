import { MdModeEditOutline } from "react-icons/md";

import { FcFullTrash } from "react-icons/fc";
import { doc, deleteDoc, arrayRemove, arrayUnion } from "firebase/firestore";
import { db } from "../firebase/config";
import { toast } from "react-toastify";
import { useState } from "react";

const Modal = ({ tweet,isEditMode,setIsEditMode}) => {

  console.log(tweet, "db");
  const tweetRef = doc(db, "tweets", tweet.id);

  const updateTweet = async () => {
   setIsEditMode(true);
    const newTitle = e.target[0].value;
    // Atomically add a new region to the "regions" array field.
    await updateDoc(tweetRef, {
      textContent: newTitle,
      isEdited: true,
    });
   
  };

  const deleteTweet = async () => {
    deleteDoc(tweetRef)
      .then(() => {
        toast.warn("Tweet Akıştan kaldırıldı.");
      })
      .catch((err) => {
        console.log(err);
        toast.danger("Tweet silinirken sorun oluştu");
      });
  };

  return (
    <div className="border absolute top-2 right-10 border-slate-600 p-2 bg-white text-black rounded-xl flex flex-col justify-center items-center">
      <h5 className="font-semibold">Aksiyonlar</h5>
      <div className="flex flex-col">
        <button
          onClick={updateTweet}
          className="flex items-center gap-2 hover:bg-slate-300 rounded-xl p-1"
        >
          <MdModeEditOutline />
          <span>Düzenle</span>
        </button>
        <button
          onClick={deleteTweet}
          className="flex items-center gap-2  hover:bg-slate-300 rounded-xl p-1"
        >
          <FcFullTrash />
          <span>Sil</span>
        </button>
        {/* {tweet.imageContent && <div className="relative"><img className="my-2 w-full rounded-lg object-covermax-h-[400px]" src={tweet.imageContent}/></div>} */}
      </div>
    </div>
  );
};

export default Modal;
