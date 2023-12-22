import { configureStore } from '@reduxjs/toolkit';
// import invoiceReducer from './invoiceSlice';
import invoicesReducer from './invoicesReducer';

export default configureStore({
	reducer: {
		invoices: invoicesReducer,
	},
});
