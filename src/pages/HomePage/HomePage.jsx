import { ContactForm } from 'components/ContactForm'
import ContactsList from 'components/ContactsList/ContactsList'
import './HomePage.css'

const HomePage = () => {
  return (
    <div className="home-page-container">
      <ContactForm />
      <ContactsList />
    </div>
  )
}

export default HomePage
