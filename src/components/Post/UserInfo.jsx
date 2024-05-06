import moment from "moment";
import { useState } from "react";

import { auth } from "../../firebase/config";
const UserInfo = ({ tweet }) => {
  const [openModal, setOpenModal] = useState(false);
  const date = moment(tweet.createdAt?.toDate()).fromNow();
  console.log(openModal, "openModal");
  return (
    <div className="flex justify-between items-center ">
      <div>
        <div className="flex gap-3 items-center whitespace-nowrap ">
          <div className="flex gap-5 items-center ">
            <p>{tweet.user.name}</p>
            <p className="text-gray-400 text-sm">
              @{tweet?.user?.name?.toLowerCase().split(" ").join("_")}
            </p>
            <p className="text-gray-400 text-sm ">{date}</p>

            {tweet.isEdited && (
              <p className="text-gray-400 text-sm">*düzenlendi.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
