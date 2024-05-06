import { FaRegComment } from "react-icons/fa6";
import { FiRefreshCw } from "react-icons/fi";
import { CiHeart } from "react-icons/ci";
import { FcLike } from "react-icons/fc";
import { BsShare } from "react-icons/bs";
import { useState } from "react";
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { auth, db } from "../../firebase/config";

const Buttons = ({ tweet }) => {
  const isLiked = tweet.likes.includes(auth.currentUser.uid);
console.log(isLiked,'isliked')
  const handleLike = async () => {
    const tweetRef = doc(db, "tweets", tweet.id);

    // Atomically add a new region to the "regions" array field.
    await updateDoc(tweetRef, {
      likes: isLiked
        ? arrayRemove(auth.currentUser.uid)
        : arrayUnion(auth.currentUser.uid),
    });

   };

  const openWhatsapp = () => {
    const whatsappLink = "https://api.whatsapp.com/send?phone=90555xxxxxxx";

    // WhatsApp'ı yeni bir pencerede aç
    window.open(whatsappLink, "_blank");
  };
  const [likes, setLikes] = useState(0);
  console.log(tweet.likes.length, "tweet");
  console.log(likes);

  return (
    <>
      <div
        className="flex
     justify-between mt-5 items-center"
      >
        <div className="hover:bg-[#00c8ff63] p-2 rounded-full cursor-pointer">
          <FaRegComment />
        </div>

        <div className="hover:bg-[#dd65a163] p-2 rounded-full cursor-pointer">
          <FiRefreshCw />
        </div>

        <div onClick={handleLike} className="flex items-center gap-2  hover:bg-[#df6a8363] p-2 rounded-full cursor-pointer">
         {isLiked ? <FcLike /> : <CiHeart /> }
          {tweet.likes.length}
        </div>

        <div className="hover:bg-[#6d727463] p-2 rounded-full cursor-pointer">
          <BsShare onClick={openWhatsapp} />
        </div>
      </div>
    </>
  );
};

export default Buttons;
