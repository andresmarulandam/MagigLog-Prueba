import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import { AuthProvider } from './context/AuthContext';
import Products from './pages/Products';

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
