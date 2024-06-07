import { useState } from 'react';
import logoImage from '../images/logo.jpg';
import tempimg from '../images/temporaryimage.jpg';
import { NavLink, useLocation } from 'react-router-dom';
import styled from 'styled-components';

function Header() {

    const isMobile = window.innerWidth <= 768; 

    const Logoo = styled.div`
display: flex;

// @media (max-width: 768px) {
//   display: none;
// }
`;

    const location = useLocation();

    const cartItems = [
        {
            id: 1,
            title: 'Apple',
            imgSrc: tempimg,
            href: 'detail.html',
            removeLink: '#',
            editLink: '#',
            productLink: 'detail.html',
            quantity: 1,
            price: 'P 540.00'
        },
        {
            id: 2,
            title: 'Orange',
            imgSrc: tempimg,
            href: 'detail.html',
            removeLink: '#',
            editLink: '#',
            productLink: 'detail.html',
            quantity: 1,
            price: 'P 540.00'
        },
        {
            id: 3,
            title: 'Grapes',
            imgSrc: tempimg,
            href: 'detail.html',
            removeLink: '#',
            editLink: 'detail.html',
            productLink: '#',
            quantity: 1,
            price: 'P 540.00'
        }
    ];

    const [showMenu, setShowMenu] = useState(false);

  return (
    <>
       <div id="sns_wrapper">      
            
            <div id="sns_header" className="wrap">
       
                <div className="sns_header_top">
                    <div className="container">
                        <div className="sns_module">
                            
                            <div className="header-account">
                                <div className="myaccount">
                                   
                                    <div className="tongle">
                                        <i className="fa fa-user"></i>
                                        <span>My account </span>
                                        <i className="fa fa-angle-down"></i>
                                    </div>
                


                                    <div className="customer-ct content">

                                    <ul className="links">
  {localStorage.getItem('logged_username') ? (
    <>
      <li className="first">
        <a className="top-link-myaccount" title="My Account" href="#">My Account</a>
      </li>
      <li>
        <a className="top-link-checkout" title="Checkout" href="#">Checkout</a>
      </li>
      <li>
        <a className="top-link-logout" title="Logout" href="" onClick={() => { localStorage.removeItem('logged_username'); }}>Logout</a>
      </li>
    </>
  ) : (
    <>
      <li className="first" style={isMobile ? { display: 'none' } : { opacity: 0 }}>
        <a className="top-link-myaccount"></a>
      </li>
      <li style={isMobile ? { display: 'none' } : { opacity: 0 }}>
        <a className="top-link-checkout"></a>
      </li>
      <li style={isMobile ? { display: 'none' } : { opacity: 0 }}>
        <a className="top-link-logout"></a>
      </li>

      <li className="last">
        <a className="top-link-login" title="Log In" href="/login">Login</a>
      </li>
      <li>
        <a className="top-link-wishlist" title="Register" href="/register">Register</a>
      </li>
    </>
  )}
</ul>





                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="sns_header_logo">
                    
    <Logoo className="container">
        <div className="container_in">
            <div className="row" style={{ margin: "auto", display: "flex", justifyContent: "center", alignContent: "center" }}>
                <h1 id="logo" className="responsv col-md-3">
                
                    <img alt="" src={logoImage} />
             
                </h1>
            </div>
        </div>
    </Logoo>
</div>










<div id="sns_menu">
    <div className="container"  style={{ background: '#222222'}}>
        <div className="sns_mainmenu" >
            <div id="sns_mainnav" >
                <div id="sns_custommenu" className="visible-md visible-lg">
                <ul className="mainnav">
            <li className={`level0 custom-item`}>
                <NavLink 
                    className="menu-title-lv0 pd-menu116" 
                    to="/home"
                    exact
                >
                   <span className="title" style={{
    color: location.pathname === '/home' || location.pathname === '/' ? '#E14141' : 'grey',
    fontWeight: location.pathname === '/home' || location.pathname === '/' ? 'bold' : '500'
  }}>
  Home
</span>

                </NavLink>
            </li>
            <li className={`level0 custom-item `}>
                <NavLink 
                    className="menu-title-lv0" 
                    to="/about"
                >
                    <span className="title" style={{
    color: location.pathname === '/about' ? '#E14141' : 'grey',
    fontWeight: location.pathname === '/about' ? 'bold' : '500'
  }}>ABOUT US</span>
                </NavLink>
            </li>
            <li className={`level0 custom-item `}>
                <NavLink 
                    className="menu-title-lv0" 
                    to="/allProducts"
                >
                    <span className="title" style={{
    color: location.pathname === '/allProducts' ? '#E14141' : 'grey',
    fontWeight: location.pathname === '/allProducts' ? 'bold' : '500'
  }}>ALL PRODUCTS</span>
                </NavLink>
            </li>
            <li className={`level0 custom-item `}>
                <NavLink 
                    className="menu-title-lv0" 
                    to="/contact"
                >
                    <span className="title" style={{
    color: location.pathname === '/contact' ? '#E14141' : 'grey',
    fontWeight: location.pathname === '/contact' ? 'bold' : '500'
  }}> CONTACT US</span>
                </NavLink>
            </li>

            <li className={`level0 custom-item `}>
                <NavLink 
                    className="menu-title-lv0" 
                    to="/reviews"
                >
                    <span className="title" style={{
    color: location.pathname === '/reviews' ? '#E14141' : 'grey',
    fontWeight: location.pathname === '/reviews' ? 'bold' : '500'
  }}> Reviews</span>
                </NavLink>
            </li>
        </ul>
    


                </div>
                
                <div id="sns_mommenu" className="menu-offcanvas hidden-md hidden-lg">

    <span className="btn2 btn-navbar offcanvas" onClick={() => setShowMenu(!showMenu)}>
        <i className="fa fa-bars" style={{ color: "#666666" }}></i>
        <span className="overlay"></span>
    </span>


    {showMenu && (
    <div  className="offcanvas">
        <ul className="mainnav">
            <li className={`level0 custom-item ${location.pathname === '/home' || location.pathname === '/'  ? 'active' : ''}`}>
                <div className="accr_header">
                    <NavLink 
                        className="menu-title-lv0" 
                        to="/home" 
                        activeClassName="active" 
                        exact
                    >
                        <span className="title">Home</span>
                    </NavLink>
                </div>
            </li>
            <li className={`level0 nav-5 first ${location.pathname === '/about' ? 'active' : ''}`}>
                <div className="accr_header">
                    <NavLink 
                        className="menu-title-lv0" 
                        to="/about" 
                        activeClassName="active"
                    >
                        <span>About Us</span>
                    </NavLink>
                </div>
            </li>
            <li className={`level0 nav-6 parent ${location.pathname === '/allProducts' ? 'active' : ''}`}>
                <div className="accr_header">
                    <NavLink 
                        className="menu-title-lv0" 
                        to="/allProducts" 
                        activeClassName="active"
                    >
                        <span>All Products</span>
                    </NavLink>
                    <span className="btn_accor"></span>
                </div>
            </li>
            <li className={`level0 nav-7 ${location.pathname === '/contact' ? 'active' : ''}`}>
                <div className="accr_header">
                    <NavLink 
                        className="menu-title-lv0" 
                        to="/contact" 
                        activeClassName="active"
                    >
                        <span>Contact Us</span>
                    </NavLink>
                </div>
            </li>

            <li className={`level0 nav-7 ${location.pathname === '/reviews' ? 'active' : ''}`}>
                <div className="accr_header">
                    <NavLink 
                        className="menu-title-lv0" 
                        to="/reviews" 
                        activeClassName="active"
                    >
                        <span>Reviews</span>
                    </NavLink>
                </div>
            </li>
        </ul>


       
    </div>
      )}
</div>


            </div>
            <div className="sns_menu_right">
                <div className="block_topsearch">
                    <div className="top-cart">
                        <div className="mycart mini-cart">
                            <div className="block-minicart">
                                <div className="tongle">
                                    <i className="fa fa-shopping-cart"></i>
                                    <div className="summary">
                                        <span className="amount">
                                            <a href="#">
                                                <span>3</span>
                                                ( items )
                                            </a>
                                        </span>
                                    </div>
                                </div>
                                <div className="block-content content">
                                    <div className="block-inner">
                                    <ol id="cart-sidebar" className="mini-products-list">
            {cartItems.map((item) => (
                <li key={item.id} className="item odd">
                    <a className="product-image" title={item.title} href={item.href}>
                        <img alt={item.title} src={item.imgSrc} />
                    </a>
                    <div className="product-details">
                        <a 
                            className="btn-remove" 
                            onClick={() => window.confirm('Are you sure you would like to remove this item from the shopping cart?')} 
                            title="Remove This Item" 
                            href={item.removeLink}
                        >
                            Remove This Item
                        </a>
                        <a className="btn-edit" title="Edit item" href={item.editLink}>Edit item</a>
                        <p className="product-name">
                            <a href={item.productLink}>{item.title}</a>
                        </p>
                        <strong>Quantity: {item.quantity}</strong>
                        <br/>
                        <br/>
                        <span className="price">{item.price}</span>
                    </div>
                </li>
            ))}
        </ol>
                                        <p className="cart-subtotal">
                                            <span className="label">Total:</span>
                                            <span className="price"  style={{color: "#E34444"}}>P 540.00</span>
                                        </p>
                                        <div className="actions">
                                            <a className="button">
                                                <span>
                                                    <span>Check out</span>
                                                </span>
                                            </a>
                                            <a className="button gfont go-to-cart" href="shoppingcart.html">Go to cart</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            
        </div>
    </div>
</div>











                </div>
                </div>
    </>
  )
}

export default Header
