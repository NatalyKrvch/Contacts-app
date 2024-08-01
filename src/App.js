import { Route, Routes } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import HomePage from './pages/HomePage'
import ContactPage from './pages/ContactPage'
import './App.css'

function App() {
  return (
    <Container className="app-container">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/contact/:id" element={<ContactPage />} />
      </Routes>
    </Container>
  )
}

export default App
