import React, { FC } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './components/Header/Header';
import Feed from './components/Feed/Feed';
import SearchResult from './components/Search/SearchResult';
import VideoDetails from './components/Video/VideoDetails';
// import LeftNav from './components/LeftNav/LeftNav';

const App = () => {
  return (
    <BrowserRouter>
      <div className="flex flex-col h-full">
        <Header />
        <Routes>
          <Route index path="/" element={<Feed />} />
          <Route path="/searchResult/:searchQuery" element={<SearchResult />} />
          <Route path="/video/:id" element={<VideoDetails />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
