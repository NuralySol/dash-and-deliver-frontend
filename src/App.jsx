// This where we import all of the states and functions, components, etc
// Make sure the path is correct
// Now we have to create components to render the SPA application
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeComponent from './components/HomeComponent'; // Adjust the path if necessary
import RegisterComponent from './components/RegisterComponent'; // Adjust the path if necessary


const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
            
          <Route path="/" element={<HomeComponent />} />
          <Route path="/register" element={<RegisterComponent />} />

        </Routes>
      </div>
    </Router>
  );
};

export default App;