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
      

      
        <ProfileButton />
      
    </div>
  );
}

export default Navigation;
