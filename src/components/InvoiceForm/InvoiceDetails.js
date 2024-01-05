import { Card, Row, Col, Form, InputGroup, Button } from 'react-bootstrap';
import { currencyOptions } from 'utils';

const InvoiceDetails = ({ invoice, invoiceSlug, onFieldEdit, onInvoiceCopy, onCurrencyChange }) => (
	<>
		<Col md={8} lg={9}>
			<Card className="p-4 p-xl-5 my-3 my-xl-4">
				<div className="d-flex flex-row align-items-start justify-content-between mb-3">
					<div className="d-flex flex-column">
						<div className="d-flex flex-column">
							<div className="mb-2">
								<span className="fw-bold">Current&nbsp;Date:&nbsp;</span>

								<span className="current-date">
									{new Date().toLocaleDateString()}
								</span>
							</div>
						</div>

						<div className="d-flex flex-row align-items-center">
							<span className="fw-bold d-block me-2">Due&nbsp;Date:</span>

							<Form.Control
								type="date"
								name="dateOfIssue"
								value={invoice.dateOfIssue}
								onChange={onFieldEdit}
								style={{ maxWidth: '150px' }}
								required
							/>
						</div>
					</div>

					<div className="d-flex flex-row align-items-center">
						<span className="fw-bold me-2">Invoice&nbsp;Number:&nbsp;</span>

						<Form.Control
							type="number"
							name="invoiceNumber"
							value={invoice.invoiceNumber}
							onChange={onFieldEdit}
							style={{ maxWidth: '70px' }}
							min="1"
							required
						/>
					</div>
				</div>

				<hr className="my-4" />

				<Row className="mb-5">
					<Col>
						<Form.Label className="fw-bold">Bill to:</Form.Label>

						<Form.Control
							placeholder="Who is this invoice to?"
							rows={3}
							type="text"
							name="billTo"
							className="my-2"
							value={invoice.billTo}
							onChange={onFieldEdit}
							autoComplete="name"
							required
						/>

						<Form.Control
							placeholder="Email address"
							type="email"
							name="billToEmail"
							className="my-2"
							value={invoice.billToEmail}
							onChange={onFieldEdit}
							autoComplete="email"
							required
						/>

						<Form.Control
							placeholder="Billing address"
							type="text"
							name="billToAddress"
							className="my-2"
							autoComplete="address"
							value={invoice.billToAddress}
							onChange={onFieldEdit}
							required
						/>
					</Col>

					<Col>
						<Form.Label className="fw-bold">Bill from:</Form.Label>

						<Form.Control
							placeholder="Who is this invoice from?"
							rows={3}
							type="text"
							name="billFrom"
							className="my-2"
							value={invoice.billFrom}
							onChange={onFieldEdit}
							autoComplete="name"
							required
						/>

						<Form.Control
							placeholder="Email address"
							type="email"
							name="billFromEmail"
							className="my-2"
							value={invoice.billFromEmail}
							onChange={onFieldEdit}
							autoComplete="email"
							required
						/>

						<Form.Control
							placeholder="Billing address"
							type="text"
							name="billFromAddress"
							className="my-2"
							autoComplete="address"
							value={invoice.billFromAddress}
							onChange={onFieldEdit}
							required
						/>
					</Col>
				</Row>

				<hr className="my-4" />

				<Form.Label className="fw-bold">Notes:</Form.Label>

				<Form.Control
					placeholder="Thanks for your business!"
					name="notes"
					value={invoice.notes}
					onChange={onFieldEdit}
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
						onClick={onInvoiceCopy}
					>
						Copy to a New Invoice
					</Button>
				)}

				<Form.Group className="my-3">
					<Form.Label className="fw-bold">Currency:</Form.Label>

					<Form.Select
						value={invoice.currency}
						onChange={event => onCurrencyChange(event.target.value)}
						className="btn btn-light my-1"
						aria-label="Change Currency"
					>
						{currencyOptions.map(({ label, value }, idx) => (
							<option key={idx} value={value}>
								{label}
							</option>
						))}
					</Form.Select>
				</Form.Group>

				<Form.Group className="my-3">
					<Form.Label className="fw-bold">Tax rate:</Form.Label>

					<InputGroup className="my-1 flex-nowrap">
						<Form.Control
							name="taxRate"
							type="number"
							value={invoice.taxRate}
							onChange={onFieldEdit}
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
							onChange={onFieldEdit}
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
	</>
);

export default InvoiceDetails;
