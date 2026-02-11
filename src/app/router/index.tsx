import { Routes, Route, Navigate } from 'react-router-dom';

import { ProtectedRoute } from './protected-route';
import { AppLayout } from '../layout/app-layout';

import { LoginPage } from '@/pages/login/login-page';
import { ProductsPage } from '@/pages/products/products-page';

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
          <Route path="/products" element={<ProductsPage />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};
