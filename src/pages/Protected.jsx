import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { Navigate, Outlet} from "react-router-dom";
import { auth } from "../firebase/config";

const Protected = () => {
  const [isAuth, setIsAuth] = useState();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log(user, "user");
      {
        setIsAuth(user ? true : false);
        //rolü farklı olanlar sayfaya girebilsin ya da girmesin koşulu;
        //  setIsAuth(user === 'admin' ? true : false);
      }
    });
  }, []);
  if (isAuth === false) {
    return <Navigate to={'/'}/>;
  }
  return  <Outlet />;
  
  
};

export default Protected;
