import { configureStore } from '@reduxjs/toolkit';
import invoicesReducer from 'reducers/invoicesReducer';

export default configureStore({
	reducer: {
		invoices: invoicesReducer,
	},
});
