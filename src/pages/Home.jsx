import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth} from "../firebase/config";
import { toast } from "react-toastify";
const Home = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        toast.info("Hesaptan çıkış yapıldı.");
      })
      .catch((err) => toast.error("Bir hata oluştu." + err.code));
    navigate("/");
  };
  return (
    <div className="text-center">
      <h1>ana akış sayfası</h1>
      <button onClick={handleLogout} className="text-center">
        Çıkış Yap
      </button>
    </div>
  );
};

export default Home;
