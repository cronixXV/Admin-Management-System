import { Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from '@/pages/login/login-page';
import { ProductsPage } from '@/pages/products/products-page';

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/products" element={<ProductsPage />} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};
