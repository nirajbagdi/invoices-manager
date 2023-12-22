import { Row, Col, Button, Table, Modal } from 'react-bootstrap';
import { BiSave, BiCloudDownload } from 'react-icons/bi';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

import 'bootstrap/dist/css/bootstrap.min.css';

const generateInvoice = async () => {
	const canvas = await html2canvas(document.querySelector('#invoiceCapture'));
	const imgData = canvas.toDataURL('image/png', 1.0);

	const pdf = new jsPDF({
		orientation: 'portrait',
		unit: 'pt',
		format: [612, 792],
	});

	pdf.internal.scaleFactor = 1;

	const imgProps = pdf.getImageProperties(imgData);
	const pdfWidth = pdf.internal.pageSize.getWidth();
	const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

	pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
	pdf.save('invoice-001.pdf');
};

const InvoiceModal = props => {
	if (!props.invoice) return;

	return (
		<div>
			<Modal show={props.showModal} onHide={props.closeModal} size="lg" centered>
				<div id="invoiceCapture">
					<div className="d-flex flex-row justify-content-between align-items-start bg-light w-100 p-4">
						<div className="w-100">
							<h4 className="fw-bold my-2">
								{props.invoice.billFrom || 'John Uberbacher'}
							</h4>
							<h6 className="fw-bold text-secondary mb-1">
								Invoice #: {props.invoice.invoiceNumber || ''}
							</h6>
						</div>

						<div className="text-end ms-4">
							<h6 className="fw-bold mt-1 mb-2">Amount&nbsp;Due:</h6>
							<h5 className="fw-bold text-secondary">
								{' '}
								{props.invoice.currency} {props.invoice.total.toFixed(2)}
							</h5>
						</div>
					</div>

					<div className="p-4">
						<Row className="mb-4">
							<Col md={4}>
								<div className="fw-bold">Billed to:</div>
								<div>{props.invoice.billTo || ''}</div>
								<div>{props.invoice.billToAddress || ''}</div>
								<div>{props.invoice.billToEmail || ''}</div>
							</Col>

							<Col md={4}>
								<div className="fw-bold">Billed From:</div>
								<div>{props.invoice.billFrom || ''}</div>
								<div>{props.invoice.billFromAddress || ''}</div>
								<div>{props.invoice.billFromEmail || ''}</div>
							</Col>

							<Col md={4}>
								<div className="fw-bold mt-2">Date Of Issue:</div>
								<div>{props.invoice.dateOfIssue || ''}</div>
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
								{props.invoice.items.map((item, i) => (
									<tr id={i} key={i}>
										<td style={{ width: '70px' }}>{item.quantity}</td>
										<td>
											{item.name} - {item.description}
										</td>
										<td className="text-end" style={{ width: '100px' }}>
											{props.currency} {item.price.toFixed(2)}
										</td>
										<td className="text-end" style={{ width: '100px' }}>
											{props.invoice.currency} {item.price * item.quantity}
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
										{props.invoice.currency} {props.invoice.subTotal.toFixed(2)}
									</td>
								</tr>

								{props.invoice.taxAmount !== 0.0 && (
									<tr className="text-end">
										<td></td>

										<td className="fw-bold" style={{ width: '100px' }}>
											TAX
										</td>

										<td className="text-end" style={{ width: '100px' }}>
											{props.invoice.currency}{' '}
											{props.invoice.taxAmount.toFixed(2)}
										</td>
									</tr>
								)}
								{props.invoice.discountAmount !== 0.0 && (
									<tr className="text-end">
										<td></td>

										<td className="fw-bold" style={{ width: '100px' }}>
											DISCOUNT
										</td>

										<td className="text-end" style={{ width: '100px' }}>
											{props.invoice.currency}{' '}
											{props.invoice.discountAmount.toFixed(2)}
										</td>
									</tr>
								)}
								<tr className="text-end">
									<td></td>

									<td className="fw-bold" style={{ width: '100px' }}>
										TOTAL
									</td>

									<td className="text-end" style={{ width: '100px' }}>
										{props.invoice.currency} {props.invoice.total.toFixed(2)}
									</td>
								</tr>
							</tbody>
						</Table>

						{props.invoice.notes && (
							<div className="bg-light py-3 px-4 rounded">{props.invoice.notes}</div>
						)}
					</div>
				</div>

				<div className="pb-4 px-4">
					<Row>
						<Col md={6}>
							<Button
								variant="primary"
								className="d-block w-100"
								onClick={props.onInvoiceSave}
							>
								<BiSave
									style={{ width: '15px', height: '15px', marginTop: '-3px' }}
									className="me-2"
								/>
								Save Invoice
							</Button>
						</Col>

						<Col md={6}>
							<Button
								variant="outline-primary"
								className="d-block w-100 mt-3 mt-md-0"
								onClick={generateInvoice}
							>
								<BiCloudDownload
									style={{ width: '16px', height: '16px', marginTop: '-3px' }}
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
	);
};

export default InvoiceModal;
