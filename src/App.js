import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './Pages/HomePage';
import CoinPage from './Pages/CoinPage'
import Header from './components/Header';

function App() {
  return <>
    <BrowserRouter>
      <div className="app">
        <Header />
        <Routes>
          <Route path='/' Component={HomePage} />
          <Route path='/coins/:id' Component={CoinPage} />
        </Routes>
      </div>
    </BrowserRouter>
  </>;
}

export default App;
