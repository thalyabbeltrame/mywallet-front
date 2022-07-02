import { BrowserRouter, Routes, Route } from 'react-router-dom';

import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import HomePage from './pages/HomePage';
import TransactionPage from './pages/TransactionPage';

import './assets/css/reset.css';
import './assets/css/styles.css';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<SignInPage />} />
          <Route path='/signup' element={<SignUpPage />} />
          <Route path='/home' element={<HomePage />} />
          <Route path='/transaction' element={<TransactionPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
