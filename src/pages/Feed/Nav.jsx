import { navSections } from "../../utils/constants";
import { auth } from "../../firebase/config";
import { BiDoorOpen } from "react-icons/bi";

import { signOut } from "firebase/auth";

const Nav = ({ user}) => {
  console.log(navSections, "sec");

  const handleLogout =()=>{
 signOut(auth);
  }
  return (
    <nav className="flex flex-col justify-between items-end  ">
      <div>
        <img className="w-14 mb-4" src="./x-logo.webp" />
        {navSections.map((i, key) => (
          <div
            key={key}
            className="flex items-center text-2xl gap-3 md:text-xl p-3 cursor-pointer rounded-lg transition hover:bg-[#505050b7] max-md:justify-center"
          >
            {i.icon}
            <span className="max-md:hidden whitespace-nowrap">{i.title}</span>
          </div>
        ))}
      </div>
      <div className="">
        {!user ? (
          <div className="w-12 h-12 bg-gray-400 rounded-full animate-bounce" />
        ) : (
          <div className="flex flex-col gap-5 p-2 m-2">
            <div>
              <img
                className="w-12 h-12 rounded-full animate-bounce max-md:w-8 max-md:h-8 "
                src={user.photoURL}
              />
              <p className="max-md:hidden">{user.displayName}</p>
            </div>
          </div>
        )}
        <button onClick={handleLogout} className="flex rounded-full p-2 m-2 justify-center items-center gap-2 bg-zinc-700 md:text-[15px] text-2xl transition hover:bg-zinc-90 ">
          <BiDoorOpen className="text-2xl"/>
          <span className="max-md:hidden">Çıkış</span>
        </button>
      </div>
    </nav>
  );
};

export default Nav;
