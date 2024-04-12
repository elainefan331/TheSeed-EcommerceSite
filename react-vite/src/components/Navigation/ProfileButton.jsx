import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { FaUserCircle } from 'react-icons/fa';
import { thunkLogout } from "../../redux/session";
import OpenModalMenuItem from "./OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { useNavigate } from "react-router-dom";
import { useShoppingCart } from "../../context/ShoppingCartContext";//add

function ProfileButton() {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const user = useSelector((store) => store.session.user);
  const ulRef = useRef();
  const navigate = useNavigate();
  const { setCartItems } = useShoppingCart();//add
 
  const toggleMenu = (e) => {
    e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
    setShowMenu(!showMenu);
  };
  
 
  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    setCartItems([])
    dispatch(thunkLogout());
    closeMenu();
    navigate('/');
  };

  const manageProducts = (e) => {
    e.preventDefault();
    closeMenu();
    navigate('/products/current')
  }

  const orderHistoryClick = (e) => {
    e.preventDefault();
    closeMenu();
    navigate('/orders')
  }

  return (
    <>
      <button onClick={toggleMenu} className='user-button'>
        {/* <FaUserCircle /> */}
        <div className='user-icon-container' style={{color: 'rgb(62, 188, 142)', fontSize: "25px"}}>
          <i className="fa-solid fa-user"></i>
        </div>
      </button>
      
      {showMenu ? (
        <ul className={"profile-dropdown profile-dropdown-visible"} ref={ulRef}>
          {user ? (
            <>
              <div className="profileButton-x-container">
                <i className="fa-regular fa-user"></i>
                <i onClick={closeMenu} className="fa-solid fa-xmark"></i>
              </div>
              <p>Hi, {user.username}</p>
              {/* <p>{user.email}</p> */}
              <p className="manage-product-p" onClick={manageProducts}>Manage Products</p>
              <p className="order-history-p" onClick={orderHistoryClick}>Order History</p>
              <p>
                <button className="log-out-button" onClick={logout}>Log Out</button>
              </p>
            </>
          ) : (
            <>
              <OpenModalMenuItem
                itemText="Log In"
                onItemClick={closeMenu}
                modalComponent={<LoginFormModal />}
              />
              <OpenModalMenuItem
                itemText="Sign Up"
                onItemClick={closeMenu}
                modalComponent={<SignupFormModal />}
              />
            </>
          )}
        </ul>
      ): (
        <ul className={"profile-dropdown profile-dropdown-hidden"} ref={ulRef}>
          {user ? (
            <>
              <div className="profileButton-x-container">
                <i className="fa-regular fa-user"></i>
                <i onClick={closeMenu} className="fa-solid fa-xmark"></i>
              </div>
              <p>Hi, {user.username}</p>
              {/* <p>{user.email}</p> */}
              <p className="manage-product-p" onClick={manageProducts}>Manage Products</p>
              <p className="order-history-p" onClick={orderHistoryClick}>Order History</p>
              <p>
                <button className="log-out-button" onClick={logout}>Log Out</button>
              </p>
            </>
          ) : (
            <>
              <OpenModalMenuItem
                itemText="Log In"
                onItemClick={closeMenu}
                modalComponent={<LoginFormModal />}
              />
              <OpenModalMenuItem
                itemText="Sign Up"
                onItemClick={closeMenu}
                modalComponent={<SignupFormModal />}
              />
            </>
          )}
        </ul>)}
    </>
  );
}

export default ProfileButton;
