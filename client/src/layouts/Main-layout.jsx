import { Outlet, useNavigate } from "react-router-dom";
import SideBar from "../componetns/SideBar";
import { useEffect, useState } from "react";
import { checkAuth } from "../async/async.js";

const MainLayout = () => {
  console.log();

  let token = document.cookie
    ? document.cookie.split("=")[1].split(" ")[0]
    : " ";
  const navigate = useNavigate();
  const [isAuth, setIsAuth] = useState();
  useEffect(() => {
    checkAuth(token, (data) => {
      setIsAuth(data.isAuth);
    });
  }, []);
  !isAuth && navigate("/");

  return (
    <div className="layout">
      <div className="container">
        <SideBar />
        <div className="main">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
