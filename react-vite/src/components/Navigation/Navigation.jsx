import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation() {
  return (
    <div className="header">
        
        <NavLink to="/">
          <div style={{color: 'rgb(62, 188, 142)', fontSize: "25px"}}>
            <i className="fa-brands fa-pagelines">The Seed</i>
          </div>
        </NavLink>
          
        <div className="github-and-profilebutton-container">
          {/* <div className="github-link-container"> */}
            {/* <i className="fa-brands fa-github" style={{ color: 'rgb(83, 83, 83)', fontSize: "25px" }}></i> */}
            {/* <a rel='noreferrer' href="https://github.com/elainefan331" className="github-link" target="_blank">Elaine Fan</a> */}
          {/* </div> */}
          <ProfileButton />
        </div>
      
    </div>
  );
}

export default Navigation;
