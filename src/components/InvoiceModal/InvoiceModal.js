import { v4 as uuid } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Button, Table, Modal } from 'react-bootstrap';
import { BiSave, BiCloudDownload } from 'react-icons/bi';
import toast, { Toaster } from 'react-hot-toast';

import { saveInvoice, setActiveInvoice, updateProductInInvoices } from 'actions/invoicesActions';
import { getInvoiceWithProductDetails } from 'selectors/invoiceSelectors';
import { generateInvoice } from 'utils';

import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect } from 'react';

const InvoiceModal = () => {
	const { activeInvoice, products } = useSelector(state => state.invoices);
	const dispatch = useDispatch();

	useEffect(() => {
		console.log(products);
	}, [products]);

	const handleModalHide = () => dispatch(setActiveInvoice(null));

	const handleInvoiceSave = () => {
		dispatch(saveInvoice(activeInvoice));

		activeInvoice.items.forEach(item =>
			dispatch(
				updateProductInInvoices({
					productId: item.productId || uuid(),
					updatedItem: {
						name: item.name,
						description: item.description,
						quantity: item.quantity,
						price: item.price,
					},
				})
			)
		);

		toast.success('Invoice Saved Successfully!');
		handleModalHide();
	};

	const handleInvoiceDownload = () => {
		toast.promise(generateInvoice(), {
			loading: 'Downloading...',
			success: 'Ready to download',
			error: 'Error while downloading',
		});

		handleModalHide();
	};

	return (
		<>
			<Toaster />

			{activeInvoice && (
				<div>
					<Modal
						centered
						size="lg"
						show={activeInvoice !== null}
						onHide={handleModalHide}
					>
						<div id="invoiceCapture">
							<div className="d-flex flex-row justify-content-between align-items-start bg-light w-100 p-4">
								<div className="w-100">
									<h4 className="fw-bold my-2">
										{activeInvoice.billFrom || 'John Uberbacher'}
									</h4>

									<h6 className="fw-bold text-secondary mb-1">
										Invoice #: {activeInvoice.invoiceNumber || ''}
									</h6>
								</div>

								<div className="text-end ms-4">
									<h6 className="fw-bold mt-1 mb-2">Amount&nbsp;Due:</h6>

									<h5 className="fw-bold text-secondary">
										{' '}
										{activeInvoice.currency.split('_')[0]}{' '}
										{activeInvoice.total.toFixed(2)}
									</h5>
								</div>
							</div>

							<div className="p-4">
								<Row className="mb-4">
									<Col md={4}>
										<div className="fw-bold">Billed to:</div>
										<div>{activeInvoice.billTo || ''}</div>
										<div>{activeInvoice.billToAddress || ''}</div>
										<div>{activeInvoice.billToEmail || ''}</div>
									</Col>

									<Col md={4}>
										<div className="fw-bold">Billed From:</div>
										<div>{activeInvoice.billFrom || ''}</div>
										<div>{activeInvoice.billFromAddress || ''}</div>
										<div>{activeInvoice.billFromEmail || ''}</div>
									</Col>

									<Col md={4}>
										<div className="fw-bold mt-2">Date Of Issue:</div>
										<div>{activeInvoice.dateOfIssue || ''}</div>
									</Col>
								</Row>

								<Table className="mb-0">
									<thead>
										<tr>
											<th>QTY</th>
											<th>DESCRIPTION</th>
											<th className="text-end">PRICE</th>
											<th className="text-end">AMOUNT</th>
										</tr>
									</thead>

									<tbody>
										{getInvoiceWithProductDetails(
											activeInvoice,
											products
										).items.map((item, i) => (
											<tr id={i} key={i}>
												<td style={{ width: '70px' }}>{item.quantity}</td>

												<td>
													{item.name} - {item.description}
												</td>

												<td className="text-end" style={{ width: '100px' }}>
													{activeInvoice.currency.split('_')[0]}{' '}
													{item.price.toFixed(2)}
												</td>

												<td className="text-end" style={{ width: '100px' }}>
													{activeInvoice.currency.split('_')[0]}{' '}
													{item.price * item.quantity}
												</td>
											</tr>
										))}
									</tbody>
								</Table>

								<Table>
									<tbody>
										<tr>
											<td>&nbsp;</td>
											<td>&nbsp;</td>
											<td>&nbsp;</td>
										</tr>

										<tr className="text-end">
											<td></td>

											<td className="fw-bold" style={{ width: '100px' }}>
												SUBTOTAL
											</td>

											<td className="text-end" style={{ width: '100px' }}>
												{activeInvoice.currency.split('_')[0]}{' '}
												{activeInvoice.subTotal.toFixed(2)}
											</td>
										</tr>

										{activeInvoice.taxAmount !== 0.0 && (
											<tr className="text-end">
												<td></td>

												<td className="fw-bold" style={{ width: '100px' }}>
													TAX
												</td>

												<td className="text-end" style={{ width: '100px' }}>
													{activeInvoice.currency.split('_')[0]}{' '}
													{activeInvoice.taxAmount.toFixed(2)}
												</td>
											</tr>
										)}
										{activeInvoice.discountAmount !== 0.0 && (
											<tr className="text-end">
												<td></td>

												<td className="fw-bold" style={{ width: '100px' }}>
													DISCOUNT
												</td>

												<td className="text-end" style={{ width: '100px' }}>
													{activeInvoice.currency.split('_')[0]}{' '}
													{activeInvoice.discountAmount.toFixed(2)}
												</td>
											</tr>
										)}
										<tr className="text-end">
											<td></td>

											<td className="fw-bold" style={{ width: '100px' }}>
												TOTAL
											</td>

											<td className="text-end" style={{ width: '100px' }}>
												{activeInvoice.currency.split('_')[0]}{' '}
												{activeInvoice.total.toFixed(2)}
											</td>
										</tr>
									</tbody>
								</Table>

								{activeInvoice.notes && (
									<div className="bg-light py-3 px-4 rounded">
										{activeInvoice.notes}
									</div>
								)}
							</div>
						</div>

						<div className="pb-4 px-4">
							<Row>
								<Col md={6}>
									<Button
										variant="primary"
										className="d-block w-100"
										onClick={handleInvoiceSave}
									>
										<BiSave
											style={{
												width: '15px',
												height: '15px',
												marginTop: '-3px',
											}}
											className="me-2"
										/>
										Save Invoice
									</Button>
								</Col>

								<Col md={6}>
									<Button
										variant="outline-primary"
										className="d-block w-100 mt-3 mt-md-0"
										onClick={handleInvoiceDownload}
									>
										<BiCloudDownload
											style={{
												width: '16px',
												height: '16px',
												marginTop: '-3px',
											}}
											className="me-2"
										/>
										Download Copy
									</Button>
								</Col>
							</Row>
						</div>
					</Modal>

					<hr className="mt-4 mb-3" />
				</div>
			)}
		</>
	);
};

export default InvoiceModal;
