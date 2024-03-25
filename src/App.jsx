import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import RegistrationForm from './pages/RegistrationForm';
import LoginForm from './pages/LoginForm';
import LandingPage from './pages/LandingPage';
import HomePage from './pages/HomePage';
import CreditCard from './pages/Cards';
import AccountForm from './pages/Account';
import MakeTransaction from './pages/MakeTransaction';
import AllTransactions from './pages/AllTransactions';
import ProtectedRoute from './components/ProtectedRoute'; 
import { Navigate } from 'react-router-dom';


function App() {
  return (
    <div> 
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/registration" element={<RegistrationForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/homepage" element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          } />
          <Route path="/card" element={
            <ProtectedRoute>
              <CreditCard />
            </ProtectedRoute>
          } />
          <Route path="/account" element={
            <ProtectedRoute>
              <AccountForm />
            </ProtectedRoute>
          } />
          <Route path="/maketransaction" element={
            <ProtectedRoute>
              <MakeTransaction />
            </ProtectedRoute>
          } />
          <Route path="/alltransactions" element={
            <ProtectedRoute>
              <AllTransactions />
            </ProtectedRoute>
          } />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
