import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import ShoppingCart from "./ShoppingCart";
import "./Navigation.css";

function Navigation() {
  const currentUser = useSelector(state => state.session.user)

  const ishidden = () => {
    if(!currentUser) return true;
    return false;
  }

  return (
    <div className="header">
        
        <NavLink to="/">
          <div style={{color: 'rgb(62, 188, 142)', fontSize: "25px"}}>
            <i className="fa-brands fa-pagelines">The Seed</i>
          </div>
        </NavLink>

        <div className="nav-collections-container">
          <span>Small</span>
          <span>Medium</span>
          <span>Large</span>
          <span>Blooms</span>
          <span>Gifts</span>
        </div>
          
        <div className="github-and-profilebutton-container">
          {/* <div className="github-link-container"> */}
            {/* <i className="fa-brands fa-github" style={{ color: 'rgb(83, 83, 83)', fontSize: "25px" }}></i> */}
            {/* <a rel='noreferrer' href="https://github.com/elainefan331" className="github-link" target="_blank">Elaine Fan</a> */}
          {/* </div> */}
          <ProfileButton />
          {ishidden()? null : <ShoppingCart />}
          
          
         
        </div>
      
    </div>
  );
}

export default Navigation;
