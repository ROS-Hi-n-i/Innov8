
import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useAppContext } from './context/AppContext';
import HomePage from './pages/HomePage';
import ProductDetailPage from './pages/ProductDetailPage';
import AuthPage from './pages/AuthPage';
import MyListingsPage from './pages/MyListingsPage';
import ProductFormPage from './pages/ProductFormPage';
import DashboardPage from './pages/DashboardPage';
import CartPage from './pages/CartPage';
import PurchasesPage from './pages/PurchasesPage';
import Header from './components/Header';

const App: React.FC = () => {
  return (
    <AppProvider>
      <HashRouter>
        <Main />
      </HashRouter>
    </AppProvider>
  );
};

const ProtectedRoute: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const { currentUser } = useAppContext();
  if (!currentUser) {
    return <Navigate to="/auth" replace />;
  }
  return children;
};


const Main: React.FC = () => {
  const { currentUser } = useAppContext();
  
  return (
    <div className="min-h-screen flex flex-col">
       <Routes>
          <Route path="/auth" element={currentUser ? <Navigate to="/" /> : <AuthPage />} />
          <Route path="/*" element={
            <>
              <Header />
              <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/product/:id" element={<ProductDetailPage />} />
                  <Route path="/my-listings" element={<ProtectedRoute><MyListingsPage /></ProtectedRoute>} />
                  <Route path="/add-product" element={<ProtectedRoute><ProductFormPage /></ProtectedRoute>} />
                  <Route path="/edit-product/:id" element={<ProtectedRoute><ProductFormPage /></ProtectedRoute>} />
                  <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
                  <Route path="/cart" element={<ProtectedRoute><CartPage /></ProtectedRoute>} />
                  <Route path="/purchases" element={<ProtectedRoute><PurchasesPage /></ProtectedRoute>} />
                  <Route path="*" element={<div className="text-center py-10"><h2>404: Page Not Found</h2></div>} />
                </Routes>
              </main>
            </>
          } />
        </Routes>
    </div>
  );
};


export default App;
