import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Removed Switch
import List_table from './List_Testing_table';
import MembersPage from './list.table';

const Apps = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<List_table />} />
        <Route path="/members/:id" element={<MembersPage />} />
      </Routes>
    </Router>
  );
};

export default Apps;
