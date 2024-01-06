import { v4 as uuid } from 'uuid';
import { createReducer } from '@reduxjs/toolkit';

import { saveInvoice, deleteInvoice, copyInvoice, setActiveInvoice } from 'actions/invoicesActions';
import DUMMY_INVOICES from 'data/invoices.json';

const initialState = {
	invoices: DUMMY_INVOICES.invoices,
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
		});
});

export default invoicesReducer;
