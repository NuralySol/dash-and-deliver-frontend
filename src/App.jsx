import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeComponent from './components/HomeComponent'; 
import RegisterComponent from './components/RegisterComponent'; 
import DashboardComponent from './components/DashboardComponent';
import LoginComponent from './components/LoginComponent';
import Checkout from './components/CheckoutComponent'; // Import Checkout component

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomeComponent />} />
          <Route path="/register" element={<RegisterComponent />} /> 
          <Route path="/login" element={<LoginComponent />} />
          <Route path="/dashboard" element={<DashboardComponent />} />
          <Route path="/checkout" element={<Checkout />} /> 
        </Routes>
      </div>
    </Router>
  );
};

export default App;