
function Footer() {
  return (
    <>
       <div id="sns_footer" className="footer_style vesion2 wrap">
                <div id="sns_footer_top" className="footer">
                    <div className="container">
                        <div className="container_in">
                            <div className="row">
                                <div className="col-md-3 col-sm-12 col-xs-12 column0">
                                    <div className="contact_us">
                                        <h6>Contact us</h6>
                                        <ul className="fa-ul">
                                            <li className="pd-right">
                                                <i className="fa-li fa fw fa-home"> </i>
                                                C.M. Recto Ave., Lapasan, Cagayan de Oro, Philippines
                                            </li>
                                            <li>
                                                <i className="fa-li fa fw fa-phone"> </i>
                                                <p>(12) 3 456 7890</p>
                                                <p>(12) 3 456 7890</p>
                                            </li>
                                            <li>
                                                <i className="fa-li fa fw fa-envelope"> </i>
                                                <p>
                                                    <a href="mailto:contact@grabngo.com">contact@grabngo.com</a>
                                                </p>
                                                <p>
                                                    <a href="mailto:contact@grabngo.com">contact@grabngo.com</a>
                                                </p>
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="col-phone-12 col-xs-6 col-sm-3 col-md-2 column column1">
                                    <h6>About Us</h6>
                                    <ul>
                                        
                                        <li>
                                            We are a student team dedicated to creating a simple and efficient solution for managing grocery inventories, helping small stores streamline processes, reduce waste, and keep shelves stocked.
                                        </li>
                                       
                                    </ul>
                                </div>
                                <div className="col-phone-12 col-xs-6 col-sm-3 col-md-2 column column2">
                                     <h6>Our Team</h6>
                                     <ul>
        <li>Bryan Galamgam</li>
        <li>Kathlyn Bajuyo Bajenio</li>
        <li>Rehana Nicole Ruilan</li>
        <li>Dou Issa Steffi Udasco</li>
        <li>Khen Joshua</li>
        <li>Kim Cuarteros</li>
    </ul>
                                </div>
                                <div className="col-phone-12 col-xs-6 col-sm-3 col-md-2 column column3">
                                    <h6>Account</h6>
                                    <ul>

                                    {localStorage.getItem('logged_username') ? 
                                        <>
                                        <li>
                                            <a href="#">My account</a>
                                        </li>
                                        
                                        <li>
                                            <a href="#">Checkout</a>
                                        </li>
                                        </>
                                        : 
                                        <>
                                        <li>
                                            <a href="/login">Login</a>
                                        </li>
                                        <li>
                                            <a href="/register">Register</a>
                                        </li>
                                        </>}
                                      
                                    </ul>
                                </div>
                                
                                <div className="col-phone-12 col-xs-6 col-sm-3 col-md-2 column column2">
                                     <h6>Navigations</h6>
                                     <ul>
    <li><a href="/home">Home</a></li>
    <li><a href="/about">About Us</a></li>
    <li><a href="/allProducts">All Products</a></li>
    <li><a href="/contact">Contact Us</a></li>
    <li><a href="/reviews">Reviews</a></li>
</ul>

                                </div>
                              
                            </div>
                        </div>
                    </div>
                </div>

                <div id="sns_footer_bottom" className="footer" style={{ color: 'white', margin: "auto", height:'40px', textAlign: 'center', width: '100%', background: '#222222'}}>
                    <div className="container" >
                        <div className="row">
                                    © 2024 Grab &apos;n Go. All Rights Reserved by Dev Alliance
                               
                            
                           
                        </div>
                    </div>
                </div>
            </div>
    </>
  )
}

export default Footer
