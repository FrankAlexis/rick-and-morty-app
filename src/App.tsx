import { Routes, Route } from 'react-router-dom';
import Home from './app/routes/home';
import { FC } from 'react';
import { CharacterDetailPage } from './app/routes/character-page';

const App: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}>
        <Route path="character/:id" element={<CharacterDetailPage />} />
        <Route path="*" element={<Home />} />
      </Route>
    </Routes>
  );
};

export default App;
