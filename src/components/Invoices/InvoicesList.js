import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ListGroup, Button } from 'react-bootstrap';
import { FaPencilAlt, FaTrash } from 'react-icons/fa';

import { setActiveInvoice, deleteItem } from 'actions/invoicesActions';

const InvoicesList = () => {
	const { items: invoices } = useSelector(state => state.invoices);
	const dispatch = useDispatch();

	return (
		<div className="container mt-5">
			<h2 className="mb-4">Invoices List</h2>

			<ListGroup>
				{invoices.map(invoice => (
					<ListGroup.Item
						key={invoice.id}
						className="d-flex justify-content-between align-items-center invoice-item"
					>
						<span
							style={{ cursor: 'pointer', flex: '1' }}
							onClick={() => dispatch(setActiveInvoice(invoice))}
						>
							<strong>Invoice #{invoice.invoiceNumber}</strong> - {invoice.billTo} - $
							{invoice.total.toFixed(2)}
						</span>

						<div className="ms-2">
							<Link to={`/edit/${invoice.id}`}>
								<Button variant="outline-primary" className="me-2">
									<FaPencilAlt /> {'  '}
									Edit
								</Button>
							</Link>

							<Button
								variant="outline-danger"
								onClick={() => dispatch(deleteItem(invoice.id))}
							>
								<FaTrash />
								{'  '} Delete
							</Button>
						</div>
					</ListGroup.Item>
				))}
			</ListGroup>
		</div>
	);
};

export default InvoicesList;
