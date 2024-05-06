import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Feed from "./pages/Feed";
import Protected from "./pages/Protected";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<Login />} />
        <Route  element={<Protected/>}>
          <Route path={"/feed"} element={<Feed />} />
          <Route path={"/profil"} element={<h1>Profil</h1>} />
          <Route path={"/mesaj"} element={<h1>Mesaj</h1>} />
          <Route path={"/mail"} element={<h1>Mail</h1>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
