import UserInfo from "./UserInfo";
import Content from "./Content";
import Buttons from "./Buttons";
import { MdOutlineMenu } from "react-icons/md";
import Modal from "../Modal";
import { useState } from "react";
import { auth } from "../../firebase/config";
import EditMode from "./EditMode";
import { IoCloseSharp } from "react-icons/io5";

const Post = ({ tweet }) => {
  const [openModal, setOpenModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [menuIcon, setMenuIcon] = useState(<MdOutlineMenu />);

  const handleMenuClick = () => {
    setOpenModal(!openModal);
    if (openModal) {
      setMenuIcon(<MdOutlineMenu />);
    } else {
      setMenuIcon(<IoCloseSharp />);
    }
  };

  return (
    <div className="flex gap-3 border-b py-6 px-3 border-zinc-600 relative">
      <img
        className="w-12 h-12 rounded-full"
        src={tweet.user.photo}
        alt={tweet.user.name}
      />

      <div className="w-full">
        <div className=" flex justify-between items-center">
          <UserInfo tweet={tweet} />
          <div className="">
            {tweet.user.id === auth.currentUser.uid && (
              <div
                className="cursor-pointer"
                onClick={handleMenuClick}
              >
                {menuIcon}
              </div>
            )}
          </div>
        </div>
        {isEditMode ? (
          <EditMode tweet={tweet} close={() => setIsEditMode(false)} />
        ) : (
          <Content tweet={tweet} />
        )}
        <Buttons tweet={tweet} />
      </div>
      <div> {openModal && <Modal tweet={tweet} isEditMode={isEditMode} setIsEditMode={setIsEditMode} />} </div>
    </div>
  );
};

export default Post;
