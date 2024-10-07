import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import NavBar from './NavBar';

const Layout = ({ onAddExpense }) => {
  return (
    <div className="layout">
      <NavBar />

      {/* This will render the current page's content */}
      <Outlet />

      {/* Footer will be persistent across all pages */}
      <Footer onAddExpense={onAddExpense} />
    </div>
  );
};

export default Layout;
