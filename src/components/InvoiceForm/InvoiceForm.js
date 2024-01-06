import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { v4 as uuid } from 'uuid';
import { Form, Row } from 'react-bootstrap';

import InvoiceNavigation, { invoiceTabs } from './InvoiceNavigation';
import InvoiceDetails from './InvoiceDetails';
import ProductDetails from './ProductDetails';
import CopyModal from 'components/CopyModal/CopyModal';

import { copyInvoice, setActiveInvoice } from 'actions/invoicesActions';

const initialItem = {
	id: '',
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
	const [activeTab, setActiveTab] = useState(invoiceTabs[0]);

	const { invoices } = useSelector(state => state.invoices);
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

	const handleTabChange = currentTab => {
		setActiveTab(currentTab);
	};

	const handleProductDelete = itemID => {
		setInvoice(invoiceObj => ({
			...invoiceObj,
			items: invoiceObj.items.filter(item => item.id !== itemID),
		}));

		handleCalculateTotal();
	};

	const handleAddProduct = () => {
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

	const handleProductEdit = event => {
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
		dispatch(copyInvoice(invoice));
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

			<InvoiceNavigation activeTab={activeTab} onTabChange={handleTabChange} />

			<Form onSubmit={handleFormSubmit}>
				<Row>
					{activeTab === invoiceTabs[0] && (
						<InvoiceDetails
							invoice={invoice}
							invoiceSlug={invoiceSlug}
							onFieldEdit={handleFieldEdit}
							onInvoiceCopy={handleInvoiceCopy}
							onCurrencyChange={handleCurrencyChange}
						/>
					)}

					{activeTab === invoiceTabs[1] && (
						<ProductDetails
							invoice={invoice}
							onProductAdd={handleAddProduct}
							onProductEdit={handleProductEdit}
							onProductDelete={handleProductDelete}
						/>
					)}
				</Row>
			</Form>
		</>
	);
};

export default InvoiceForm;
