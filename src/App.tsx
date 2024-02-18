import { FC } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './components/Header/Header';
import Feed from './components/Feed/Feed';
import VideoDetails from './components/Video/VideoDetails';
import SearchResult from './components/Search/SearchResult';
import { SpeedInsights } from '@vercel/speed-insights/next';

const App: FC = () => {
  return (
    <BrowserRouter>
      <div className="flex flex-col h-full">
        <Header />
        <Routes>
          <Route index path="/" element={<Feed />} />
          <Route path="/searchResult/:searchQuery" element={<SearchResult />} />
          <Route path="/video/:id" element={<VideoDetails />} />
        </Routes>
        <SpeedInsights />
      </div>
    </BrowserRouter>
  );
};

export default App;
