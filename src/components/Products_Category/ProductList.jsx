import { useState, useEffect } from 'react';
import axios from 'axios';
import apiEndpoints from '../api_endpoints';
import './styles.css';

import { useParams } from 'react-router-dom';

// ProductList functional component
function ProductList() {
  // State variables for products, displayed products count, and search query
  const [products, setProducts] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState(20); 
  const [searchQuery, setSearchQuery] = useState('');

  // Retrieving category parameter from URL
  let { categoryParam } = useParams();
  console.log(categoryParam)

 // Fetching products data based on category parameter
  useEffect(() => {
    let endpointName;
    if (categoryParam == 'New') {
      endpointName = 'get_newproducts';
    } else if (categoryParam == 'Sale') {
      endpointName = 'get_saleproducts';
    } else {
      endpointName = 'get_allproducts';
    }

    const endpoint = apiEndpoints.find(endpoint => endpoint.name === endpointName);

    axios.get(endpoint.url, {
      params: {
        category: categoryParam
      }
    })
      .then(response => {
        setProducts(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
      });
  }, [categoryParam]);
  
 // Checking if the screen width is mobile
  const isMobile = window.innerWidth <= 768;
// Function to load more products
  const loadMoreProducts = () => {
    setDisplayedProducts(prev => {
      const newDisplayed = Math.min(prev + 10, filteredProducts.length);
      return newDisplayed;
    });
  };

  const filteredProducts = products.filter(product =>
    product.prod_name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  // Rendering the component
  return (
    <>
      <div id="sns_main" className="col-md-9 col-main">
        <div id="sns_mainmidle">
          <div className="category-cms-block"></div>
          <div className="category-products">
            <div className="row">
              <div id="sns_main" className="col-md-12 col-main">
                <div id="sns_mainmidle">
                  <div id="sns_producttaps1" className="sns_producttaps_wraps">
                    <div className="tab-content">
                      <div className='bannerhead'>
                      <h1>{categoryParam === 'New' ? 'New Products' : categoryParam === 'Sale' ? 'Sale Products' : categoryParam}</h1>
                         {/* Search input */}

                          <input
                            type="text"
                            className='searchinput'
                            placeholder='Search here...'
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            
                          />
                      </div>
                      <div role="tabpanel" className="tab-pane active" id="home">
                        <div className="products-grid row style_grid">
                         {/* Rendering product items */}
                          
                          {filteredProducts.slice(0, displayedProducts).map(product => (
                            <div key={product.Product_ID} className="item col-lg-2d4 col-md-3 col-sm-4 col-xs-6 col-phone-12" style={isMobile ? { margin: 'auto', width: '50%' } : { margin: 'auto'}}>
                              <div className="item-inner">
                                <div className="prd" style={{ display: "flex", flexDirection: 'column'}}>
                                  <div>
                                    <div className="ico-label">
                                        {/* Displaying labels for new and sale products */}
                                      {product.prod_new == 'true' && <span className="ico-product ico-new">New</span>}
                                      {product.prod_sale == 'true' && <span className="ico-product ico-sale">Sale</span>}
                                    </div>
                                     {/* Product image */}
                                    <a className="product-image have-additional" title={product.prod_name} href={`/viewproduct/${product.prod_category}/${product.Product_ID}`}>
                                      <span className="img-main" >
                                        <img src={`/src/images/products/${product.prod_img}`} alt={product.prod_name} style={{ maxHeight: '100px',  minHeight: '100px'}} />
                                      </span>
                                    </a>
                                  </div>
                                  <div className="item-info" style={{marginTop: '10px'}}>
                                    <div className="info-inner" style={{}}>
                                      <div className="item-title">
                                        <a
                                           {/* Product name */}
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
                                                {/* Product price */}
                                              <span className="price1">PHP {product.prod_price}</span>
                                              {product.prod_sale == 'true' && <span className="price2">{product.prod_oldprice}</span>}
                                            </span>
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="action-bot" style={{  height: "40px"}}>
                                    <div className="wrap-addtocart" style={{marginTop: '0px'}}>
                                        {/* Adding to cart button */}
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
  )
}

export default ProductList;
