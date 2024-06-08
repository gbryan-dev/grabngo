import banner from '../../images/banner1.png';
import { NavLink, useParams } from 'react-router-dom';
import './styles.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import apiEndpoints from '../api_endpoints';
import ProductList from './ProductList';

// Extracting categoryParam from URL params
function Content() {
  let { categoryParam } = useParams();
  // State variables for categories and product counts
  const [categories, setCategories] = useState([]);
const [countNew, setCountNew] = useState([]);
const [countSale, setCountSale] = useState([]);
 // Fetching categories data from API endpoint
useEffect(() => {
  axios.get(apiEndpoints.find(endpoint => endpoint.name === 'get_categories').url)
    .then(response => {
      setCategories(response.data);
    })
    .catch(error => {
      console.error('Error fetching categories:', error);
    });
}, []);
// Fetching counts for new and sale products
useEffect(() => {
  axios.get(apiEndpoints.find(endpoint => endpoint.name === 'get_countnewprods').url)
    .then(response => {
      setCountNew(response.data);
    })
    .catch(error => {
      console.error('Error fetching new product count:', error);
    });

  axios.get(apiEndpoints.find(endpoint => endpoint.name === 'get_countsaleprods').url)
    .then(response => {
      setCountSale(response.data);
    })
    .catch(error => {
      console.error('Error fetching sale product count:', error);
    });
}, []);
  // Calculating total product count, sale count, and new count
const totalProductCount = categories.reduce((acc, curr) => acc + Number(curr.count), 0);
const totalSaleCount = countSale.reduce((acc, curr) => acc + Number(curr.count), 0);
const totalNewCount = countNew.reduce((acc, curr) => acc + Number(curr.count), 0);

 // Rendering the component
  return (
    <>
      <div id="sns_content" className="wrap layout">
        <div className="container">
          <div className="row">
            <div id="sns_left" className="col-md-3">
                {/* Left sidebar */}
              <div className="wrap-in"></div>
              <div className="block block-layered-nav block-layered-nav--no-filters">
                <div className="block-title">
                  <strong>
                    <span>Shop By</span>
                  </strong>
                </div>
                 {/* Category filters */}
                <div className="block-content toggle-content">
                  <dl id="narrow-by-list">
                    <dt className="odd">Category</dt>
                    <dd className="odd">
                      <ul>
                         {/* Filter for new products */}
                        <li style={{ lineHeight: "15px", width:'100%' }}>
                          <NavLink to='/allProducts/New' style={{ textDecoration: 'none', color: 'inherit' }}>
                            <label style={{ display: 'flex'}}>
                              <input type="radio" name="category" checked={categoryParam === 'New'} style={{ accentColor: 'red'}}/>
                              <div style={{ paddingLeft: '5px', paddingTop: '5px'}}>
                                <span style={{ cursor: 'pointer' }}>New Products </span>
                                <span className="count"> ({totalNewCount}) </span>
                              </div>
                            </label>
                          </NavLink>
                        </li>
                         {/* Filter for sale products */}
                        <li style={{ lineHeight: "15px", width:'100%' }}>
                          <NavLink to='/allProducts/Sale' style={{ textDecoration: 'none', color: 'inherit' }}>
                            <label style={{ display: 'flex'}}>
                              <input type="radio" name="category" checked={categoryParam === 'Sale'} style={{ accentColor: 'red'}}/>
                              <div style={{ paddingLeft: '5px', paddingTop: '5px'}}>
                                <span style={{ cursor: 'pointer' }}>Sale Products</span>
                                <span className="count"> ({totalSaleCount}) </span>
                              </div>
                            </label>
                          </NavLink>
                        </li>
                        {/* Filter for all products */}
                        <li style={{ lineHeight: "15px", width:'100%' }}>
                          <NavLink to='/allProducts' style={{ textDecoration: 'none', color: 'inherit' }}>
                            <label style={{ display: 'flex'}}>
                              <input type="radio" name="category" style={{ accentColor: 'red'}}/>
                              <div style={{ paddingLeft: '5px', paddingTop: '5px'}}>
                                <span style={{ cursor: 'pointer' }}>All Products</span>
                                <span className="count"> ({totalProductCount}) </span>
                              </div>
                            </label>
                          </NavLink>
                        </li>
                         {/* Dynamic rendering of category filters */}
                        {categories.map((category, index) => (
                          <li key={index} style={{ lineHeight: "15px"  }}>
                            <NavLink to={`/allProducts/${category.prod_category.replace(/[^/]+$/, category.prod_category)}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                              <label style={{ display: 'flex', alignItems: 'center'}}>
                                <input type="radio" name="category" style={{ marginRight: '5px', color: 'red' , accentColor: 'red'}} checked={category.prod_category === categoryParam} />
                                <div style={{ paddingTop: '5px' }}>
                                  <span style={{ cursor: 'pointer'}}>{category.prod_category} </span>
                                  <span className="count">({category.count})</span>
                                </div>
                              </label>
                            </NavLink>
                          </li>
                        ))}
                      </ul>
                    </dd>
                  </dl>
                </div>
              </div>
              <div className="block block_cat">
                <a className="banner5">
                  <img  src={banner} alt="" />
                </a>
              </div>
            </div>
             {/* Product list */}
            <ProductList />
          </div>
        </div>
      </div>
    </>
  );
}

export default Content;
