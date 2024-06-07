import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Header from '../Header';
import Footer from '../Footer';
import apiEndpoints from '../api_endpoints';


function App() {
    const { prod_id, categoryParam } = useParams();
    const [relatedProds, setRelatedProds] = useState([]);

    

    
    useEffect(() => {
      
    
        const endpoint = apiEndpoints.find(endpoint => endpoint.name == 'get_allproducts');
    
        axios.get(endpoint.url, {
          params: {
            category: categoryParam
          }
        })
          .then(response => {
            setRelatedProds(response.data);
            console.log(response.data);
          })
          .catch(error => {
            console.error('Error fetching data: ', error);
          });
      }, [categoryParam]);

    const [product, setProduct] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [reviewCount, setReviewCount] = useState(0); // State to store the count of reviews

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const endpoint = apiEndpoints.find(endpoint => endpoint.name === 'get_productbyid').url;
                const response = await axios.get(`${endpoint}?Product_ID=${prod_id}`);
                setProduct(response.data);
            } catch (error) {
                console.error('Error fetching product data', error);
            }
        };

        const fetchReviews = async () => {
            try {
                const endpoint = apiEndpoints.find(endpoint => endpoint.name === 'get_reviewsbyprodid').url;
                const response = await axios.get(`${endpoint}?prod_id=${prod_id}`);
                setReviews(response.data);
                setReviewCount(response.data.length); // Set the review count
            } catch (error) {
                console.error('Error fetching reviews: ', error);
            }
        };

        fetchProduct();
        fetchReviews();
    }, [prod_id]);

    const handleGoBack = () => {
        window.history.back();
    };

    const isMobile = window.innerWidth <= 768;

    function shuffleArray(array) {
        const shuffledArray = [...array];
        for (let i = shuffledArray.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
        }
        return shuffledArray;
      }

    return (
        <>
        <Header />
        <div id="sns_breadcrumbs" className="wrap">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div id="sns_titlepage"></div>
                            <div id="sns_pathway" className="clearfix">
                                <div className="pathway-inner">
                                    <span className="icon-pointer "></span>

                                    <ul className="breadcrumbs" onClick={handleGoBack} style={{ cursor: 'pointer' }}>
            <li className="home">
                <a href="#" onClick={(e) => e.preventDefault()}>
                    <i className="fa fa-arrow-left"></i>
                </a>
            </li>
            <li className="category3 last">
                <span>Go Back</span>
            </li>
        </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        {product && (
            <>
        <div id="sns_content" className="wrap layout-m">
                <div className="container">
                    <div className="row">
                        <div id="sns_main" className="col-md-12 col-main">
                            <div id="sns_mainmidle">
                                <div className="product-view sns-product-detail">
                                    <div className="product-essential clearfix">
                                        <div className="row row-img">

                                            <div className="product-img-box col-md-4 col-sm-5">
                                                <div className="detail-img">
                                                    <img src={`/src/images/products/${product.prod_img}`} style={{ width: '100%' }} />
                                                </div>
                                                <div className="small-img">
                                                    <div id="sns_thumbail" className="owl-carousel owl-theme" style={{ display: 'flex'}}>
                                                    {shuffleArray(relatedProds.slice(0, 4)).map(prod => (
  <a className="item" key={prod.id} href={`/viewproduct/${prod.prod_category}/${prod.Product_ID}`}>
    <img src={`/src/images/products/${prod.prod_img}`} alt="" style={{ height: "100px" }}/>
  </a>
))}

                                                       
                                                        
                                                    </div>
                                                </div>
                                                
                                            </div>
                                            <div id="product_shop" className="product-shop col-md-8 col-sm-7">
                                                <div className="item-inner product_list_style">
                                                    <div className="item-info">
                                                    <div className="item-title" style={{ 
          
            paddingTop: isMobile ? '20px' : '0' }}>
        <a style={{ 
            fontWeight: 'bold', 
            color: '#222222',
            fontSize: '3em'
            
        }}>{product.prod_name}  {product.prod_new == 'true' ? <span style={{fontSize: '.5em', color: "#e34444"}}>(NEW) </span> : ''}</a>
    </div>

                                                        <div className="item-price">
                                                            <div className="price-box">
                                                                <span className="regular-price">
                                                                    <span className="price">PHP {product.prod_price}</span>
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div className="availability">
                                                        <p className="style1">
  {product.prod_sale == 'true' ? <del>PHP {product.prod_oldprice}</del> : ''}
</p>

                                                        </div>
                                                        <div className="rating-block">
                                                            <div className="ratings">
                                                                <div className="rating-box">
                                                                    <div className="rating" style={{ width:'60%' }}></div>
                                                                </div>
                                                               <span className="amount">
                                                                    <a> ({reviewCount > 0 ? reviewCount : '0'} Reviews) </a>
                                                                    
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div className="desc std" style={{ borderBottom: 'none' }}>
                                                            <h5>DESCRIPTION</h5>
                                                            <p>{product.prod_description}</p>
                                                        </div>

                                                       

                                                        <div className="actions" style={{ borderTop: 'none', marginTop: '-20px'}}>
                                                            <label className="gfont" >Qty : </label>
                                                            <div className="qty-container">
                                                                <button className="qty-decrease"  type="button" >
                                                                </button>
                                                                <input id="qty" className="input-text qty" type="text" title="Qty" value="1" name="qty" />
                                                                <button className="qty-increase" type="button" >
                                                                    </button>
                                                            </div>
                                                            
                                                            {localStorage.getItem('logged_username') ? (
                                                            <button type='submit' className="btn-cart" title="Add to Cart" data-id="qv_item_8" style={{ marginTop: isMobile ? '20px' : '0' }}>
                                                                Add to Cart
                                                            </button>)
                                                            : (
                                                            <a href='/login' className="btn-cart" title="Add to Cart" data-id="qv_item_8" style={{ marginTop: isMobile ? '20px' : '0', textAlign: 'center', cursor: 'pointer' }}>
                                                                LOGIN FIRST
                                                            </a>
                                                            )}
                                                           
                                                        </div>

                                                        <div style={{ display:'flex', flexDirection: 'column'}}>

                                                        
                                                        <div style={{ display: 'flex', flexDirection: 'column' }}>
    {reviewCount > 0 && (
        <div className="desc std" style={{ borderBottom: 'none'}}>
        <h5>REVIEWS</h5>
    </div>
    )}
    {reviewCount > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '-20px' }}>
            {reviews.map(review => (
                <textarea
                    style={{
                        border: '1px solid #DFDFDF',
                        outline: 'none',
                        padding: '5px',
                        width: '100%',
                        maxWidth: '50%',
                        minHeight: '150px',
                        maxHeight: '150px',
                        resize: 'none'
                    }}
                    key={review.Review_ID}
                    readOnly
                >
                    {review.review}
                </textarea>
            ))}
        </div>
    )}
</div>

                                                            
                                                           
                                                        </div>


                                                            <div className="addthis_native_toolbox"></div>

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
                     )}








            
        <Footer />
        </>
    );
}

export default App;
