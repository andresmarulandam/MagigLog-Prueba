import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProductProvider } from './context/ProductsContext';

import ProductsPage from './pages/ProductsPage';
import Home from './pages/Home';
import ProtectedRoutes from './pages/ProtectedRoutes';
import { Navbar } from './components/NavBar';

const App = () => {
  return (
    <AuthProvider>
      <ProductProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />

            <Route element={<ProtectedRoutes />}>
              <Route path="/products" element={<ProductsPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ProductProvider>
    </AuthProvider>
  );
};

export default App;
