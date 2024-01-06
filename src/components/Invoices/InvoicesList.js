import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ListGroup, Button } from 'react-bootstrap';
import { FaPencilAlt, FaTrash } from 'react-icons/fa';
import toast, { Toaster } from 'react-hot-toast';

import { setActiveInvoice, deleteInvoice } from 'actions/invoicesActions';

const InvoicesList = () => {
	const { invoices } = useSelector(state => state.invoices);
	const dispatch = useDispatch();

	const handleInvoiceDelete = invoice => {
		dispatch(deleteInvoice(invoice.id));
		toast.success(`Deleted Invoice #${invoice.invoiceNumber} successfully!`);
	};

	return (
		<div className="container mt-5" style={{ maxWidth: '800px' }}>
			<h2 className="mb-4">Invoices List</h2>
			<Toaster />

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
							<strong>Invoice #{invoice.invoiceNumber}</strong> - {invoice.billTo} -{' '}
							{invoice.currency.split('_')[0]}
							{invoice.total.toFixed(2)}
						</span>

						<div className="ms-2">
							<Link to={`/edit/${invoice.id}`}>
								<Button variant="outline-primary" className="me-2">
									<FaPencilAlt />
								</Button>
							</Link>

							<Button
								variant="outline-danger"
								onClick={() => handleInvoiceDelete(invoice)}
							>
								<FaTrash />
							</Button>
						</div>
					</ListGroup.Item>
				))}
			</ListGroup>
		</div>
	);
};

export default InvoicesList;
