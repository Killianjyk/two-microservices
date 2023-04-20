import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import HatList from './HatList';
import HatForm from './HatForm';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
        <Route path="shoes">
            <Route index element={<ShoeList />} />
            <Route path="new" element={<ShoeForm />} />
            </Route>
          <Route path="hats">
            <Route index element={<HatList />} />
            <Route path="new" element={<HatForm />} />
          </Route>
          <Route path="/" element={<MainPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
