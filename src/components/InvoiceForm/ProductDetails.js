import { Col, Card, Accordion } from 'react-bootstrap';
import InvoiceItem from './InvoiceItem';

const ProductDetails = ({
	invoice,
	invoiceGroups,
	onProductAdd,
	onProductEdit,
	onProductDelete,
}) => (
	<>
		<Col md={8}>
			<Card className="p-4 p-xl-5 my-3 my-xl-4">
				<Accordion alwaysOpen>
					{invoiceGroups.map(group => (
						<Accordion.Item key={group} eventKey={group}>
							<Accordion.Header>{group}</Accordion.Header>
							<Accordion.Body>
								<InvoiceItem
									onlyForm
									items={invoice.items.filter(item => item.group === group)}
									currency={invoice.currency.split('_')[0]}
									fallbackWhen={
										!invoice.items.filter(item => item.group === group).length
									}
									onRowAdd={onProductAdd}
									onRowDel={onProductDelete}
									onItemizedItemEdit={onProductEdit}
								/>
							</Accordion.Body>
						</Accordion.Item>
					))}
				</Accordion>

				<div className="mt-5">
					<InvoiceItem
						items={invoice.items.filter(item => !item.group)}
						currency={invoice.currency.split('_')[0]}
						onRowAdd={onProductAdd}
						onRowDel={onProductDelete}
						onItemizedItemEdit={onProductEdit}
					/>
				</div>
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

export default ProductDetails;
