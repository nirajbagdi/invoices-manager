import { v4 as uuid } from 'uuid';
import { createReducer } from '@reduxjs/toolkit';
import { saveItem, deleteItem, copyItem, setActiveInvoice } from 'actions/invoicesActions';
import DUMMY_INVOICES from 'data/invoices.json';

const initialState = {
	items: DUMMY_INVOICES.invoices,
	activeInvoice: null,
};

const invoicesReducer = createReducer(initialState, builder => {
	builder
		.addCase(saveItem, (state, action) => {
			const { id: itemId } = action.payload;
			const existingItemIdx = state.items.findIndex(item => item.id === itemId);

			existingItemIdx !== -1
				? (state.items[existingItemIdx] = action.payload)
				: state.items.push(action.payload);
		})

		.addCase(deleteItem, (state, action) => {
			const filteredItems = state.items.filter(item => item.id !== action.payload);
			state.items = filteredItems;
		})

		.addCase(copyItem, (state, action) => {
			const copiedInvoice = { ...action.payload, id: uuid() };
			state.items.push(copiedInvoice);
		})

		.addCase(setActiveInvoice, (state, action) => {
			state.activeInvoice = action.payload;
		});
});

export default invoicesReducer;
