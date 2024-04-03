import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function ShoppingCart() {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const user = useSelector((store) => store.session.user);
    const ulRef = useRef();
    const navigate = useNavigate();

    
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



    return (
        <div
            onMouseLeave={closeMenu}
        >
        <button 
            // onClick={toggleMenu} 
            onMouseEnter={toggleMenu}
            className='shopping-cart-button'
        >
            <div>
                <i className="fa-solid fa-cart-shopping" style={{color: 'rgb(62, 188, 142)', fontSize: "25px"}}></i>
            </div>
        </button>
      
        {showMenu && (
            <ul className={"shopping-cart-dropdown"} ref={ulRef}>
                <h1>inside the cart</h1>
            </ul>
        )}
        </div>
    )
}

export default ShoppingCart;