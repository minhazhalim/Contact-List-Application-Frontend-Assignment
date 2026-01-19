import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ContactProvider } from './context/ContactContext';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import AddContactPage from './pages/AddContactPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
function App() {
  return (
    <ContactProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/add" element={<AddContactPage />} />
        </Routes>
      </Router>
    </ContactProvider>
  );
}
export default App;