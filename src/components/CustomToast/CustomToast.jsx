import { Toast, ToastContainer } from 'react-bootstrap'

const CustomToast = ({ show, label, message, onClose, bg = 'danger' }) => {
  return (
    <ToastContainer position="top-end" className="p-3">
      <Toast show={show} onClose={onClose} bg={bg} delay={3000} autohide>
        <Toast.Header>
          <strong className="me-auto">{label}</strong>
        </Toast.Header>
        <Toast.Body>{message}</Toast.Body>
      </Toast>
    </ToastContainer>
  )
}

export default CustomToast
