import { Col, Card } from 'react-bootstrap';
import InvoiceItem from './InvoiceItem';

const ProductDetails = ({ invoice, onProductAdd, onProductEdit, onProductDelete }) => {
	return (
		<>
			<Col md={8}>
				<Card className="p-4 p-xl-5 my-3 my-xl-4">
					<InvoiceItem
						items={invoice.items}
						currency={invoice.currency.split('_')[0]}
						onRowAdd={onProductAdd}
						onRowDel={onProductDelete}
						onItemizedItemEdit={onProductEdit}
					/>
				</Card>
			</Col>

			<Col md={4}>
				<div className="sticky-top pt-md-3 pt-xl-4">
					<Card className="p-4 p-xl-5">
						<div className="d-flex flex-row align-items-start justify-content-between">
							<span className="fw-bold">Subtotal:</span>

							<span>
								{invoice.currency.split('_')[0]}
								{invoice.subTotal.toFixed(2)}
							</span>
						</div>

						<div className="d-flex flex-row align-items-start justify-content-between mt-2">
							<span className="fw-bold">Discount:</span>

							<span>
								<span className="small ">({invoice.discountRate || 0}%)</span>
								{invoice.currency.split('_')[0]}
								{(invoice.discountAmount || 0).toFixed(2)}
							</span>
						</div>

						<div className="d-flex flex-row align-items-start justify-content-between mt-2">
							<span className="fw-bold">Tax:</span>

							<span>
								<span className="small ">({invoice.taxRate || 0}%)</span>
								{invoice.currency.split('_')[0]}
								{(invoice.taxAmount || 0).toFixed(2)}
							</span>
						</div>

						<hr />

						<div
							className="d-flex flex-row align-items-start justify-content-between"
							style={{ fontSize: '1.125rem' }}
						>
							<span className="fw-bold">Total:</span>

							<span className="fw-bold">
								{invoice.currency.split('_')[0]}
								{invoice.total?.toFixed(2) || 0}
							</span>
						</div>
					</Card>
				</div>
			</Col>
		</>
	);
};

export default ProductDetails;
