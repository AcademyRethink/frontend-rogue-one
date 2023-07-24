import React from 'react';
import { Route, Navigate } from 'react-router-dom';

interface PrivateRouteProps {
  element: React.ReactNode;
  path: string;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element, path, ...rest }) => {
  const token = localStorage.getItem('token');

  return token ? (
    <Route path={path} element={element} {...rest} />
  ) : (
    <Navigate to="/" replace />
  );
};

export default PrivateRoute;
