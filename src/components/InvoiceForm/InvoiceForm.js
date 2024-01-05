import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

import { v4 as uuid } from 'uuid';
import { Form, Row, Button } from 'react-bootstrap';
import { BiArrowToLeft } from 'react-icons/bi';

import InvoiceDetails from './InvoiceDetails';
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

		handleCalculateTotal();
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

	const handleFieldEdit = event => {
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
				invoiceId={invoices.at(-1)?.id}
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
					<InvoiceDetails
						invoice={invoice}
						invoiceSlug={invoiceSlug}
						onFieldEdit={handleFieldEdit}
						onInvoiceCopy={handleInvoiceCopy}
						onCurrencyChange={handleCurrencyChange}
					/>
				</Row>
			</Form>
		</>
	);
};

export default InvoiceForm;
