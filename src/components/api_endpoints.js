const apiEndpoints = [
  {
      name: 'register',
      url: 'http://localhost/REACT_API/CRUD/Create/register.php'
  },
  {
      name: 'login',
      url: 'http://localhost/REACT_API/CRUD/Read/login.php'
  },
  {
      name: 'get_categories',
      url: 'http://localhost/REACT_API/CRUD/Read/get_categories.php'
  },
  {
      name: 'get_featuredprods',
      url: 'http://localhost/REACT_API/CRUD/Read/get_featuredprods.php'
  },
  { 
      name: 'get_allproducts',
      url: 'http://localhost/REACT_API/CRUD/Read/get_allproducts.php' 
  },
  { 
      name: 'get_newproducts',
      url: 'http://localhost/REACT_API/CRUD/Read/get_newproducts.php' 
  },
  { 
      name: 'get_saleproducts',
      url: 'http://localhost/REACT_API/CRUD/Read/get_saleproducts.php' 
  }, 
  {
      name: 'get_countnewprods',
      url: 'http://localhost/REACT_API/CRUD/Read/get_countnewprods.php'
  },
  {
      name: 'get_countsaleprods',
      url: 'http://localhost/REACT_API/CRUD/Read/get_countsaleprods.php'
  },
  {
      name: 'get_productbyid',
      url: 'http://localhost/REACT_API/CRUD/Read/get_productbyid.php'
  },
  {
      name: 'get_reviewsbyprodid',
      url: 'http://localhost/REACT_API/CRUD/Read/get_reviewsbyprodid.php'
  },
  {
      name: 'add_to_cart',
      url: 'http://localhost/REACT_API/CRUD/Create/add_to_cart.php'
  },
  {
      name: 'get_allincart',
      url: 'http://localhost/REACT_API/CRUD/Read/get_allincart.php'
  },
  {
      name: 'delete_productfromcart',
      url: 'http://localhost/REACT_API/CRUD/Delete/delete_productfromcart.php'

  }, 
  {
    name: 'update_quantity',
    url: 'http://localhost/REACT_API/CRUD/Update/update_quantity.php'

  }
];

export default apiEndpoints;
