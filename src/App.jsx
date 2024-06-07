import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AllProducts from './components/AllProducts';
import Products_Category from './components/Products_Category';
import ViewProduct from './components/ViewProduct';


function App() {
    
  return (
    <>
     <BrowserRouter>
    
        

        <Routes>
          <Route path="/" element={<AllProducts />} />
          <Route path="/allProducts/:categoryParam" element={<Products_Category />} />
          <Route path="/viewproduct/:categoryParam/:prod_id" element={<ViewProduct />} />



        </Routes>
  
    </BrowserRouter>
      
    </>
  )
}

export default App
