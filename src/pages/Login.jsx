import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithPopup,
} from "firebase/auth";
import { auth, provider } from "../firebase/config";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignUp) {
      createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
          toast.success("Hesabınız oluşturuldu.");
          navigate("/feed");
        })
        .catch((err) => toast.error("Bir hata oluştu." + err.code));
    } else {
      signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          toast.success(`Tekrar Hoşgeldin`);
          navigate("/feed");
        })
        .catch((err) => {
          toast.error("Bir hata oluştu." + err.code);
          if (err.code === "auth/invalid-credential") {
            setIsError(true);
          }
        });
    }
  };
  const handleReset = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        toast.info("Sıfırlama Epostası emailinize iletildi.");
      })
      .catch((err) => toast.error("Bir hata oluştu." + err.code));
  };

  const handleGoogle = () => {
    signInWithPopup(auth, provider)
      .then(() => {
        toast.success("Google hesabınız ile giriş yapıldı.");
        navigate('/feed');
      })
      .catch((err) => toast.error("Bir hata oluştu." + err.code));
  };
  return (
    <section className="h-screen grid place-items-center">
      <div className="bg-black flex flex-col gap-10 py-16 px-32 ">
        <div className="flex justify-center">
          <img className="h-[80px] "src="/x-logo.webp" alt="" />
        </div>
        <h1 className="text-lg font-bold text-center">Twitter'a Giriş Yap</h1>
        <button
          onClick={handleGoogle}
          className="bg-white flex items-center py-2 px-10 rounded-full transition gap-3 text-black whitespace-nowrap hover:bg-gray-300"
        >
          <img className="h-[20px]" src="/google-logo.svg" alt="" />
          Google ile Giriş Yap
        </button>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <label>Email</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            className="text-black rounded mt-1 p-2 outline-none shadow-lg focus:shadow-[gray]"
            type="text"
          />
          <label className="mt-5">Şifre</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            className="text-black rounded mt-1 p-2 outline-none shadow-lg focus:shadow-[gray]"
            type="password"
          />
          <button className="mt-10 bg-white text-black rounded-full transition p-1 font-bold hover:bg-gray-300">
            {isSignUp ? "Kayıt Ol" : "Giriş Yap"}
          </button>
          <p onClick={() => setIsSignUp(!isSignUp)} className="mt-5">
            <span className="text-gray-500">
              {isSignUp ? "Hesabınız varsa" : "Hesabınız yoksa"}{" "}
            </span>
            <span className="ms-2 text-blue-500 cursor-pointer">
              {isSignUp ? "Giriş Yapın" : "Kaydolun"}
            </span>
          </p>
        </form>
        {isError && (
          <p
            onClick={handleReset}
            className="text-red-500 text-center cursor-pointer"
          >
            Şifrenizi mi unuttunuz?
          </p>
        )}
      </div>
    </section>
  );
};

export default Login;
