import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

import { v4 as uuid } from 'uuid';
import { Form, Row, Col, Button, Card, InputGroup } from 'react-bootstrap';
import { BiArrowToLeft } from 'react-icons/bi';

import InvoiceItem from './InvoiceItem';
import CopyModal from 'components/CopyModal/CopyModal';
import { copyItem, setActiveInvoice } from 'actions/invoicesActions';

const initialItem = {
	id: uuid(),
	name: '',
	description: '',
	price: 1,
	quantity: 1,
};

const initialInvoiceState = {
	id: uuid(),
	items: [initialItem],
	currency: '$',
	currentDate: '',
	invoiceNumber: 1,
	dateOfIssue: '',
	billTo: '',
	billToEmail: '',
	billToAddress: '',
	billFrom: '',
	billFromEmail: '',
	billFromAddress: '',
	notes: '',
	total: 0,
	subTotal: 0,
	taxRate: '',
	taxAmount: 0,
	discountRate: '',
	discountAmount: 0,
};

const InvoiceForm = () => {
	const [invoice, setInvoice] = useState(initialInvoiceState);
	const [isCopied, setIsCopied] = useState(false);

	const invoices = useSelector(state => state.invoices.items);
	const dispatch = useDispatch();

	const { invoiceSlug } = useParams();

	useEffect(() => {
		const existsInvoice = invoice => invoice.id === invoiceSlug;

		if (invoiceSlug || invoices.some(existsInvoice)) {
			const currentInvoice = invoices.find(existsInvoice);
			setInvoice(currentInvoice);
		}
	}, [invoiceSlug, invoices]);

	useEffect(() => {
		handleCalculateTotal();
	}, []);

	const handleRowDel = itemID => {
		setInvoice(invoiceObj => ({
			...invoiceObj,
			items: invoiceObj.items.filter(item => item.id !== itemID),
		}));
	};

	const handleAddEvent = () => {
		const defaultItem = {
			...initialItem,
			id: uuid(),
		};

		setInvoice(invoiceObj => ({
			...invoiceObj,
			items: [...invoiceObj.items, defaultItem],
		}));
	};

	const handleCalculateTotal = () => {
		setInvoice(invoiceObj => {
			const subTotal = invoiceObj.items.reduce(
				(total, item) => total + item.price * item.quantity,
				0
			);

			return {
				...invoiceObj,
				subTotal,
				taxAmount: subTotal * (invoiceObj.taxRate / 100),
				discountAmount: subTotal * (invoiceObj.discountRate / 100),
				total: subTotal - invoiceObj.discountAmount + invoiceObj.taxAmount,
			};
		});
	};

	const handleItemizedItemEdit = event => {
		const currentItem = event.target;

		const updatedItems = invoice.items.map(item => {
			return item.id === currentItem.id
				? { ...item, [currentItem.name]: +currentItem.value || currentItem.value }
				: item;
		});

		setInvoice(invoiceObj => ({ ...invoiceObj, items: updatedItems }));
		handleCalculateTotal();
	};

	const editField = event => {
		setInvoice(invoiceObj => ({
			...invoiceObj,
			[event.target.name]: +event.target.value || event.target.value,
		}));

		handleCalculateTotal();
	};

	const handleCurrencyChange = currency => {
		setInvoice(invoiceObj => ({ ...invoiceObj, currency }));
	};

	const handleInvoiceCopy = () => {
		dispatch(copyItem(invoice));
		setIsCopied(true);
	};

	const handleFormSubmit = event => {
		event.preventDefault();

		dispatch(setActiveInvoice(invoice));
		handleCalculateTotal();
	};

	return (
		<>
			<CopyModal
				show={isCopied}
				invoiceId={invoices.at(-1).id}
				onClose={() => setIsCopied(false)}
			/>

			<Link to="/">
				<Button variant="outline" className="mt-3 mb-2 border-0">
					<BiArrowToLeft className="me-2" />
					Back to Invoices
				</Button>
			</Link>

			<Form onSubmit={handleFormSubmit}>
				<Row>
					<Col md={8} lg={9}>
						<Card className="p-4 p-xl-5 my-3 my-xl-4">
							<div className="d-flex flex-row align-items-start justify-content-between mb-3">
								<div className="d-flex flex-column">
									<div className="d-flex flex-column">
										<div className="mb-2">
											<span className="fw-bold">
												Current&nbsp;Date:&nbsp;
											</span>

											<span className="current-date">
												{new Date().toLocaleDateString()}
											</span>
										</div>
									</div>

									<div className="d-flex flex-row align-items-center">
										<span className="fw-bold d-block me-2">Due&nbsp;Date:</span>

										<Form.Control
											type="date"
											name={'dateOfIssue'}
											value={invoice.dateOfIssue}
											onChange={editField}
											required
											style={{ maxWidth: '150px' }}
										/>
									</div>
								</div>

								<div className="d-flex flex-row align-items-center">
									<span className="fw-bold me-2">Invoice&nbsp;Number:&nbsp;</span>

									<Form.Control
										type="number"
										name={'invoiceNumber'}
										value={invoice.invoiceNumber}
										onChange={editField}
										min="1"
										required
										style={{ maxWidth: '70px' }}
									/>
								</div>
							</div>

							<hr className="my-4" />

							<Row className="mb-5">
								<Col>
									<Form.Label className="fw-bold">Bill to:</Form.Label>

									<Form.Control
										placeholder={'Who is this invoice to?'}
										rows={3}
										type="text"
										name="billTo"
										className="my-2"
										value={invoice.billTo}
										onChange={editField}
										autoComplete="name"
										required
									/>

									<Form.Control
										placeholder={'Email address'}
										type="email"
										name="billToEmail"
										className="my-2"
										value={invoice.billToEmail}
										onChange={editField}
										autoComplete="email"
										required
									/>

									<Form.Control
										placeholder={'Billing address'}
										type="text"
										name="billToAddress"
										className="my-2"
										autoComplete="address"
										value={invoice.billToAddress}
										onChange={editField}
										required
									/>
								</Col>

								<Col>
									<Form.Label className="fw-bold">Bill from:</Form.Label>

									<Form.Control
										placeholder={'Who is this invoice from?'}
										rows={3}
										type="text"
										name="billFrom"
										className="my-2"
										value={invoice.billFrom}
										onChange={editField}
										autoComplete="name"
										required
									/>

									<Form.Control
										placeholder={'Email address'}
										type="email"
										name="billFromEmail"
										className="my-2"
										value={invoice.billFromEmail}
										onChange={editField}
										autoComplete="email"
										required
									/>

									<Form.Control
										placeholder={'Billing address'}
										type="text"
										name="billFromAddress"
										className="my-2"
										autoComplete="address"
										value={invoice.billFromAddress}
										onChange={editField}
										required
									/>
								</Col>
							</Row>

							<InvoiceItem
								items={invoice.items}
								currency={invoice.currency}
								onRowAdd={handleAddEvent}
								onRowDel={handleRowDel}
								onItemizedItemEdit={handleItemizedItemEdit}
							/>

							<Row className="mt-4 justify-content-end">
								<Col lg={6}>
									<div className="d-flex flex-row align-items-start justify-content-between">
										<span className="fw-bold">Subtotal:</span>

										<span>
											{invoice.currency}
											{invoice.subTotal.toFixed(2)}
										</span>
									</div>

									<div className="d-flex flex-row align-items-start justify-content-between mt-2">
										<span className="fw-bold">Discount:</span>

										<span>
											<span className="small ">
												({invoice.discountRate || 0}%)
											</span>
											{invoice.currency}
											{(invoice.discountAmount || 0).toFixed(2)}
										</span>
									</div>

									<div className="d-flex flex-row align-items-start justify-content-between mt-2">
										<span className="fw-bold">Tax:</span>

										<span>
											<span className="small ">
												({invoice.taxRate || 0}%)
											</span>
											{invoice.currency}
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
											{invoice.currency}
											{invoice.total?.toFixed(2) || 0}
										</span>
									</div>
								</Col>
							</Row>

							<hr className="my-4" />

							<Form.Label className="fw-bold">Notes:</Form.Label>

							<Form.Control
								placeholder="Thanks for your business!"
								name="notes"
								value={invoice.notes}
								onChange={editField}
								as="textarea"
								className="my-2"
								rows={1}
							/>
						</Card>
					</Col>

					<Col md={4} lg={3}>
						<div className="sticky-top pt-md-3 pt-xl-4">
							<Button variant="primary" type="submit" className="d-block w-100">
								Review Invoice
							</Button>

							{invoiceSlug && (
								<Button
									variant="outline-secondary"
									className="d-block w-100 mt-2"
									onClick={handleInvoiceCopy}
								>
									Copy to a New Invoice
								</Button>
							)}

							<Form.Group className="my-3">
								<Form.Label className="fw-bold">Currency:</Form.Label>

								<Form.Select
									onChange={event => handleCurrencyChange(event.target.value)}
									className="btn btn-light my-1"
									aria-label="Change Currency"
								>
									<option value="$">USD (United States Dollar)</option>
									<option value="£">GBP (British Pound Sterling)</option>
									<option value="¥">JPY (Japanese Yen)</option>
									<option value="$">CAD (Canadian Dollar)</option>
									<option value="$">AUD (Australian Dollar)</option>
									<option value="$">SGD (Signapore Dollar)</option>
									<option value="¥">CNY (Chinese Renminbi)</option>
									<option value="₿">BTC (Bitcoin)</option>
								</Form.Select>
							</Form.Group>

							<Form.Group className="my-3">
								<Form.Label className="fw-bold">Tax rate:</Form.Label>

								<InputGroup className="my-1 flex-nowrap">
									<Form.Control
										name="taxRate"
										type="number"
										value={invoice.taxRate}
										onChange={editField}
										className="bg-white border"
										placeholder="0.0"
										min="0.00"
										step="0.01"
										max="100.00"
									/>

									<InputGroup.Text className="bg-light fw-bold text-secondary small">
										%
									</InputGroup.Text>
								</InputGroup>
							</Form.Group>

							<Form.Group className="my-3">
								<Form.Label className="fw-bold">Discount rate:</Form.Label>

								<InputGroup className="my-1 flex-nowrap">
									<Form.Control
										name="discountRate"
										type="number"
										value={invoice.discountRate}
										onChange={editField}
										className="bg-white border"
										placeholder="0.0"
										min="0.00"
										step="0.01"
										max="100.00"
									/>

									<InputGroup.Text className="bg-light fw-bold text-secondary small">
										%
									</InputGroup.Text>
								</InputGroup>
							</Form.Group>
						</div>
					</Col>
				</Row>
			</Form>
		</>
	);
};

export default InvoiceForm;
