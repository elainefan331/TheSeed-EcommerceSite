import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ModalProvider, Modal } from "../context/Modal";
import { thunkAuthenticate } from "../redux/session";
import Navigation from "../components/Navigation/Navigation";

export default function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(thunkAuthenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <ModalProvider>
        <Navigation />
        {isLoaded && <Outlet />}
        <footer className="footer">
          {/* <p>This website is for study purposes</p> */}
          <div>
            <span>This website is for study purposes.  Contact </span>
            <i className="fa-brands fa-github" style={{ color: 'rgb(83, 83, 83)', fontSize: "25px" }}></i>
            <a rel='noreferrer' href="https://github.com/elainefan331" className="github-link" target="_blank">Elaine Fan</a>
          </div>
        </footer>
        <Modal />
      </ModalProvider>
    </>
  );
}
