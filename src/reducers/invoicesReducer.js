import { v4 as uuid } from 'uuid';
import { createReducer } from '@reduxjs/toolkit';

import {
	saveInvoice,
	deleteInvoice,
	copyInvoice,
	updateProductInInvoices,
	setActiveInvoice,
} from 'actions/invoicesActions';

import DUMMY_INVOICES from 'data/invoices.json';
import DUMMY_PRODUCTS from 'data/products.json';

const initialState = {
	invoices: DUMMY_INVOICES.invoices,
	products: DUMMY_PRODUCTS.products,
	groups: [...new Set(DUMMY_PRODUCTS.products.map(item => item.group))],
	activeInvoice: null,
};

const invoicesReducer = createReducer(initialState, builder => {
	builder
		.addCase(saveInvoice, (state, action) => {
			const { id: invoiceId } = action.payload;
			const existingInvoiceIdx = state.invoices.findIndex(item => item.id === invoiceId);

			existingInvoiceIdx !== -1
				? (state.invoices[existingInvoiceIdx] = action.payload)
				: state.invoices.push(action.payload);
		})

		.addCase(deleteInvoice, (state, action) => {
			const filteredInvoices = state.invoices.filter(item => item.id !== action.payload);
			state.invoices = filteredInvoices;
		})

		.addCase(copyInvoice, (state, action) => {
			const copiedInvoice = {
				...action.payload,
				id: uuid(),
				invoiceNumber: action.payload.invoiceNumber + 1,
			};

			state.invoices.push(copiedInvoice);
		})

		.addCase(setActiveInvoice, (state, action) => {
			state.activeInvoice = action.payload;
		})

		.addCase(updateProductInInvoices, (state, action) => {
			const { productId, updatedItem } = action.payload;

			const productIdx = state.products.findIndex(product => product.id === productId);

			if (productIdx !== -1) {
				state.products[productIdx] = {
					...state.products[productIdx],
					...updatedItem,
				};
			} else {
				state.products.push({
					id: productId,
					...updatedItem,
				});
			}

			state.invoices.forEach(invoice => {
				const itemIdx = invoice.items.findIndex(item => item.productId === productId);

				if (itemIdx !== -1) {
					invoice.items[itemIdx] = {
						...invoice.items[itemIdx],
						...updatedItem,
					};
				} else {
					const productNames = state.products.map(product => product.name);
					const parsedItems = JSON.parse(JSON.stringify(invoice.items));

					invoice.items = parsedItems.map(item =>
						productNames.includes(item.name) && item.productId.trim() === ''
							? { ...item, productId }
							: item
					);
				}
			});
		});
});

export default invoicesReducer;
