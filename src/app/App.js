import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import HomePage from '../pages/HomePage/HomePage';
import ContactPage from '../pages/ContactPage/ContactPage';
import './App.css';

function App() {
  return (
    <Router basename="/Contacts-app">
      <Container className="app-container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/contact/:id" element={<ContactPage />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
