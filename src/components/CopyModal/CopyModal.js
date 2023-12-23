import { Link } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import { BsCheckCircle } from 'react-icons/bs';

const CopyModal = ({ show, onClose, invoiceId }) => (
	<Modal show={show} onHide={onClose} centered>
		<Modal.Header closeButton>
			<Modal.Title>
				<BsCheckCircle className="text-success me-2" />
				Invoice Copied
			</Modal.Title>
		</Modal.Header>

		<Modal.Body>
			<p>Invoice successfully copied to a new one!</p>
		</Modal.Body>

		<Modal.Footer>
			<Link to={`/edit/${invoiceId}`}>
				<Button variant="primary" onClick={onClose}>
					Go to New Invoice
				</Button>
			</Link>
		</Modal.Footer>
	</Modal>
);

export default CopyModal;
