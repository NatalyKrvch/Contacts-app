import { useParams } from 'react-router-dom';

const ContactPage = () => {
  const { id } = useParams();

  return (
    <div>
      <h1>Contact Page</h1>
      <p>Contact ID: {id}</p>
    </div>
  )
}

export default ContactPage
