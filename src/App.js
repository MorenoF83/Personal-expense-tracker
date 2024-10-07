import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './HomePage';
import ChartPage from './ChartPage';
import SummaryPage from './SummaryPage';
import Layout from './Layout';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout onAddExpense />}>
        <Route index element={<HomePage />} />
        <Route path="/chartPage" element={<ChartPage />} />
        <Route path="/summaryPage" element={<SummaryPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
