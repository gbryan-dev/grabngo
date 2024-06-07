import { useState, useEffect } from 'react';
import axios from 'axios';
import apiEndpoints from '../api_endpoints';
import './styles.css';

function ProductList() {
  // State variables for products, displayed products, and search query
  const [products, setProducts] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState(20);
  const [searchQuery, setSearchQuery] = useState('');

  // Function to shuffle an array
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  // Fetching products from API on component mount
  useEffect(() => {
    axios.get(apiEndpoints.find(endpoint => endpoint.name === 'get_allproducts').url)
      .then(response => {
        const shuffledProducts = shuffleArray(response.data);
        setProducts(shuffledProducts);
        console.log(shuffledProducts);
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
      });
  }, []);

  // Checking if the window width is less than or equal to 768px (for mobile)
  const isMobile = window.innerWidth <= 768;

  // Function para magload og other 10 products
  const loadMoreProducts = () => {
    setDisplayedProducts(prev => {
      const newDisplayed = Math.min(prev + 10, filteredProducts.length);
      return newDisplayed;
    });
  };
  
 // Filtering products based on search query
  const filteredProducts = products.filter(product =>
    product.prod_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {/* Product list section */}
      <div id="sns_main" className="col-md-9 col-main">
        <div id="sns_mainmidle">
          <div className="category-cms-block"></div>
          <div className="category-products">
            <div className="row">
              <div id="sns_main" className="col-md-12 col-main">
                <div id="sns_mainmidle">
                  <div id="sns_producttaps1" className="sns_producttaps_wraps">
                    <div className="tab-content">
                       {/* Banner section */}
                      <div className='bannerhead'>
                          <h1>All Products</h1>
                           {/* Search input */}
                          <input
                            type="text"
                            className='searchinput'
                            placeholder='Search here...'
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                          />
                      </div>
                       {/* Product grid */}
                      <div role="tabpanel" className="tab-pane active" id="home">
                        <div className="products-grid row style_grid">
                          {/* Mapping through filtered products */}
                          {filteredProducts.slice(0, displayedProducts).map(product => (
                            <div key={product.Product_ID} className="item col-lg-2d4 col-md-3 col-sm-4 col-xs-6 col-phone-12" style={isMobile ? { margin: 'auto', width: '50%' } : { margin: 'auto'}}>
                              <div className="item-inner">
                                <div className="prd" style={{ display: "flex", flexDirection: 'column'}}>
                                  <div>
                                     {/* Product labels */}
                                    <div className="ico-label">
                                      {product.prod_new === 'true' && <span className="ico-product ico-new">New</span>}
                                      {product.prod_sale === 'true' && <span className="ico-product ico-sale">Sale</span>}
                                    </div>
                                    {/* Product image */}
                                    <a className="product-image have-additional"  href={`/viewproduct/${product.prod_category}/${product.Product_ID}`}>
                                      <span className="img-main">
                                        <img src={`/src/images/products/${product.prod_img}`} style={{ maxHeight: '100px', minHeight: '100px'}} />
                                      </span>
                                    </a>
                                  </div>
                                     {/* Product info */}
                                  <div className="item-info" style={{marginTop: '10px'}}>
                                    <div className="info-inner" style={{}}>
                                      <div className="item-title">
                                        {/* Product title */}
                                        <a
                                          title={product.prod_name}
                                          href={`/viewproduct/${product.prod_category}/${product.Product_ID}`}
                                          style={{
                                            whiteSpace: isMobile ? 'normal' : 'nowrap',
                                            overflow: isMobile ? 'visible' : 'hidden',
                                            textOverflow: 'ellipsis',
                                            maxWidth: isMobile ? 'none' : '10ch',
                                            display: 'inline-block'
                                          }}
                                        >
                                          {product.prod_name}
                                        </a>
                                      </div>
                                      <div className="item-price">
                                        <div className="price-box">
                                          <span className="regular-price">
                                            <span className="price">
                                              <span className="price1">PHP {product.prod_price}</span>
                                              {product.prod_sale === 'true' && <span className="price2">{product.prod_oldprice}</span>}
                                            </span>
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                   {/* Action buttons */}
                                  <div className="action-bot" style={{  height: "40px"}}>
                                    <div className="wrap-addtocart" style={{marginTop: '0px'}}>
                                        {/* Add to cart button or login button */}
                                    {localStorage.getItem('logged_username') ?
                                    <button className="btn-cart" title="Add to Cart">
                                    <i className="fa fa-shopping-cart"></i>
                                    <span>Add to Cart</span>
                                  </button> :

                                  <a href='/login' className="btn-cart" title="Login First">
                                    <i className="fa fa-shopping-cart"></i>
                                    <span>Login First</span>
                                  </a> }
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                        <br />
                        <br />
                        <br />
                        {/* Load more button */}
                        <h3 className="bt-more" style={{ display: displayedProducts >= filteredProducts.length ? 'none' : 'block' }}>
                          <span onClick={loadMoreProducts}>Load more products</span>
                        </h3>
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
  );
}

export default ProductList;
