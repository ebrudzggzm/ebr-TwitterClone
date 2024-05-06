import Nav from "./Nav";
import Aside from "./Aside";
import Main from "./Main";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/config";

const index = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user_data) => {
      setUser(user_data);
    });
    return () => unsub();
  }, []);
  return (
    <div className="feed h-screen bg-black overflow-hidden">
      <Nav user={user} setUser={setUser} />
      <Main user={user} />
      <Aside />
    </div>
  );
};

export default index;
